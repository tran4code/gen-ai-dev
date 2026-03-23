import { create } from 'zustand';

interface StudentCodeState {
  /** Maps taskId -> student's current code (the editable portion only) */
  code: Record<string, string>;
  /** Maps taskId -> whether the task is completed (all tests pass) */
  completed: Record<string, boolean>;

  setCode: (taskId: string, code: string) => void;
  setCompleted: (taskId: string, completed: boolean) => void;
  getCode: (taskId: string, fallback: string) => string;
}

export const useStudentCodeStore = create<StudentCodeState>((set, get) => ({
  code: {},
  completed: {},

  setCode: (taskId, code) =>
    set((state) => ({ code: { ...state.code, [taskId]: code } })),

  setCompleted: (taskId, completed) =>
    set((state) => ({ completed: { ...state.completed, [taskId]: completed } })),

  getCode: (taskId, fallback) => get().code[taskId] ?? fallback,
}));
