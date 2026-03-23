import { useEffect } from 'react';
import { IDELayout } from './components/layout/IDELayout';
import { initPyodide } from './engine/pyodideManager';
import { useAutoExecute } from './hooks/useAutoExecute';

function App() {
  // Initialize Pyodide on mount
  useEffect(() => {
    initPyodide().catch((err) => {
      console.error('Failed to initialize Pyodide:', err);
    });
  }, []);

  // Auto-execute student code on changes
  useAutoExecute();

  return <IDELayout />;
}

export default App;
