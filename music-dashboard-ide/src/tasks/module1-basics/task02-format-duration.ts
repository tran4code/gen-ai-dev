import { TaskDefinition } from '../types';

export const task02FormatDuration: TaskDefinition = {
  id: 'task02-format-duration',
  virtualPath: 'utils/formatters.py',
  module: 'module1-basics',
  moduleLabel: 'Module 1: Basics',
  displayName: 'format_duration',
  description:
    'Write a function that converts a duration in milliseconds to a human-readable string like "3:45". This will be shown as the track duration in the dashboard.',
  concepts: ['integer division', 'modulo operator', 'string formatting'],
  difficulty: 1,
  fileTemplate: `# utils/formatters.py
# Functions for formatting track data for display.

def format_duration(ms):
    """
    Convert milliseconds to a "minutes:seconds" string.

    Args:
        ms: Duration in milliseconds (integer)

    Returns:
        A string like "3:45" (seconds always 2 digits)

    Example:
        >>> format_duration(200690)
        "3:20"
    """
# --- YOUR CODE START ---
    return "0:00"
# --- YOUR CODE END ---
`,
  starterCode: '    return "0:00"',
  functionName: 'format_duration',
  dashboardCallArgs: 'tracks[0]["duration_ms"]',
  testCases: [
    {
      id: 'tc02-1',
      description: '200690ms → "3:20"',
      callExpression: 'format_duration(200690)',
      expected: '3:20',
      comparator: 'exact',
    },
    {
      id: 'tc02-2',
      description: '231833ms → "3:51"',
      callExpression: 'format_duration(231833)',
      expected: '3:51',
      comparator: 'exact',
    },
    {
      id: 'tc02-3',
      description: '60000ms → "1:00"',
      callExpression: 'format_duration(60000)',
      expected: '1:00',
      comparator: 'exact',
    },
    {
      id: 'tc02-4',
      description: '361027ms → "6:01"',
      callExpression: 'format_duration(361027)',
      expected: '6:01',
      comparator: 'exact',
    },
  ],
  hints: [
    'To get minutes from milliseconds: first divide by 1000 to get seconds, then divide by 60.',
    'Use integer division (//) to get whole minutes, and modulo (%) to get remaining seconds.',
    'Use an f-string with :02d to pad seconds to 2 digits: f"{minutes}:{seconds:02d}"',
  ],
  dashboardBinding: {
    componentId: 'trackList',
    dataKey: 'formatDuration',
    fallbackValue: null,
    placeholderText: 'Write format_duration() to see track durations here',
  },
};
