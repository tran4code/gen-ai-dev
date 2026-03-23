import { TaskDefinition } from '../types';

export const task01FormatTrack: TaskDefinition = {
  id: 'task01-format-track',
  virtualPath: 'utils/formatters.py',
  module: 'module1-basics',
  moduleLabel: 'Module 1: Basics',
  displayName: 'format_track',
  description:
    'Write a function that takes a track dictionary and returns a formatted string like "Artist - Title". This formatted text will appear in the track list of the dashboard.',
  concepts: ['string concatenation', 'dictionary access'],
  difficulty: 1,
  fileTemplate: `# utils/formatters.py
# Functions for formatting track data for display.

def format_track(track):
    """
    Format a track for display in the track list.

    Args:
        track: A dictionary with keys 'name', 'artist', 'album',
               'duration_ms', 'popularity', 'explicit'

    Returns:
        A string like "Artist - Title"

    Example:
        >>> format_track({"name": "Anti-Hero", "artist": "Taylor Swift"})
        "Taylor Swift - Anti-Hero"
    """
# --- YOUR CODE START ---
    return ""
# --- YOUR CODE END ---
`,
  starterCode: '    return ""',
  functionName: 'format_track',
  dashboardCallArgs: 'tracks[0]',
  testCases: [
    {
      id: 'tc01-1',
      description: 'Format a Taylor Swift track',
      callExpression: 'format_track({"name": "Anti-Hero", "artist": "Taylor Swift"})',
      expected: 'Taylor Swift - Anti-Hero',
      comparator: 'exact',
    },
    {
      id: 'tc01-2',
      description: 'Format a Drake track',
      callExpression: 'format_track({"name": "God\'s Plan", "artist": "Drake"})',
      expected: "Drake - God's Plan",
      comparator: 'exact',
    },
    {
      id: 'tc01-3',
      description: 'Format a Billie Eilish track',
      callExpression: 'format_track({"name": "bad guy", "artist": "Billie Eilish"})',
      expected: 'Billie Eilish - bad guy',
      comparator: 'exact',
    },
  ],
  hints: [
    'A track is a dictionary. Access the artist with track["artist"].',
    'Use the + operator or an f-string to combine the artist and name.',
    'The format is: track["artist"] + " - " + track["name"]',
  ],
  dashboardBinding: {
    componentId: 'trackList',
    dataKey: 'formatTrack',
    fallbackValue: null,
    placeholderText: 'Write format_track() to see formatted track names here',
  },
};
