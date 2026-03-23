import { useMemo } from 'react';
import { Folder, FolderOpen } from 'lucide-react';
import { buildVirtualFiles, taskRegistry, getTasksForFile } from '../../tasks/registry';
import { useAppStore } from '../../stores/appStore';
import { useStudentCodeStore } from '../../stores/studentCodeStore';
import { FileTreeItem } from './FileTreeItem';
import { VirtualFile } from '../../tasks/types';

interface TreeNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children: TreeNode[];
  file?: VirtualFile;
}

function buildTree(files: VirtualFile[]): TreeNode {
  const root: TreeNode = { name: 'music-app', path: '', type: 'folder', children: [] };

  for (const file of files) {
    const parts = file.path.split('/');
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        // Don't duplicate files at same path
        if (!current.children.find((c) => c.name === part && c.type === 'file')) {
          current.children.push({
            name: part,
            path: file.path,
            type: 'file',
            children: [],
            file,
          });
        }
      } else {
        let folder = current.children.find((c) => c.name === part && c.type === 'folder');
        if (!folder) {
          folder = { name: part, path: parts.slice(0, i + 1).join('/'), type: 'folder', children: [] };
          current.children.push(folder);
        }
        current = folder;
      }
    }
  }

  // Sort: folders first, then alphabetically
  function sortTree(node: TreeNode) {
    node.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortTree);
  }
  sortTree(root);

  return root;
}

export function FileTree() {
  const files = useMemo(() => buildVirtualFiles(), []);
  const tree = useMemo(() => buildTree(files), [files]);
  const activeFileId = useAppStore((s) => s.activeFileId);
  const openFile = useAppStore((s) => s.openFile);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);
  const completed = useStudentCodeStore((s) => s.completed);

  const handleFileClick = (file: VirtualFile) => {
    openFile(file.id);
    // If it's a task file, set the first task for that file as current
    const tasks = getTasksForFile(file.path);
    if (tasks.length > 0) {
      setCurrentTask(tasks[0].id);
    }
  };

  return (
    <div className="py-2">
      <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-spotify-light-gray">
        Explorer
      </div>
      <TreeNodeView
        node={tree}
        depth={0}
        activeFileId={activeFileId}
        completed={completed}
        onFileClick={handleFileClick}
      />
    </div>
  );
}

function TreeNodeView({
  node,
  depth,
  activeFileId,
  completed,
  onFileClick,
}: {
  node: TreeNode;
  depth: number;
  activeFileId: string | null;
  completed: Record<string, boolean>;
  onFileClick: (file: VirtualFile) => void;
}) {
  if (node.type === 'file' && node.file) {
    const tasks = getTasksForFile(node.file.path);
    const allCompleted = tasks.length > 0 && tasks.every((t) => completed[t.id]);
    const hasIncomplete = tasks.length > 0 && tasks.some((t) => !completed[t.id]);

    return (
      <FileTreeItem
        file={node.file}
        depth={depth}
        isActive={node.file.id === activeFileId}
        status={allCompleted ? 'completed' : hasIncomplete ? 'incomplete' : 'readonly'}
        onClick={() => onFileClick(node.file!)}
      />
    );
  }

  return (
    <div>
      {depth > 0 && (
        <div
          className="flex items-center gap-1 px-2 py-0.5 text-xs text-spotify-light-gray cursor-default"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <FolderOpen className="w-3.5 h-3.5 text-spotify-light-gray" />
          <span>{node.name}</span>
        </div>
      )}
      {node.children.map((child) => (
        <TreeNodeView
          key={child.path + child.type}
          node={child}
          depth={depth + (depth === 0 && node.name === 'music-app' ? 0 : 1)}
          activeFileId={activeFileId}
          completed={completed}
          onFileClick={onFileClick}
        />
      ))}
    </div>
  );
}
