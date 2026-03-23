import { useAppStore } from '../../stores/appStore';
import { buildVirtualFiles, getTasksForFile } from '../../tasks/registry';
import { EditorTabs } from './EditorTabs';
import { ConstrainedEditor } from './ConstrainedEditor';
import { FileCode2 } from 'lucide-react';

const virtualFiles = buildVirtualFiles();

export function EditorPanel() {
  const activeFileId = useAppStore((s) => s.activeFileId);
  const openFileIds = useAppStore((s) => s.openFileIds);

  const activeFile = virtualFiles.find((f) => f.id === activeFileId);

  if (openFileIds.length === 0 || !activeFile) {
    return (
      <div className="h-full bg-editor-bg flex items-center justify-center text-spotify-light-gray">
        <div className="text-center">
          <FileCode2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Select a file from the explorer</p>
          <p className="text-xs mt-1 opacity-60">Click a .py file to start coding</p>
        </div>
      </div>
    );
  }

  const tasks = getTasksForFile(activeFile.path);
  const isReadonly = activeFile.type === 'readonly';

  return (
    <div className="h-full flex flex-col bg-editor-bg">
      <EditorTabs />
      <div className="flex-1 min-h-0">
        <ConstrainedEditor
          key={activeFile.id}
          file={activeFile}
          tasks={tasks}
          readonly={isReadonly}
        />
      </div>
    </div>
  );
}
