import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, ChevronRight, Loader2 } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { useStudentResultStore } from '../../stores/studentResultStore';
import { getTaskById, taskRegistry } from '../../tasks/registry';

export function TaskPanel() {
  const currentTaskId = useAppStore((s) => s.currentTaskId);
  const executing = useStudentResultStore((s) => s.executing);
  const testResults = useStudentResultStore((s) => s.testResults);
  const results = useStudentResultStore((s) => s.results);
  const setCurrentTask = useAppStore((s) => s.setCurrentTask);
  const openFile = useAppStore((s) => s.openFile);
  const [hintsRevealed, setHintsRevealed] = useState(0);

  const task = currentTaskId ? getTaskById(currentTaskId) : null;
  const taskTestResults = currentTaskId ? testResults[currentTaskId] : undefined;
  const taskResult = currentTaskId ? results[currentTaskId] : undefined;

  if (!task) {
    return (
      <div className="h-full bg-spotify-dark border-t border-spotify-gray overflow-y-auto p-4">
        <div className="text-sm text-spotify-light-gray mb-3">Select a task to begin</div>
        <div className="space-y-1">
          {taskRegistry.map((t) => (
            <button
              key={t.id}
              className="w-full text-left px-3 py-2 rounded text-xs hover:bg-spotify-hover transition-colors"
              onClick={() => {
                setCurrentTask(t.id);
                openFile(`file-${t.id}`);
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-spotify-green font-mono">{t.functionName}()</span>
                <span className="text-spotify-light-gray">·</span>
                <span className="text-spotify-light-gray">{t.moduleLabel}</span>
              </div>
              <div className="text-spotify-light-gray mt-0.5">{t.description.slice(0, 80)}...</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const allPassed = taskTestResults?.every((r) => r.passed);
  const passedCount = taskTestResults?.filter((r) => r.passed).length ?? 0;
  const totalTests = task.testCases.length;

  return (
    <div className="h-full bg-spotify-dark border-t border-spotify-gray overflow-y-auto">
      {/* Task header */}
      <div className="p-3 border-b border-spotify-gray">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <span className="text-spotify-green font-mono">{task.functionName}()</span>
            {executing && <Loader2 className="w-3 h-3 animate-spin text-spotify-light-gray" />}
            {!executing && allPassed && <CheckCircle2 className="w-4 h-4 text-spotify-green" />}
          </h3>
          <div className="flex gap-1">
            {task.concepts.map((c) => (
              <span key={c} className="px-1.5 py-0.5 text-[10px] bg-spotify-gray rounded text-spotify-light-gray">
                {c}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs text-spotify-light-gray">{task.description}</p>
      </div>

      {/* Test results */}
      {taskTestResults && (
        <div className="p-3 border-b border-spotify-gray">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold">
              Tests: {passedCount}/{totalTests}
            </span>
            {allPassed && (
              <span className="text-[10px] text-spotify-green font-semibold">ALL PASSED!</span>
            )}
          </div>
          <div className="space-y-1">
            {taskTestResults.map((tr) => (
              <div
                key={tr.id}
                className={`flex items-start gap-2 p-2 rounded text-xs ${
                  tr.passed ? 'bg-green-900/20' : 'bg-red-900/20'
                }`}
              >
                {tr.passed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-spotify-green shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-error shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-spotify-light-gray">{tr.description}</div>
                  {!tr.passed && (
                    <div className="mt-1 font-mono text-[10px]">
                      <div className="text-spotify-light-gray">
                        Expected: <span className="text-spotify-green">{JSON.stringify(tr.expected)}</span>
                      </div>
                      <div className="text-spotify-light-gray">
                        Got: <span className="text-error">{JSON.stringify(tr.actual)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error display */}
      {taskResult?.error && (
        <div className="p-3 border-b border-spotify-gray">
          <div className="p-2 bg-red-900/20 rounded text-xs text-error font-mono">
            {taskResult.error.message}
          </div>
        </div>
      )}

      {/* Hints */}
      <div className="p-3">
        <button
          className="flex items-center gap-1 text-xs text-spotify-light-gray hover:text-white transition-colors mb-2"
          onClick={() => setHintsRevealed(Math.min(hintsRevealed + 1, task.hints.length))}
        >
          <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
          {hintsRevealed < task.hints.length ? (
            <>Show hint ({hintsRevealed}/{task.hints.length})</>
          ) : (
            <>All hints shown</>
          )}
        </button>
        {task.hints.slice(0, hintsRevealed).map((hint, i) => (
          <div key={i} className="flex items-start gap-2 p-2 bg-yellow-900/10 rounded text-xs text-spotify-light-gray mb-1">
            <ChevronRight className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
            <span>{hint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
