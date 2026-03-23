import { Sidebar } from './Sidebar';
import { TrackList } from './TrackList';
import { StatsCards } from './StatsCards';
import { PlayerBar } from './PlayerBar';
import { useAppStore } from '../../stores/appStore';
import { useStudentCodeStore } from '../../stores/studentCodeStore';
import { getTaskById } from '../../tasks/registry';

export function DashboardPreview() {
  const openFile = useAppStore((s) => s.openFile);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);
  const completed = useStudentCodeStore((s) => s.completed);

  // Click handler: find nearest [data-task-id] and navigate to that file
  const handleClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest('[data-task-id]');
    if (!target) return;
    const taskId = target.getAttribute('data-task-id');
    if (!taskId) return;
    const task = getTaskById(taskId);
    if (task) {
      openFile(`file-${task.id}`);
      setCurrentTask(task.id);
    }
  };

  return (
    <div className="h-full flex flex-col" onClick={handleClick}>
      <style>{`
        /* Always show green dashed outline on sections that need code */
        [data-task-id] {
          position: relative;
          cursor: pointer;
          transition: outline-color 0.2s, background 0.2s;
        }
        [data-task-id]:not([data-task-complete="true"]) {
          outline: 1.5px dashed rgba(29, 185, 84, 0.5);
          outline-offset: 2px;
          border-radius: 4px;
        }
        [data-task-id]:not([data-task-complete="true"]):hover {
          outline: 2px solid #1DB954;
          background: rgba(29, 185, 84, 0.05);
        }
        /* Completed sections get a subtle solid green border */
        [data-task-id][data-task-complete="true"] {
          outline: 1px solid rgba(29, 185, 84, 0.2);
          outline-offset: 2px;
          border-radius: 4px;
        }
        /* Function name badge */
        [data-task-label]::after {
          content: attr(data-task-label);
          position: absolute;
          top: -10px;
          right: 4px;
          background: rgba(29, 185, 84, 0.85);
          color: black;
          font-size: 9px;
          padding: 1px 5px;
          border-radius: 2px;
          white-space: nowrap;
          z-index: 50;
          font-weight: 600;
          pointer-events: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        [data-task-id]:hover [data-task-label]::after,
        [data-task-label]:hover::after {
          opacity: 1;
        }
        /* Completed badge turns muted */
        [data-task-complete="true"][data-task-label]::after {
          background: rgba(29, 185, 84, 0.3);
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>

      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <StatsCards />
          <TrackList />
        </div>
      </div>

      {/* Player bar at bottom */}
      <PlayerBar />
    </div>
  );
}
