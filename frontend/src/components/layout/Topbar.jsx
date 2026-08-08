import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Search */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Search className="size-4" />

        <span className="text-sm">
          Search...
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-accent">
          <Bell className="size-5" />

          <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
        </button>

        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
          JD
        </div>
      </div>
    </header>
  );
}

export default Topbar;