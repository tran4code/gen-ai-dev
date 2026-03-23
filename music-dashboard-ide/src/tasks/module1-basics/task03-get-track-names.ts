import { TaskDefinition } from '../types';

export const task03GetTrackNames: TaskDefinition = {
  id: 'task03-get-track-names',
  virtualPath: 'utils/helpers.py',
  module: 'module1-basics',
  moduleLabel: 'Module 1: Basics',
  displayName: 'get_track_names',
  description:
    'Write a function that extracts just the song names from a list of tracks. The sidebar will display this list of track names.',
  concepts: ['for loops', 'lists', 'appending'],
  difficulty: 1,
  fileTemplate: `# utils/helpers.py
# Helper functions for extracting and transforming track data.

def get_track_names(track_list):
    """
    Extract the name of each track from a list.

    Args:
        track_list: A list of track dictionaries

    Returns:
        A list of strings (just the track names)

    Example:
        >>> get_track_names([{"name": "Anti-Hero", "artist": "Taylor Swift"}])
        ["Anti-Hero"]
    """
# --- YOUR CODE START ---
    return []
# --- YOUR CODE END ---
`,
  starterCode: '    return []',
  functionName: 'get_track_names',
  dashboardCallArgs: 'tracks',
  testCases: [
    {
      id: 'tc03-1',
      description: 'Extract names from 2 tracks',
      callExpression:
        'get_track_names([{"name": "Anti-Hero", "artist": "Taylor Swift"}, {"name": "bad guy", "artist": "Billie Eilish"}])',
      expected: ['Anti-Hero', 'bad guy'],
      comparator: 'deep',
    },
    {
      id: 'tc03-2',
      description: 'Empty list returns empty list',
      callExpression: 'get_track_names([])',
      expected: [],
      comparator: 'deep',
    },
    {
      id: 'tc03-3',
      description: 'Works with full track data',
      callExpression: 'len(get_track_names(tracks))',
      expected: 102,
      comparator: 'exact',
    },
  ],
  hints: [
    'Create an empty list, then loop through each track and append the name.',
    'Access the name with track["name"] inside a for loop.',
    'Or use a list comprehension: [track["name"] for track in track_list]',
  ],
  dashboardBinding: {
    componentId: 'sidebar',
    dataKey: 'trackNames',
    fallbackValue: [],
    placeholderText: 'Write get_track_names() to see track names in the sidebar',
  },
};
