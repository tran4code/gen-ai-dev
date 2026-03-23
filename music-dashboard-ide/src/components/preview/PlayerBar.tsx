import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';

export function PlayerBar() {
  return (
    <div className="h-16 bg-spotify-dark border-t border-spotify-gray flex items-center px-4 shrink-0">
      {/* Now playing info */}
      <div className="flex items-center gap-3 w-44">
        <div className="w-10 h-10 bg-spotify-gray rounded flex items-center justify-center">
          <Play className="w-4 h-4 text-spotify-light-gray" />
        </div>
        <div>
          <div className="text-xs font-medium text-white truncate">No track playing</div>
          <div className="text-[10px] text-spotify-light-gray truncate">Select a track</div>
        </div>
      </div>

      {/* Playback controls */}
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <Shuffle className="w-3 h-3 text-spotify-light-gray" />
          <SkipBack className="w-3.5 h-3.5 text-spotify-light-gray" />
          <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
            <Play className="w-3.5 h-3.5 text-black ml-0.5" />
          </button>
          <SkipForward className="w-3.5 h-3.5 text-spotify-light-gray" />
          <Repeat className="w-3 h-3 text-spotify-light-gray" />
        </div>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-[10px] text-spotify-light-gray">0:00</span>
          <div className="flex-1 h-1 bg-spotify-gray rounded-full">
            <div className="w-0 h-full bg-spotify-light-gray rounded-full" />
          </div>
          <span className="text-[10px] text-spotify-light-gray">0:00</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-32 justify-end">
        <Volume2 className="w-3.5 h-3.5 text-spotify-light-gray" />
        <div className="w-20 h-1 bg-spotify-gray rounded-full">
          <div className="w-3/4 h-full bg-spotify-light-gray rounded-full" />
        </div>
      </div>
    </div>
  );
}
