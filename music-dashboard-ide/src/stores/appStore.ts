import { create } from 'zustand';

interface AppState {
  currentTaskId: string | null;
  openFileIds: string[];
  activeFileId: string | null;
  inspectMode: boolean;
  pyodideReady: boolean;
  pyodideLoading: boolean;

  setCurrentTask: (taskId: string) => void;
  openFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string) => void;
  toggleInspectMode: () => void;
  setPyodideReady: (ready: boolean) => void;
  setPyodideLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentTaskId: null,
  openFileIds: [],
  activeFileId: null,
  inspectMode: false,
  pyodideReady: false,
  pyodideLoading: false,

  setCurrentTask: (taskId) => set({ currentTaskId: taskId }),

  openFile: (fileId) =>
    set((state) => ({
      openFileIds: state.openFileIds.includes(fileId)
        ? state.openFileIds
        : [...state.openFileIds, fileId],
      activeFileId: fileId,
    })),

  closeFile: (fileId) =>
    set((state) => {
      const newOpen = state.openFileIds.filter((id) => id !== fileId);
      return {
        openFileIds: newOpen,
        activeFileId:
          state.activeFileId === fileId
            ? newOpen[newOpen.length - 1] ?? null
            : state.activeFileId,
      };
    }),

  setActiveFile: (fileId) => set({ activeFileId: fileId }),
  toggleInspectMode: () => set((state) => ({ inspectMode: !state.inspectMode })),
  setPyodideReady: (ready) => set({ pyodideReady: ready }),
  setPyodideLoading: (loading) => set({ pyodideLoading: loading }),
}));
