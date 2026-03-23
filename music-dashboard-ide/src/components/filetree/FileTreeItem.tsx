import { FileCode2, FileText, CheckCircle2, Circle } from 'lucide-react';
import { VirtualFile } from '../../tasks/types';

interface FileTreeItemProps {
  file: VirtualFile;
  depth: number;
  isActive: boolean;
  status: 'completed' | 'incomplete' | 'readonly';
  onClick: () => void;
}

export function FileTreeItem({ file, depth, isActive, status, onClick }: FileTreeItemProps) {
  const Icon = file.type === 'task' ? FileCode2 : FileText;
  const StatusIcon =
    status === 'completed' ? CheckCircle2 : status === 'incomplete' ? Circle : null;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-1.5 px-2 py-0.5 text-xs text-left transition-colors ${
        isActive
          ? 'bg-spotify-gray text-white'
          : 'text-spotify-light-gray hover:bg-spotify-hover hover:text-white'
      }`}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
    >
      <Icon className={`w-3.5 h-3.5 shrink-0 ${file.type === 'task' ? 'text-spotify-green' : 'text-spotify-light-gray'}`} />
      <span className="truncate flex-1">{file.name}</span>
      {StatusIcon && (
        <StatusIcon
          className={`w-3 h-3 shrink-0 ${
            status === 'completed' ? 'text-spotify-green' : 'text-yellow-500'
          }`}
        />
      )}
    </button>
  );
}
