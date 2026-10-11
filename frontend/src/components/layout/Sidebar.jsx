
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
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Rooms", path: "/rooms", icon: BedDouble },
  { label: "Bookings", path: "/bookings", icon: CalendarCheck },
  { label: "Guests", path: "/guests", icon: Users },
  { label: "Billing", path: "/billing", icon: Receipt },
  { label: "Expenses", path: "/expenses", icon: Wallet },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

function Sidebar({ onNavigate, onClose }) {
  return (
    <div className="flex min-h-full w-full flex-col border-r bg-background">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-semibold">H</span>
          </div>

          <span className="truncate text-lg font-semibold">
            HotelSaaS
          </span>
        </div>

        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 sm:p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="shrink-0 border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
            JD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">John Doe</p>
            <p className="truncate text-xs text-muted-foreground">
              Hotel Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
