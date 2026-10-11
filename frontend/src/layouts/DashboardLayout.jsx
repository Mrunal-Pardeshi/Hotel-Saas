
import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Fixed-height sidebar */}
      <aside className="h-screen shrink-0 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main application area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar stays visible */}
        <div className="shrink-0">
          <Topbar />
        </div>

        {/* Only the page content scrolls */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
