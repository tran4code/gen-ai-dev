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
# SOLUTION:
#     # Make a copy so we don't change the original list
#     sorted_list = []
#     for track in track_list:
#         sorted_list.append(track)
#     # Bubble sort by popularity (highest first)
#     for i in range(len(sorted_list)):
#         for j in range(len(sorted_list) - 1):
#             if sorted_list[j]["popularity"] < sorted_list[j + 1]["popularity"]:
#                 temp = sorted_list[j]
#                 sorted_list[j] = sorted_list[j + 1]
#                 sorted_list[j + 1] = temp
#     # Return the first n tracks
#     result = []
#     for i in range(n):
#         result.append(sorted_list[i])
#     return result
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
    'First, copy all the tracks into a new list so you can rearrange them without changing the original.',
    'To sort: use two nested for loops. Compare neighbors and swap if the left one has lower popularity (this is called bubble sort).',
    'To swap two items: save one in a temp variable, then overwrite. Finally, return just the first n items using another loop.',
  ],
  dashboardBinding: {
    componentId: 'topTracks',
    dataKey: 'topTracks',
    fallbackValue: [],
    placeholderText: 'Write get_top_tracks() to see the most popular tracks here',
  },
};
