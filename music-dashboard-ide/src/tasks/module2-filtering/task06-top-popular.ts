import { TaskDefinition } from '../types';

export const task06TopPopular: TaskDefinition = {
  id: 'task06-top-popular',
  virtualPath: 'utils/filters.py',
  module: 'module2-filtering',
  moduleLabel: 'Module 2: Filtering',
  displayName: 'get_top_tracks',
  description:
    'Write a function that returns the top N most popular tracks, sorted by popularity (highest first). This powers the "Top Tracks" card on the dashboard.',
  concepts: ['sorting', 'slicing', 'lambda functions'],
  difficulty: 2,
  fileTemplate: `# utils/filters.py
# Functions for filtering track data.

def get_top_tracks(track_list, n):
    """
    Get the top N tracks sorted by popularity (highest first).

    Args:
        track_list: A list of track dictionaries
        n: Number of top tracks to return

    Returns:
        A list of the n most popular tracks, sorted by popularity descending

    Example:
        >>> get_top_tracks(tracks, 3)
        [{"name": "Blinding Lights", "popularity": 96, ...}, ...]
    """
# --- YOUR CODE START ---
    return []
# --- YOUR CODE END ---
`,
  starterCode: '    return []',
  functionName: 'get_top_tracks',
  dashboardCallArgs: 'tracks, 10',
  testCases: [
    {
      id: 'tc06-1',
      description: 'Top 1 track is Blinding Lights (popularity 96)',
      callExpression: 'get_top_tracks(tracks, 1)[0]["name"]',
      expected: 'Blinding Lights',
      comparator: 'exact',
    },
    {
      id: 'tc06-2',
      description: 'Top 5 tracks returns 5 items',
      callExpression: 'len(get_top_tracks(tracks, 5))',
      expected: 5,
      comparator: 'exact',
    },
    {
      id: 'tc06-3',
      description: 'Results are sorted by popularity descending',
      callExpression:
        '[t["popularity"] for t in get_top_tracks(tracks, 5)]',
      expected: [96, 95, 94, 94, 93],
      comparator: 'deep',
    },
    {
      id: 'tc06-4',
      description: 'Top 0 returns empty list',
      callExpression: 'get_top_tracks(tracks, 0)',
      expected: [],
      comparator: 'deep',
    },
  ],
  hints: [
    'Python\'s sorted() function can sort a list. Use the key parameter to sort by popularity.',
    'Use sorted(track_list, key=lambda t: t["popularity"], reverse=True) to sort descending.',
    'After sorting, use slicing [:n] to get only the first n tracks.',
  ],
  dashboardBinding: {
    componentId: 'topTracks',
    dataKey: 'topTracks',
    fallbackValue: [],
    placeholderText: 'Write get_top_tracks() to see the most popular tracks here',
  },
};
