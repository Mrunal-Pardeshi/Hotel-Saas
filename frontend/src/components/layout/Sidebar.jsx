import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Rooms",
    path: "/rooms",
    icon: BedDouble,
  },
  {
    label: "Bookings",
    path: "/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Guests",
    path: "/guests",
    icon: Users,
  },
  {
    label: "Billing",
    path: "/billing",
    icon: Receipt,
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: Wallet,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            H
          </div>

          <span className="text-lg font-semibold">
            HotelSaaS
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
            JD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              John Doe
            </p>

            <p className="truncate text-xs text-muted-foreground">
              Hotel Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;