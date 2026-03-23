import { Home, Search, Library, Music } from 'lucide-react';
import { useStudentResultStore } from '../../stores/studentResultStore';
import { useAppStore } from '../../stores/appStore';
import { getTaskById } from '../../tasks/registry';

export function Sidebar() {
  const results = useStudentResultStore((s) => s.results);
  const inspectMode = useAppStore((s) => s.inspectMode);
  const openFile = useAppStore((s) => s.openFile);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);

  const trackNamesResult = results['task03-get-track-names'];

  const handleInspectClick = (taskId: string) => {
    if (!inspectMode) return;
    const task = getTaskById(taskId);
    if (task) {
      openFile(`file-${task.id}`);
      setCurrentTask(task.id);
    }
  };

  const trackNames =
    trackNamesResult?.data && !trackNamesResult.error && Array.isArray(trackNamesResult.data)
      ? (trackNamesResult.data as string[]).slice(0, 15)
      : null;

  return (
    <div className="w-44 bg-spotify-black border-r border-spotify-gray flex flex-col shrink-0">
      {/* Navigation */}
      <div className="p-3 space-y-1">
        <NavItem icon={<Home className="w-4 h-4" />} label="Home" active />
        <NavItem icon={<Search className="w-4 h-4" />} label="Search" />
        <NavItem icon={<Library className="w-4 h-4" />} label="Your Library" />
      </div>

      <div className="border-t border-spotify-gray my-1" />

      {/* Track names from student function */}
      <div
        className="flex-1 overflow-y-auto p-3"
        data-task-id="task03-get-track-names"
        data-task-label="get_track_names()"
        onClick={() => handleInspectClick('task03-get-track-names')}
      >
        <div className="text-[10px] font-semibold uppercase tracking-wider text-spotify-light-gray mb-2">
          Track Names
        </div>

        {trackNames ? (
          <div className="space-y-0.5">
            {trackNames.map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 py-1 text-xs text-spotify-light-gray hover:text-white cursor-pointer truncate"
              >
                <Music className="w-3 h-3 shrink-0 opacity-50" />
                <span className="truncate">{name}</span>
              </div>
            ))}
            {trackNames.length > 0 && (
              <div className="text-[10px] text-spotify-light-gray opacity-50 mt-1">
                + more tracks...
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-spotify-light-gray border border-dashed border-spotify-gray rounded p-2 text-center">
            Write get_track_names() to see track names here
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs cursor-pointer transition-colors ${
        active ? 'text-white' : 'text-spotify-light-gray hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}
