export interface TestCase {
  id: string;
  description: string;
  /** Python expression to call the student function */
  callExpression: string;
  /** Expected JSON-serializable result */
  expected: unknown;
  /** How to compare: 'exact' for ===, 'deep' for deep equality, 'length' for array length */
  comparator: 'exact' | 'deep' | 'length' | 'contains';
}

export interface DashboardBinding {
  /** Which dashboard component this task powers */
  componentId: 'trackList' | 'statsCards' | 'topTracks' | 'sidebar';
  /** The specific data key within that component */
  dataKey: string;
  /** Fallback value when student code isn't working yet */
  fallbackValue: unknown;
  /** Description shown in the placeholder */
  placeholderText: string;
}

export interface TaskDefinition {
  id: string;
  /** Path shown in file tree, e.g., "utils/formatters.py" */
  virtualPath: string;
  module: 'module1-basics' | 'module2-filtering';
  moduleLabel: string;
  displayName: string;
  description: string;
  concepts: string[];
  difficulty: 1 | 2 | 3;
  /** Full Python file content with YOUR CODE markers */
  fileTemplate: string;
  /** Initial code between markers */
  starterCode: string;
  /** Python function name */
  functionName: string;
  /** Arguments to pass when calling for dashboard display */
  dashboardCallArgs: string;
  testCases: TestCase[];
  hints: string[];
  dashboardBinding: DashboardBinding;
}

export interface VirtualFile {
  id: string;
  path: string;
  name: string;
  type: 'task' | 'readonly';
  content: string;
  taskId?: string;
  language: string;
}
