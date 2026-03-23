import { useRef, useCallback, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { VirtualFile, TaskDefinition } from '../../tasks/types';
import { useStudentCodeStore } from '../../stores/studentCodeStore';
import { useAppStore } from '../../stores/appStore';

const START_MARKER = '# --- YOUR CODE START ---';
const END_MARKER = '# --- YOUR CODE END ---';

interface ConstrainedEditorProps {
  file: VirtualFile;
  tasks: TaskDefinition[];
  readonly: boolean;
}

export function ConstrainedEditor({ file, tasks, readonly }: ConstrainedEditorProps) {
  const editorRef = useRef<unknown>(null);
  const monacoRef = useRef<unknown>(null);
  const setCode = useStudentCodeStore((s) => s.setCode);
  const getCode = useStudentCodeStore((s) => s.getCode);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);

  // Build the full file content with student code inserted
  const getFileContent = useCallback(() => {
    if (readonly || tasks.length === 0) return file.content;

    // For files with multiple tasks, we show the first task's template
    // In a more complete version, we'd merge all tasks into one file
    const task = tasks[0];
    const studentCode = getCode(task.id, task.starterCode);

    const lines = task.fileTemplate.split('\n');
    const startIdx = lines.findIndex((l) => l.includes('YOUR CODE START'));
    const endIdx = lines.findIndex((l) => l.includes('YOUR CODE END'));

    if (startIdx === -1 || endIdx === -1) return task.fileTemplate;

    const before = lines.slice(0, startIdx + 1);
    const after = lines.slice(endIdx);
    return [...before, studentCode, ...after].join('\n');
  }, [file, tasks, readonly, getCode]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Set Spotify-dark theme
    monaco.editor.defineTheme('spotify-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955' },
        { token: 'keyword', foreground: 'c586c0' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'function', foreground: 'dcdcaa' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#1DB954',
      },
    });
    monaco.editor.setTheme('spotify-dark');

    if (!readonly && tasks.length > 0) {
      applyConstraints(editor, monaco);
    }
  };

  const applyConstraints = (editor: any, monaco: any) => {
    const model = editor.getModel();
    if (!model) return;

    let isReverting = false;

    /** Recalculate marker positions from current content */
    const getMarkerLines = () => {
      const lines = model.getValue().split('\n');
      const startLine = lines.findIndex((l: string) => l.includes('YOUR CODE START')) + 1;
      const endLine = lines.findIndex((l: string) => l.includes('YOUR CODE END')) + 1;
      return { startLine, endLine, totalLines: lines.length };
    };

    /** Apply visual decorations to show read-only vs editable zones */
    const updateDecorations = () => {
      const { startLine, endLine, totalLines } = getMarkerLines();
      if (startLine === 0 || endLine === 0) return;

      const decorations: any[] = [];

      // Read-only: before editable zone
      if (startLine > 0) {
        decorations.push({
          range: new monaco.Range(1, 1, startLine, 1000),
          options: { isWholeLine: true, className: 'readonly-line', inlineClassName: 'readonly-text' },
        });
      }

      // Read-only: after editable zone
      if (endLine <= totalLines) {
        decorations.push({
          range: new monaco.Range(endLine, 1, totalLines, 1000),
          options: { isWholeLine: true, className: 'readonly-line', inlineClassName: 'readonly-text' },
        });
      }

      // Editable zone highlight
      decorations.push({
        range: new monaco.Range(startLine + 1, 1, endLine - 1, 1000),
        options: { isWholeLine: true, className: 'editable-zone', linesDecorationsClassName: 'editable-zone-gutter' },
      });

      editor.createDecorationsCollection(decorations);
    };

    updateDecorations();

    // Constrain edits to editable zone
    editor.onDidChangeModelContent((e: any) => {
      if (isReverting) return;

      const { startLine, endLine } = getMarkerLines();
      if (startLine === 0 || endLine === 0) return;

      // Check if any change touched read-only regions
      let touchedReadonly = false;
      for (const change of e.changes) {
        if (change.range.startLineNumber <= startLine || change.range.endLineNumber >= endLine) {
          touchedReadonly = true;
          break;
        }
      }

      if (touchedReadonly) {
        // Revert the change
        isReverting = true;
        editor.trigger('keyboard', 'undo', null);
        isReverting = false;
        return;
      }

      // Extract student code and save
      const currentContent = model.getValue();
      const currentLines = currentContent.split('\n');
      const newStartIdx = currentLines.findIndex((l: string) => l.includes('YOUR CODE START'));
      const newEndIdx = currentLines.findIndex((l: string) => l.includes('YOUR CODE END'));

      if (newStartIdx !== -1 && newEndIdx !== -1) {
        const studentLines = currentLines.slice(newStartIdx + 1, newEndIdx);
        const studentCode = studentLines.join('\n');
        const task = tasks[0];
        if (task) {
          setCode(task.id, studentCode);
          setCurrentTask(task.id);
        }
      }

      updateDecorations();
    });
  };

  return (
    <>
      <style>{`
        .readonly-line { opacity: 0.6; }
        .readonly-text { color: #858585 !important; }
        .editable-zone { background: rgba(29, 185, 84, 0.05); }
        .editable-zone-gutter {
          border-left: 2px solid #1DB954;
          margin-left: 3px;
        }
      `}</style>
      <Editor
        height="100%"
        language="python"
        value={getFileContent()}
        onMount={handleEditorMount}
        options={{
          readOnly: readonly,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 4,
          insertSpaces: true,
          automaticLayout: true,
          renderLineHighlight: 'gutter',
          folding: false,
          glyphMargin: false,
          padding: { top: 8, bottom: 8 },
        }}
      />
    </>
  );
}
