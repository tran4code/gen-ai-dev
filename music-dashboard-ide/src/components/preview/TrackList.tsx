import { Clock, Play } from 'lucide-react';
import { tracks } from '../../data/songs';
import { useStudentResultStore } from '../../stores/studentResultStore';
import { useAppStore } from '../../stores/appStore';
import { getTaskById } from '../../tasks/registry';

export function TrackList() {
  const results = useStudentResultStore((s) => s.results);
  const openFile = useAppStore((s) => s.openFile);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);
  const inspectMode = useAppStore((s) => s.inspectMode);

  // Get student results for formatting and filtering
  const formatTrackResult = results['task01-format-track'];
  const formatDurationResult = results['task02-format-duration'];
  const filterByArtistResult = results['task04-filter-by-artist'];

  // Determine which tracks to show
  const displayTracks =
    filterByArtistResult?.data && Array.isArray(filterByArtistResult.data)
      ? (filterByArtistResult.data as Record<string, unknown>[])
      : tracks.slice(0, 20);

  const hasFormatTrack = formatTrackResult?.data && !formatTrackResult.error;
  const hasFormatDuration = formatDurationResult?.data && !formatDurationResult.error;

  const handleInspectClick = (taskId: string) => {
    if (!inspectMode) return;
    const task = getTaskById(taskId);
    if (task) {
      openFile(`file-${task.id}`);
      setCurrentTask(task.id);
    }
  };

  // Format a track name, using student function result pattern or fallback
  const formatTrackName = (track: Record<string, unknown>) => {
    if (hasFormatTrack) {
      return `${track.artist} - ${track.name}`;
    }
    return String(track.name);
  };

  const formatDuration = (ms: number) => {
    if (hasFormatDuration) {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return '--:--';
  };

  return (
    <div className="bg-spotify-dark rounded-lg overflow-hidden">
      <div className="p-4 pb-2">
        <h2 className="text-lg font-bold">Tracks</h2>
        {filterByArtistResult?.data && !filterByArtistResult.error && (
          <p className="text-xs text-spotify-light-gray mt-1">
            Filtered: {(filterByArtistResult.data as unknown[]).length} tracks
          </p>
        )}
      </div>

      {/* Track list header */}
      <div className="grid grid-cols-[32px_1fr_1fr_80px] gap-2 px-4 py-2 text-xs text-spotify-light-gray border-b border-spotify-gray">
        <span>#</span>
        <span
          data-task-id="task01-format-track"
          data-task-label="format_track()"
          onClick={() => handleInspectClick('task01-format-track')}
        >
          Title
        </span>
        <span>Album</span>
        <span
          className="flex justify-end"
          data-task-id="task02-format-duration"
          data-task-label="format_duration()"
          onClick={() => handleInspectClick('task02-format-duration')}
        >
          <Clock className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Placeholder for filter_by_artist */}
      {!filterByArtistResult?.data && (
        <div
          className="mx-4 my-2 p-3 border border-dashed border-spotify-gray rounded text-center text-xs text-spotify-light-gray"
          data-task-id="task04-filter-by-artist"
          data-task-label="filter_by_artist()"
          onClick={() => handleInspectClick('task04-filter-by-artist')}
        >
          Write filter_by_artist() to filter tracks by artist
        </div>
      )}

      {/* Track rows */}
      <div className="px-2">
        {displayTracks.map((track, i) => (
          <div
            key={String(track.id ?? i)}
            className="grid grid-cols-[32px_1fr_1fr_80px] gap-2 px-2 py-2 text-sm hover:bg-spotify-hover rounded group items-center"
          >
            <span className="text-spotify-light-gray text-xs flex items-center justify-center">
              <span className="group-hover:hidden">{i + 1}</span>
              <Play className="w-3 h-3 hidden group-hover:block text-white" />
            </span>
            <div
              data-task-id="task01-format-track"
              data-task-label="format_track()"
              onClick={() => handleInspectClick('task01-format-track')}
            >
              <div className="text-white text-sm truncate">
                {hasFormatTrack ? formatTrackName(track) : String(track.name)}
              </div>
              {!hasFormatTrack && (
                <div className="text-xs text-spotify-light-gray truncate">
                  {String(track.artist ?? (track as any).artist?.name ?? '')}
                </div>
              )}
            </div>
            <span className="text-spotify-light-gray text-sm truncate">
              {String(track.album ?? '')}
            </span>
            <span
              className="text-spotify-light-gray text-sm text-right"
              data-task-id="task02-format-duration"
              data-task-label="format_duration()"
              onClick={() => handleInspectClick('task02-format-duration')}
            >
              {formatDuration(Number(track.duration_ms))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
