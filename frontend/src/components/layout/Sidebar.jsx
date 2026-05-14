import {
  LayoutDashboard,
  Pill,
  AlertTriangle,
  FileText,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-10">
        Medora
      </h1>

      <nav className="space-y-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/inventory"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700"
        >
          <Pill size={20} />
          Inventory
        </Link>

        <Link
          to="/alerts"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700"
        >
          <AlertTriangle size={20} />
          Alerts
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700"
        >
          <FileText size={20} />
          Reports
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;