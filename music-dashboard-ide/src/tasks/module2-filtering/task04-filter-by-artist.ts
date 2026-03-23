import { TaskDefinition } from '../types';

export const task04FilterByArtist: TaskDefinition = {
  id: 'task04-filter-by-artist',
  virtualPath: 'utils/filters.py',
  module: 'module2-filtering',
  moduleLabel: 'Module 2: Filtering',
  displayName: 'filter_by_artist',
  description:
    'Write a function that filters a list of tracks to only include tracks by a specific artist. The dashboard track list will update to show only that artist\'s songs.',
  concepts: ['for loops', 'if statements', 'filtering', 'string comparison'],
  difficulty: 1,
  fileTemplate: `# utils/filters.py
# Functions for filtering track data.

def filter_by_artist(track_list, artist_name):
    """
    Filter tracks to only those by a specific artist.

    Args:
        track_list: A list of track dictionaries
        artist_name: The artist name to filter by (string)

    Returns:
        A list of tracks where the artist matches

    Example:
        >>> filter_by_artist(tracks, "Drake")
        [{"name": "God's Plan", ...}, {"name": "Hotline Bling", ...}, ...]
    """
# SOLUTION:
#     result = []
#     for track in track_list:
#         if track["artist"] == artist_name:
#             result.append(track)
#     return result
# --- YOUR CODE START ---
    return []
# --- YOUR CODE END ---
`,
  starterCode: '    return []',
  functionName: 'filter_by_artist',
  dashboardCallArgs: 'tracks, "Taylor Swift"',
  testCases: [
    {
      id: 'tc04-1',
      description: 'Filter Taylor Swift tracks',
      callExpression: 'len(filter_by_artist(tracks, "Taylor Swift"))',
      expected: 7,
      comparator: 'exact',
    },
    {
      id: 'tc04-2',
      description: 'Filter Drake tracks',
      callExpression: 'len(filter_by_artist(tracks, "Drake"))',
      expected: 5,
      comparator: 'exact',
    },
    {
      id: 'tc04-3',
      description: 'Unknown artist returns empty list',
      callExpression: 'filter_by_artist(tracks, "Unknown Artist")',
      expected: [],
      comparator: 'deep',
    },
    {
      id: 'tc04-4',
      description: 'Filtered tracks have correct artist',
      callExpression: 'all(t["artist"] == "BTS" for t in filter_by_artist(tracks, "BTS"))',
      expected: true,
      comparator: 'exact',
    },
  ],
  hints: [
    'Start with an empty list: result = []',
    'Use a for loop and an if statement: if track["artist"] == artist_name: then append that track.',
    'Remember to return result at the end, outside the loop.',
  ],
  dashboardBinding: {
    componentId: 'trackList',
    dataKey: 'filterByArtist',
    fallbackValue: [],
    placeholderText: 'Write filter_by_artist() to filter the track list by artist',
  },
};
