import { Music, Search, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { useStudentCodeStore } from '../../stores/studentCodeStore';
import { taskRegistry } from '../../tasks/registry';

export function TopBar() {
  const inspectMode = useAppStore((s) => s.inspectMode);
  const toggleInspectMode = useAppStore((s) => s.toggleInspectMode);
  const completed = useStudentCodeStore((s) => s.completed);

  const totalTasks = taskRegistry.length;
  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="flex items-center justify-between h-10 px-4 bg-spotify-dark border-b border-spotify-gray shrink-0">
      <div className="flex items-center gap-2">
        <Music className="w-5 h-5 text-spotify-green" />
        <span className="font-semibold text-sm">Music Dashboard IDE</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs text-spotify-light-gray">
          <CheckCircle2 className="w-3.5 h-3.5 text-spotify-green" />
          <span>
            {completedCount}/{totalTasks} tasks
          </span>
        </div>

        <button
          onClick={toggleInspectMode}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
            inspectMode
              ? 'bg-spotify-green text-black'
              : 'bg-spotify-gray text-spotify-light-gray hover:bg-spotify-hover'
          }`}
        >
          <Search className="w-3 h-3" />
          Inspect
        </button>
      </div>
    </div>
  );
}
