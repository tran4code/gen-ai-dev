import { TaskDefinition } from '../types';

export const task05FilterLongTracks: TaskDefinition = {
  id: 'task05-filter-long-tracks',
  virtualPath: 'utils/filters.py',
  module: 'module2-filtering',
  moduleLabel: 'Module 2: Filtering',
  displayName: 'filter_long_tracks',
  description:
    'Write a function that filters tracks to only those longer than a given duration. The dashboard will show a "Long Tracks" section with these results.',
  concepts: ['comparison operators', 'filtering', 'parameters'],
  difficulty: 2,
  fileTemplate: `# utils/filters.py
# Functions for filtering track data.

def filter_long_tracks(track_list, min_duration_ms):
    """
    Filter tracks that are longer than the given duration.

    Args:
        track_list: A list of track dictionaries
        min_duration_ms: Minimum duration in milliseconds

    Returns:
        A list of tracks where duration_ms > min_duration_ms

    Example:
        >>> filter_long_tracks(tracks, 300000)  # tracks over 5 minutes
        [{"name": "After Hours", ...}, {"name": "Money Trees", ...}]
    """
# SOLUTION:
#     result = []
#     for track in track_list:
#         if track["duration_ms"] > min_duration_ms:
#             result.append(track)
#     return result
# --- YOUR CODE START ---
    return []
# --- YOUR CODE END ---
`,
  starterCode: '    return []',
  functionName: 'filter_long_tracks',
  dashboardCallArgs: 'tracks, 270000',
  testCases: [
    {
      id: 'tc05-1',
      description: 'Filter tracks over 5 minutes (300000ms)',
      callExpression: 'len(filter_long_tracks(tracks, 300000))',
      expected: 5,
      comparator: 'exact',
    },
    {
      id: 'tc05-2',
      description: 'Filter tracks over 4 minutes (240000ms)',
      callExpression: 'len(filter_long_tracks(tracks, 240000))',
      expected: 24,
      comparator: 'exact',
    },
    {
      id: 'tc05-3',
      description: 'Very long threshold returns empty',
      callExpression: 'filter_long_tracks(tracks, 999999)',
      expected: [],
      comparator: 'deep',
    },
    {
      id: 'tc05-4',
      description: 'All results are actually long enough',
      callExpression: 'all(t["duration_ms"] > 250000 for t in filter_long_tracks(tracks, 250000))',
      expected: true,
      comparator: 'exact',
    },
  ],
  hints: [
    'This works just like filter_by_artist, but you compare a number instead of a string.',
    'Use > to check: if track["duration_ms"] > min_duration_ms:',
    'Same pattern: empty list, for loop, if statement, append, return.',
  ],
  dashboardBinding: {
    componentId: 'trackList',
    dataKey: 'filterLongTracks',
    fallbackValue: [],
    placeholderText: 'Write filter_long_tracks() to see long tracks here',
  },
};
