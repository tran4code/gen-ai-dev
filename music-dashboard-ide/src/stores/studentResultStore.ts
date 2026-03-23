import { create } from 'zustand';

export interface ExecutionError {
  message: string;
  line?: number;
}

export interface TaskResult {
  data: unknown;
  error: ExecutionError | null;
  timestamp: number;
}

export interface TestCaseResult {
  id: string;
  passed: boolean;
  expected: unknown;
  actual: unknown;
  description: string;
}

interface StudentResultState {
  /** Maps taskId -> latest execution result */
  results: Record<string, TaskResult>;
  /** Maps taskId -> test case results */
  testResults: Record<string, TestCaseResult[]>;
  /** Whether execution is currently running */
  executing: boolean;

  setResult: (taskId: string, result: TaskResult) => void;
  setTestResults: (taskId: string, results: TestCaseResult[]) => void;
  setExecuting: (executing: boolean) => void;
  getResult: (taskId: string) => TaskResult | null;
}

export const useStudentResultStore = create<StudentResultState>((set, get) => ({
  results: {},
  testResults: {},
  executing: false,

  setResult: (taskId, result) =>
    set((state) => ({ results: { ...state.results, [taskId]: result } })),

  setTestResults: (taskId, results) =>
    set((state) => ({ testResults: { ...state.testResults, [taskId]: results } })),

  setExecuting: (executing) => set({ executing }),

  getResult: (taskId) => get().results[taskId] ?? null,
}));
