import { X } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { buildVirtualFiles } from '../../tasks/registry';

const virtualFiles = buildVirtualFiles();

export function EditorTabs() {
  const openFileIds = useAppStore((s) => s.openFileIds);
  const activeFileId = useAppStore((s) => s.activeFileId);
  const setActiveFile = useAppStore((s) => s.setActiveFile);
  const closeFile = useAppStore((s) => s.closeFile);

  return (
    <div className="flex bg-spotify-dark border-b border-spotify-gray overflow-x-auto">
      {openFileIds.map((fileId) => {
        const file = virtualFiles.find((f) => f.id === fileId);
        if (!file) return null;

        const isActive = fileId === activeFileId;

        return (
          <div
            key={fileId}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs cursor-pointer border-r border-spotify-gray shrink-0 ${
              isActive
                ? 'bg-editor-bg text-white border-t-2 border-t-spotify-green'
                : 'bg-spotify-dark text-spotify-light-gray hover:bg-spotify-hover border-t-2 border-t-transparent'
            }`}
            onClick={() => setActiveFile(fileId)}
          >
            <span>{file.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(fileId);
              }}
              className="ml-1 p-0.5 rounded hover:bg-spotify-gray"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
