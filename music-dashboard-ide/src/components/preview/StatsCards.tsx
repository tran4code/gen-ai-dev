import { Music2, Clock, TrendingUp, Star } from 'lucide-react';
import { tracks } from '../../data/songs';
import { useStudentResultStore } from '../../stores/studentResultStore';
import { useStudentCodeStore } from '../../stores/studentCodeStore';

export function StatsCards() {
  const results = useStudentResultStore((s) => s.results);
  const completed = useStudentCodeStore((s) => s.completed);

  const topTracksResult = results['task06-top-popular'];

  const totalTracks = tracks.length;
  const totalDuration = tracks.reduce((sum, t) => sum + t.duration_ms, 0);
  const totalMinutes = Math.floor(totalDuration / 60000);

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total tracks — static, no task */}
      <div className="bg-spotify-dark rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Music2 className="w-4 h-4 text-spotify-green" />
          <span className="text-xs text-spotify-light-gray">Total Tracks</span>
        </div>
        <div className="text-2xl font-bold">{totalTracks}</div>
      </div>

      {/* Total duration — static, no task */}
      <div className="bg-spotify-dark rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-spotify-green" />
          <span className="text-xs text-spotify-light-gray">Total Duration</span>
        </div>
        <div className="text-2xl font-bold">{totalMinutes} min</div>
      </div>

      {/* Top track — powered by get_top_tracks */}
      <div
        className="bg-spotify-dark rounded-lg p-3"
        data-task-id="task06-top-popular"
        data-task-label="get_top_tracks()"
        data-task-complete={completed['task06-top-popular'] ? 'true' : undefined}
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
          <div className="text-xs text-spotify-light-gray">
            Write get_top_tracks() to see the #1 track
          </div>
        )}
      </div>

      {/* Avg popularity — static */}
      <div className="bg-spotify-dark rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-spotify-light-gray">Avg Popularity</span>
        </div>
        <div className="text-2xl font-bold">
          {Math.round(tracks.reduce((s, t) => s + t.popularity, 0) / tracks.length)}
        </div>
      </div>
    </div>
  );
}
