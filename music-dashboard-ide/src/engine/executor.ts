import { initPyodide } from './pyodideManager';
import { TaskDefinition } from '../tasks/types';
import { useStudentResultStore, TaskResult, TestCaseResult } from '../stores/studentResultStore';
import { useStudentCodeStore } from '../stores/studentCodeStore';

/**
 * Execute a student's code for a given task:
 * 1. Run the student code to define the function
 * 2. Call the function with dashboard args to get display data
 * 3. Run all test cases
 * 4. Store results
 */
/**
 * Reconstruct the full Python function from the template + student code.
 * The student code is the body lines between the markers.
 */
function buildFullPython(task: TaskDefinition, studentCode: string): string {
  const lines = task.fileTemplate.split('\n');
  const startIdx = lines.findIndex((l) => l.includes('YOUR CODE START'));
  const endIdx = lines.findIndex((l) => l.includes('YOUR CODE END'));

  if (startIdx === -1 || endIdx === -1) return studentCode;

  // Take everything except the markers and lines between them,
  // then insert the student code. Also strip comment-only lines like imports
  // that reference local modules (they don't exist in Pyodide).
  const before = lines.slice(0, startIdx);
  const after = lines.slice(endIdx + 1);

  // Filter out fake import lines (e.g., "from data.songs import tracks")
  const cleanBefore = before.filter(
    (l) => !l.match(/^\s*from\s+(data|app|utils)\.\S+\s+import/)
  );

  return [...cleanBefore, studentCode, ...after].join('\n');
}

export async function executeTask(task: TaskDefinition, studentCode: string): Promise<void> {
  const resultStore = useStudentResultStore.getState();
  resultStore.setExecuting(true);

  try {
    const py = await initPyodide();

    // Build full Python code with the function definition intact
    const fullPython = buildFullPython(task, studentCode);

    const harness = `
import json

${fullPython}

# Call for dashboard display
try:
    _dashboard_result = ${task.functionName}(${task.dashboardCallArgs})
    _dashboard_json = json.dumps(_dashboard_result)
except Exception as _e:
    _dashboard_json = json.dumps({"__error__": str(_e)})

_dashboard_json
`;

    // Execute and get dashboard result
    const dashboardJson = (await py.runPythonAsync(harness)) as string;
    let dashboardData: unknown;
    let dashboardError: string | null = null;

    try {
      const parsed = JSON.parse(dashboardJson);
      if (parsed && typeof parsed === 'object' && '__error__' in parsed) {
        dashboardError = parsed.__error__;
        dashboardData = null;
      } else {
        dashboardData = parsed;
      }
    } catch {
      dashboardError = 'Failed to parse result';
      dashboardData = null;
    }

    // Store dashboard result
    const taskResult: TaskResult = {
      data: dashboardData,
      error: dashboardError ? { message: dashboardError } : null,
      timestamp: Date.now(),
    };
    resultStore.setResult(task.id, taskResult);

    // Run test cases
    const testResults: TestCaseResult[] = [];
    for (const tc of task.testCases) {
      const testHarness = `
import json
${fullPython}
try:
    _test_result = ${tc.callExpression}
    json.dumps(_test_result)
except Exception as _e:
    json.dumps({"__error__": str(_e)})
`;
      try {
        const testJson = (await py.runPythonAsync(testHarness)) as string;
        const actual = JSON.parse(testJson);

        if (actual && typeof actual === 'object' && '__error__' in actual) {
          testResults.push({
            id: tc.id,
            passed: false,
            expected: tc.expected,
            actual: actual.__error__,
            description: tc.description,
          });
        } else {
          const passed = compareValues(actual, tc.expected, tc.comparator);
          testResults.push({
            id: tc.id,
            passed,
            expected: tc.expected,
            actual,
            description: tc.description,
          });
        }
      } catch (e) {
        testResults.push({
          id: tc.id,
          passed: false,
          expected: tc.expected,
          actual: e instanceof Error ? e.message : String(e),
          description: tc.description,
        });
      }
    }

    resultStore.setTestResults(task.id, testResults);

    // Check if all tests pass
    const allPassed = testResults.every((r) => r.passed);
    useStudentCodeStore.getState().setCompleted(task.id, allPassed);
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    resultStore.setResult(task.id, {
      data: null,
      error: { message: errorMsg },
      timestamp: Date.now(),
    });
  } finally {
    resultStore.setExecuting(false);
  }
}

function compareValues(actual: unknown, expected: unknown, comparator: string): boolean {
  switch (comparator) {
    case 'exact':
      return actual === expected;
    case 'deep':
      return JSON.stringify(actual) === JSON.stringify(expected);
    case 'length':
      return Array.isArray(actual) && actual.length === expected;
    case 'contains':
      return Array.isArray(actual) && Array.isArray(expected) &&
        expected.every((e) => actual.includes(e));
    default:
      return actual === expected;
  }
}
