import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Users,
  XCircle,
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

import {
  guests,
  guestTypes,
} from "@/constants/guests";

import AddGuestDialog from "@/components/guests/AddGuestDialog";

function Guests() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        guest.name.toLowerCase().includes(searchValue) ||
        guest.email.toLowerCase().includes(searchValue) ||
        guest.phone.includes(searchValue) ||
        guest.id.toLowerCase().includes(searchValue);

      const matchesType =
        type === "All" || guest.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  const verifiedGuests = guests.filter(
    (guest) => guest.idVerified
  ).length;

  const vipGuests = guests.filter(
    (guest) => guest.type === "VIP"
  ).length;

  const totalSpent = guests.reduce(
    (total, guest) => total + guest.totalSpent,
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Guests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage guest profiles, stays and information.
          </p>
        </div>

        <AddGuestDialog />
      </div>

      {/* Summary */}
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

              <p className="text-2xl font-bold">
                {guests.length}
              </p>
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

      {/* Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Directory</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search guest, email, phone or ID..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="pl-9"
              />
            </div>

            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">
                All Guest Types
              </option>

              {guestTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          {/* Table */}
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

                  <th className="pb-3" />

                </tr>
              </thead>

              <tbody>
                {filteredGuests.map((guest) => (
                  <tr
                    key={guest.id}
                    className="border-b last:border-0"
                  >

                    {/* Guest */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex size-9 items-center justify-center rounded-full bg-muted font-medium">
                          {guest.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-medium">
                            {guest.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {guest.id}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4">
                      <div className="space-y-1">

                        <div className="flex items-center gap-1.5">
                          <Mail className="size-3.5 text-muted-foreground" />
                          <span>{guest.email}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="size-3.5" />
                          <span>{guest.phone}</span>
                        </div>

                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4">
                      <GuestTypeBadge type={guest.type} />
                    </td>

                    {/* Location */}
                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-muted-foreground" />
                        {guest.city}
                      </div>
                    </td>

                    {/* Bookings */}
                    <td className="py-4 font-medium">
                      {guest.bookings}
                    </td>

                    {/* Last Stay */}
                    <td className="py-4 text-muted-foreground">
                      {guest.lastStay}
                    </td>

                    {/* ID */}
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

                    {/* Action */}
                    <td className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Empty State */}
          {filteredGuests.length === 0 && (
            <div className="py-12 text-center">

              <Users className="mx-auto size-10 text-muted-foreground" />

              <h3 className="mt-4 font-medium">
                No guests found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>

            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

export default Guests;