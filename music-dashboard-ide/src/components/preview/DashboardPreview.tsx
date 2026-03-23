import { Sidebar } from './Sidebar';
import { TrackList } from './TrackList';
import { StatsCards } from './StatsCards';
import { PlayerBar } from './PlayerBar';
import { useAppStore } from '../../stores/appStore';

export function DashboardPreview() {
  const inspectMode = useAppStore((s) => s.inspectMode);

  return (
    <div className={`h-full flex flex-col ${inspectMode ? 'inspect-mode' : ''}`}>
      <style>{`
        .inspect-mode [data-task-id]:hover {
          outline: 2px solid #1DB954 !important;
          outline-offset: 2px;
          cursor: pointer;
          position: relative;
        }
        .inspect-mode [data-task-id]:hover::after {
          content: attr(data-task-label);
          position: absolute;
          top: -24px;
          left: 0;
          background: #1DB954;
          color: black;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 3px;
          white-space: nowrap;
          z-index: 50;
          font-weight: 600;
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
