
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Eye,
  Mail,
  MapPin,
  Phone,
  Search,
  Users,
  XCircle,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GuestTypeBadge from "@/components/guests/GuestTypeBadge";
import AddGuestDialog from "@/components/guests/AddGuestDialog";
import ViewGuestDialog from "@/components/guests/ViewGuestDialog";
import EditGuestDialog from "@/components/guests/EditGuestDialog";

import { guests, guestTypes } from "@/constants/guests";

function Guests() {
  const [guestList, setGuestList] = useState(guests);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const [addingGuest, setAddingGuest] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [editingGuest, setEditingGuest] = useState(null);
  const [deletingGuest, setDeletingGuest] = useState(null);

  const handleAddGuest = (newGuest) => {
    setGuestList((previous) => {
      const highestId = previous.reduce((highest, guest) => {
        const match = String(guest.id).match(/^G-(\d+)$/);
        return match
          ? Math.max(highest, Number(match[1]))
          : highest;
      }, 1000);

      return [
        {
          ...newGuest,
          id: `G-${highestId + 1}`,
          bookings: Number(newGuest.bookings || 0),
          totalSpent: Number(newGuest.totalSpent || 0),
          idVerified: Boolean(newGuest.idVerified),
        },
        ...previous,
      ];
    });

    setAddingGuest(false);
  };

  const handleEditGuest = (updatedGuest) => {
    setGuestList((previous) =>
      previous.map((guest) =>
        guest.id === updatedGuest.id ? updatedGuest : guest
      )
    );

    setEditingGuest(null);
  };

  const handleDeleteGuest = () => {
    if (!deletingGuest) return;

    setGuestList((previous) =>
      previous.filter((guest) => guest.id !== deletingGuest.id)
    );

    setDeletingGuest(null);
  };

  const filteredGuests = useMemo(() => {
    return guestList.filter((guest) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        String(guest.name || "").toLowerCase().includes(searchValue) ||
        String(guest.email || "").toLowerCase().includes(searchValue) ||
        String(guest.phone || "").includes(searchValue) ||
        String(guest.id || "").toLowerCase().includes(searchValue);

      const matchesType = type === "All" || guest.type === type;

      return matchesSearch && matchesType;
    });
  }, [guestList, search, type]);

  const verifiedGuests = guestList.filter(
    (guest) => guest.idVerified
  ).length;

  const vipGuests = guestList.filter(
    (guest) => guest.type === "VIP"
  ).length;

  const totalSpent = guestList.reduce(
    (total, guest) => total + Number(guest.totalSpent || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Guests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage guest profiles, stays and information.
          </p>
        </div>

        <Button onClick={() => setAddingGuest(true)}>
          <Plus className="mr-2 size-4" />
          Add Guest
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-muted-foreground" />
              <p className="text-2xl font-bold">{guestList.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ID Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {verifiedGuests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              VIP Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {vipGuests}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Guest Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalSpent.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Guest Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Directory</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search guest, email, phone or ID..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">All Guest Types</option>
              {guestTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Guest Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">
                    Guest
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Contact
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Bookings
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Last Stay
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    ID
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-muted font-medium">
                          {String(guest.name || "?")
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-medium">{guest.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {guest.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Mail className="size-3.5 text-muted-foreground" />
                          <span>{guest.email || "—"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="size-3.5" />
                          <span>{guest.phone || "—"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <GuestTypeBadge type={guest.type} />
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-muted-foreground" />
                        {guest.city || "—"}
                      </div>
                    </td>

                    <td className="py-4 font-medium">
                      {guest.bookings ?? 0}
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {guest.lastStay || "—"}
                    </td>

                    <td className="py-4">
                      {guest.idVerified ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="size-4" />
                          <span className="text-xs font-medium">
                            Verified
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="size-4" />
                          <span className="text-xs font-medium">
                            Pending
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label={`View ${guest.name}`}
                          onClick={() => setSelectedGuest(guest)}
                        >
                          <Eye className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label={`Edit ${guest.name}`}
                          onClick={() => setEditingGuest(guest)}
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label={`Delete ${guest.name}`}
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeletingGuest(guest)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGuests.length === 0 && (
            <div className="py-12 text-center">
              <Users className="mx-auto size-10 text-muted-foreground" />
              <h3 className="mt-4 font-medium">No guests found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Guest Dialog */}
      <AddGuestDialog
        open={addingGuest}
        onOpenChange={setAddingGuest}
        onAddGuest={handleAddGuest}
      />

      {/* View Guest Dialog */}
      <ViewGuestDialog
        open={Boolean(selectedGuest)}
        onOpenChange={(open) => {
          if (!open) setSelectedGuest(null);
        }}
        guest={selectedGuest}
      />

      {/* Edit Guest Dialog */}
      <EditGuestDialog
        open={Boolean(editingGuest)}
        onOpenChange={(open) => {
          if (!open) setEditingGuest(null);
        }}
        guest={editingGuest}
        onSave={handleEditGuest}
      />

      {/* Delete Confirmation */}
      {deletingGuest && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-guest-title"
            className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl"
          >
            <h2 id="delete-guest-title" className="text-lg font-semibold">
              Delete Guest?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong>{deletingGuest.name}</strong> ({deletingGuest.id})?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeletingGuest(null)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteGuest}>
                Delete Guest
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Guests;
