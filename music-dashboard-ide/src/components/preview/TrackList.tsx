import { Clock, Play } from 'lucide-react';
import { tracks } from '../../data/songs';
import { useStudentResultStore } from '../../stores/studentResultStore';
import { useStudentCodeStore } from '../../stores/studentCodeStore';

export function TrackList() {
  const results = useStudentResultStore((s) => s.results);
  const completed = useStudentCodeStore((s) => s.completed);

  const formatTrackResult = results['task01-format-track'];
  const formatDurationResult = results['task02-format-duration'];
  const filterByArtistResult = results['task04-filter-by-artist'];
  const filterLongResult = results['task05-filter-long-tracks'];

  const displayTracks =
    filterByArtistResult?.data && Array.isArray(filterByArtistResult.data)
      ? (filterByArtistResult.data as Record<string, unknown>[])
      : tracks.slice(0, 20);

  const hasFormatTrack = formatTrackResult?.data && !formatTrackResult.error;
  const hasFormatDuration = formatDurationResult?.data && !formatDurationResult.error;

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
    <div className="space-y-3">
      {/* Format Track section */}
      <div
        className="bg-spotify-dark rounded-lg overflow-hidden"
        data-task-id="task01-format-track"
        data-task-label="format_track()"
        data-task-complete={completed['task01-format-track'] ? 'true' : undefined}
      >
        <div className="p-3 pb-1">
          <h2 className="text-sm font-bold">Track Names</h2>
          {!hasFormatTrack && (
            <p className="text-[10px] text-spotify-light-gray mt-0.5">
              Write format_track() to format "Artist - Title"
            </p>
          )}
        </div>
        <div className="px-2 pb-2">
          {displayTracks.slice(0, 8).map((track, i) => (
            <div
              key={String(track.id ?? i)}
              className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-spotify-hover rounded group"
            >
              <span className="text-spotify-light-gray text-xs w-5 text-center shrink-0">
                <span className="group-hover:hidden">{i + 1}</span>
                <Play className="w-3 h-3 hidden group-hover:block mx-auto text-white" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm truncate">
                  {hasFormatTrack ? formatTrackName(track) : String(track.name)}
                </div>
                {!hasFormatTrack && (
                  <div className="text-xs text-spotify-light-gray truncate">
                    {String(track.artist ?? '')}
                  </div>
                )}
              </div>
              <span className="text-spotify-light-gray text-xs shrink-0">
                {formatDuration(Number(track.duration_ms))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Format Duration section */}
      <div
        className="bg-spotify-dark rounded-lg p-3"
        data-task-id="task02-format-duration"
        data-task-label="format_duration()"
        data-task-complete={completed['task02-format-duration'] ? 'true' : undefined}
      >
        <h2 className="text-sm font-bold mb-1">Durations</h2>
        {!hasFormatDuration ? (
          <p className="text-xs text-spotify-light-gray">
            Write format_duration() to convert milliseconds → "3:45"
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {displayTracks.slice(0, 6).map((track, i) => (
              <span key={i} className="text-xs bg-spotify-gray px-2 py-1 rounded text-spotify-light-gray">
                {formatDuration(Number(track.duration_ms))}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Filter by Artist section */}
      <div
        className="bg-spotify-dark rounded-lg p-3"
        data-task-id="task04-filter-by-artist"
        data-task-label="filter_by_artist()"
        data-task-complete={completed['task04-filter-by-artist'] ? 'true' : undefined}
      >
        <h2 className="text-sm font-bold mb-1">Filter by Artist</h2>
        {filterByArtistResult?.data && !filterByArtistResult.error && Array.isArray(filterByArtistResult.data) ? (
          <div>
            <p className="text-xs text-spotify-green mb-1">
              Showing {(filterByArtistResult.data as unknown[]).length} tracks
            </p>
            {(filterByArtistResult.data as Record<string, unknown>[]).slice(0, 5).map((t, i) => (
              <div key={i} className="text-xs text-spotify-light-gray py-0.5 truncate">
                {String(t.name)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-spotify-light-gray">
            Write filter_by_artist() to filter tracks by artist name
          </p>
        )}
      </div>

      {/* Filter Long Tracks section */}
      <div
        className="bg-spotify-dark rounded-lg p-3"
        data-task-id="task05-filter-long-tracks"
        data-task-label="filter_long_tracks()"
        data-task-complete={completed['task05-filter-long-tracks'] ? 'true' : undefined}
      >
        <h2 className="text-sm font-bold mb-1">Long Tracks (4:30+)</h2>
        {filterLongResult?.data && !filterLongResult.error && Array.isArray(filterLongResult.data) ? (
          <div>
            <p className="text-xs text-spotify-green mb-1">
              Found {(filterLongResult.data as unknown[]).length} long tracks
            </p>
            {(filterLongResult.data as Record<string, unknown>[]).slice(0, 5).map((t, i) => (
              <div key={i} className="text-xs text-spotify-light-gray py-0.5 truncate">
                {String(t.name)} — {String(t.artist)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-spotify-light-gray">
            Write filter_long_tracks() to find tracks over 4:30
          </p>
        )}
      </div>
    </div>
  );
}
