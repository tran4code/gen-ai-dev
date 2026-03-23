import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { TopBar } from './TopBar';
import { FileTree } from '../filetree/FileTree';
import { EditorPanel } from '../editor/EditorPanel';
import { DashboardPreview } from '../preview/DashboardPreview';
import { TaskPanel } from '../feedback/TaskPanel';
import { useAppStore } from '../../stores/appStore';
import { Loader2 } from 'lucide-react';

export function IDELayout() {
  const pyodideLoading = useAppStore((s) => s.pyodideLoading);
  const pyodideReady = useAppStore((s) => s.pyodideReady);

  return (
    <div className="flex flex-col h-screen bg-spotify-black text-white">
      <TopBar />

      {pyodideLoading && !pyodideReady && (
        <div className="flex items-center gap-2 px-4 py-1 bg-spotify-dark text-spotify-light-gray text-sm border-b border-spotify-gray">
          <Loader2 className="w-3 h-3 animate-spin" />
          Loading Python runtime...
        </div>
      )}

      <PanelGroup direction="horizontal" className="flex-1">
        {/* File Tree */}
        <Panel defaultSize={15} minSize={10} maxSize={25}>
          <div className="h-full bg-spotify-dark border-r border-spotify-gray overflow-y-auto">
            <FileTree />
          </div>
        </Panel>

        <PanelResizeHandle className="w-1 bg-spotify-gray hover:bg-spotify-green transition-colors cursor-col-resize" />

        {/* Editor + Task Panel */}
        <Panel defaultSize={45} minSize={30}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={65} minSize={30}>
              <EditorPanel />
            </Panel>
            <PanelResizeHandle className="h-1 bg-spotify-gray hover:bg-spotify-green transition-colors cursor-row-resize" />
            <Panel defaultSize={35} minSize={15}>
              <TaskPanel />
            </Panel>
          </PanelGroup>
        </Panel>

        <PanelResizeHandle className="w-1 bg-spotify-gray hover:bg-spotify-green transition-colors cursor-col-resize" />

        {/* Live Dashboard Preview */}
        <Panel defaultSize={40} minSize={25}>
          <div className="h-full bg-spotify-black overflow-y-auto">
            <DashboardPreview />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
