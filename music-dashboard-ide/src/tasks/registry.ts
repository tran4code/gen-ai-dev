import { TaskDefinition, VirtualFile } from './types';
import { task01FormatTrack } from './module1-basics/task01-format-track';
import { task02FormatDuration } from './module1-basics/task02-format-duration';
import { task03GetTrackNames } from './module1-basics/task03-get-track-names';
import { task04FilterByArtist } from './module2-filtering/task04-filter-by-artist';
import { task05FilterLongTracks } from './module2-filtering/task05-filter-long-tracks';
import { task06TopPopular } from './module2-filtering/task06-top-popular';

export const taskRegistry: TaskDefinition[] = [
  task01FormatTrack,
  task02FormatDuration,
  task03GetTrackNames,
  task04FilterByArtist,
  task05FilterLongTracks,
  task06TopPopular,
];

export function getTaskById(id: string): TaskDefinition | undefined {
  return taskRegistry.find((t) => t.id === id);
}

/** Read-only context files that appear in the file tree */
const readonlyFiles: VirtualFile[] = [
  {
    id: 'file-songs',
    path: 'data/songs.py',
    name: 'songs.py',
    type: 'readonly',
    language: 'python',
    content: `# data/songs.py
# This module contains the track dataset used by the dashboard.
# Each track is a dictionary with these fields:
#
#   {
#       "id": "t01",
#       "name": "Anti-Hero",
#       "artist": "Taylor Swift",
#       "album": "Midnights",
#       "duration_ms": 200690,
#       "popularity": 95,      # 0-100 score
#       "explicit": False,
#       "track_number": 3,
#       "release_year": 2022
#   }
#
# The full dataset has 102 tracks from 22 artists.
# This data is pre-loaded and available as the variable: tracks

# To see all tracks, just use the 'tracks' variable in your code.
# Example:
#   for track in tracks:
#       print(track["name"])
`,
  },
  {
    id: 'file-readme',
    path: 'README.py',
    name: 'README.py',
    type: 'readonly',
    language: 'python',
    content: `# ================================================
# Music Dashboard - Student Code Guide
# ================================================
#
# Welcome! You're building the logic that powers
# a music streaming dashboard.
#
# HOW IT WORKS:
# - Browse the file tree on the left
# - Edit the highlighted sections in each file
# - Watch the dashboard on the right update live!
#
# FILES YOU'LL EDIT:
#   utils/formatters.py  - Format track data for display
#   utils/helpers.py     - Extract and transform data
#   utils/filters.py     - Filter and sort tracks
#
# AVAILABLE DATA:
#   tracks - A list of 102 track dictionaries
#   Each track has: name, artist, album, duration_ms,
#                   popularity, explicit, release_year
#
# TIPS:
#   - Look at the task description below the editor
#   - Use the hints if you get stuck
#   - Your code runs automatically as you type!
`,
  },
];

/** Build all virtual files from tasks + context files */
export function buildVirtualFiles(): VirtualFile[] {
  const taskFiles: VirtualFile[] = taskRegistry.map((task) => ({
    id: `file-${task.id}`,
    path: task.virtualPath,
    name: task.virtualPath.split('/').pop()!,
    type: 'task' as const,
    content: task.fileTemplate,
    taskId: task.id,
    language: 'python',
  }));

  // Deduplicate task files that share the same virtualPath
  // (e.g., multiple tasks in utils/filters.py)
  const uniqueTaskFiles = new Map<string, VirtualFile>();
  for (const file of taskFiles) {
    if (!uniqueTaskFiles.has(file.path)) {
      uniqueTaskFiles.set(file.path, file);
    }
  }

  return [...readonlyFiles, ...uniqueTaskFiles.values()];
}

/** Get tasks that belong to a given virtual file path */
export function getTasksForFile(virtualPath: string): TaskDefinition[] {
  return taskRegistry.filter((t) => t.virtualPath === virtualPath);
}
