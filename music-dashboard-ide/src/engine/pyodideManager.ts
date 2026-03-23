import { tracks } from '../data/songs';
import { useAppStore } from '../stores/appStore';

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: { get: (name: string) => unknown; set: (name: string, value: unknown) => void };
  loadPackage: (packages: string[]) => Promise<void>;
  isPyProxy: (value: unknown) => boolean;
  toPy: (value: unknown) => unknown;
}

let pyodide: PyodideInterface | null = null;
let loadingPromise: Promise<PyodideInterface> | null = null;

/** Convert tracks to plain Python-friendly dicts */
function getTracksAsPythonData() {
  return tracks.map((t) => ({
    id: t.id,
    name: t.name,
    artist: t.artist.name,
    artist_id: t.artist.id,
    album: t.album.name,
    album_id: t.album.id,
    duration_ms: t.duration_ms,
    popularity: t.popularity,
    explicit: t.explicit,
    track_number: t.track_number,
    release_year: t.album.releaseYear,
  }));
}

export async function initPyodide(): Promise<PyodideInterface> {
  if (pyodide) return pyodide;
  if (loadingPromise) return loadingPromise;

  useAppStore.getState().setPyodideLoading(true);

  loadingPromise = (async () => {
    // Load Pyodide script dynamically
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }

    const py = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });

    // Inject song data into Python global scope
    const tracksData = getTracksAsPythonData();
    py.globals.set('_tracks_json', JSON.stringify(tracksData));

    await py.runPythonAsync(`
import json

# Parse the track data
tracks = json.loads(_tracks_json)

# Helper: pretty print a track
def print_track(track):
    mins = track['duration_ms'] // 60000
    secs = (track['duration_ms'] % 60000) // 1000
    return f"{track['artist']} - {track['name']} ({mins}:{secs:02d})"
`);

    pyodide = py;
    useAppStore.getState().setPyodideReady(true);
    useAppStore.getState().setPyodideLoading(false);
    return py;
  })();

  return loadingPromise;
}

export async function runPython(code: string): Promise<{ result: unknown; error: string | null; output: string }> {
  const py = await initPyodide();

  const wrappedCode = `
import json, sys, io

# Capture stdout
_captured_output = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _captured_output

try:
    # Student code
${code.split('\n').map(line => '    ' + line).join('\n')}
except Exception as _e:
    pass

sys.stdout = _old_stdout
_captured_output.getvalue()
`;

  try {
    const output = await py.runPythonAsync(wrappedCode) as string;
    return { result: null, error: null, output: output || '' };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { result: null, error: msg, output: '' };
  }
}

/**
 * Execute student code and call a specific function, returning its result as JSON.
 */
export async function callStudentFunction(
  studentCode: string,
  functionName: string,
  args: string,
): Promise<{ result: unknown; error: string | null }> {
  const py = await initPyodide();

  const harness = `
import json

# Reset any previous student definitions
${studentCode}

# Call the student function and serialize result
try:
    _result = ${functionName}(${args})
    json.dumps(_result)
except Exception as _e:
    json.dumps({"__error__": str(_e)})
`;

  try {
    const jsonStr = await py.runPythonAsync(harness) as string;
    const parsed = JSON.parse(jsonStr);
    if (parsed && typeof parsed === 'object' && '__error__' in parsed) {
      return { result: null, error: parsed.__error__ };
    }
    return { result: parsed, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { result: null, error: msg };
  }
}

export function isPyodideReady(): boolean {
  return pyodide !== null;
}
