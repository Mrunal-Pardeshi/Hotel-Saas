
import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function Topbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="flex h-16 w-full min-w-0 items-center justify-between gap-2 border-b bg-background px-3 sm:gap-4 sm:px-5 md:px-6">
      {/* Search */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-md">
        <Search className="size-4 shrink-0 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search"
          className="h-9 min-w-0 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
        />
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-full hover:bg-accent"
        >
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          aria-label="User profile"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium"
        >
          JD
        </button>
      </div>
    </header>
  );
}

export default Topbar;
