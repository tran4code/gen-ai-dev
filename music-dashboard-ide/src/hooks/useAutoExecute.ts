import { useEffect, useRef } from 'react';
import { useStudentCodeStore } from '../stores/studentCodeStore';
import { useAppStore } from '../stores/appStore';
import { getTaskById } from '../tasks/registry';
import { executeTask } from '../engine/executor';

/**
 * Watches student code changes and auto-executes via Pyodide (debounced).
 * Should be mounted once at the app level.
 */
export function useAutoExecute() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCodeRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const unsub = useStudentCodeStore.subscribe((state) => {
      const pyodideReady = useAppStore.getState().pyodideReady;
      if (!pyodideReady) return;

      // Find which task codes changed
      for (const [taskId, code] of Object.entries(state.code)) {
        if (lastCodeRef.current[taskId] === code) continue;
        lastCodeRef.current[taskId] = code;

        // Debounce execution
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          const task = getTaskById(taskId);
          if (task) {
            executeTask(task, code);
          }
        }, 600);
      }
    });

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
}
