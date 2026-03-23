import { Music2, Clock, TrendingUp, Star } from 'lucide-react';
import { tracks } from '../../data/songs';
import { useStudentResultStore } from '../../stores/studentResultStore';
import { useAppStore } from '../../stores/appStore';
import { getTaskById } from '../../tasks/registry';

export function StatsCards() {
  const results = useStudentResultStore((s) => s.results);
  const inspectMode = useAppStore((s) => s.inspectMode);
  const openFile = useAppStore((s) => s.openFile);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);

  const topTracksResult = results['task06-top-popular'];
  const longTracksResult = results['task05-filter-long-tracks'];

  const handleInspectClick = (taskId: string) => {
    if (!inspectMode) return;
    const task = getTaskById(taskId);
    if (task) {
      openFile(`file-${task.id}`);
      setCurrentTask(task.id);
    }
  };

  const totalTracks = tracks.length;
  const totalDuration = tracks.reduce((sum, t) => sum + t.duration_ms, 0);
  const totalMinutes = Math.floor(totalDuration / 60000);
  const avgPopularity = Math.round(
    tracks.reduce((sum, t) => sum + t.popularity, 0) / tracks.length
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total tracks */}
      <div className="bg-spotify-dark rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Music2 className="w-4 h-4 text-spotify-green" />
          <span className="text-xs text-spotify-light-gray">Total Tracks</span>
        </div>
        <div className="text-2xl font-bold">{totalTracks}</div>
      </div>

      {/* Total duration */}
      <div className="bg-spotify-dark rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-spotify-green" />
          <span className="text-xs text-spotify-light-gray">Total Duration</span>
        </div>
        <div className="text-2xl font-bold">{totalMinutes} min</div>
      </div>

      {/* Top track - powered by get_top_tracks */}
      <div
        className="bg-spotify-dark rounded-lg p-3"
        data-task-id="task06-top-popular"
        data-task-label="get_top_tracks()"
        onClick={() => handleInspectClick('task06-top-popular')}
      >
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-spotify-light-gray">#1 Track</span>
        </div>
        {topTracksResult?.data &&
        !topTracksResult.error &&
        Array.isArray(topTracksResult.data) &&
        topTracksResult.data.length > 0 ? (
          <div>
            <div className="text-sm font-bold truncate">
              {(topTracksResult.data[0] as Record<string, unknown>).name as string}
            </div>
            <div className="text-xs text-spotify-light-gray truncate">
              {(topTracksResult.data[0] as Record<string, unknown>).artist as string}
            </div>
          </div>
        ) : (
          <div className="text-xs text-spotify-light-gray border border-dashed border-spotify-gray rounded p-2 text-center">
            Write get_top_tracks()
          </div>
        )}
      </div>

      {/* Long tracks count - powered by filter_long_tracks */}
      <div
        className="bg-spotify-dark rounded-lg p-3"
        data-task-id="task05-filter-long-tracks"
        data-task-label="filter_long_tracks()"
        onClick={() => handleInspectClick('task05-filter-long-tracks')}
      >
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-spotify-light-gray">Long Tracks (4:30+)</span>
        </div>
        {longTracksResult?.data &&
        !longTracksResult.error &&
        Array.isArray(longTracksResult.data) ? (
          <div className="text-2xl font-bold">{longTracksResult.data.length}</div>
        ) : (
          <div className="text-xs text-spotify-light-gray border border-dashed border-spotify-gray rounded p-2 text-center">
            Write filter_long_tracks()
          </div>
        )}
      </div>
    </div>
  );
}
