import { useMemo, useState } from "react";
import {
  CalendarDays,
  Eye,
  Plus,
  Search,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BookingStatusBadge from "@/components/bookings/BookingStatusBadge";

import {
  bookings,
  bookingStatuses,
} from "@/constants/bookings";

import NewBookingDialog from "@/components/bookings/NewBookingDialog";

import BookingActionDialog from "@/components/bookings/BookingActionDialog";

function Bookings() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [actionDialog, setActionDialog] = useState({
    open: false,
    action: null,
    booking: null,
  });

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        booking.id.toLowerCase().includes(searchValue) ||
        booking.guest.toLowerCase().includes(searchValue) ||
        booking.room.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" ||
        booking.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalRevenue = bookings.reduce(
    (total, booking) => total + booking.amount,
    0
  );

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const checkedInBookings = bookings.filter(
    (booking) => booking.status === "Checked-in"
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Bookings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage reservations, check-ins and check-outs.
          </p>
        </div>

        <NewBookingDialog />
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {bookings.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmed
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {confirmedBookings}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Checked-in
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {checkedInBookings}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Booking Value
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search booking, guest or room..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="pl-9"
              />
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">
                All Statuses
              </option>

              {bookingStatuses.map((item) => (
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
                    Booking
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Guest
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Room
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Stay
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Guests
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Amount
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>

                  <th className="pb-3" />
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4">
                      <p className="font-medium">
                        {booking.id}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.paymentStatus}
                      </p>
                    </td>

                    <td className="py-4">
                      <p className="font-medium">
                        {booking.guest}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {booking.phone}
                      </p>
                    </td>

                    <td className="py-4">
                      <p>{booking.room}</p>

                      <p className="text-xs text-muted-foreground">
                        {booking.roomType}
                      </p>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="size-3.5 text-muted-foreground" />
                        <span>{booking.checkIn}</span>
                      </div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        to {booking.checkOut}
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <Users className="size-4 text-muted-foreground" />
                        {booking.guests}
                      </div>
                    </td>

                    <td className="py-4 font-medium">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4">
                      <BookingStatusBadge
                        status={booking.status}
                      />
                    </td>

                    <td className="py-4 text-right">
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-1">

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setActionDialog({
                                open: true,
                                action:
                                  booking.status === "Confirmed"
                                    ? "check-in"
                                    : "check-out",
                                booking,
                              })
                            }
                          >
                            {booking.status === "Confirmed"
                              ? "Check-In"
                              : booking.status === "Checked-in"
                                ? "Check-Out"
                                : "View"}
                          </Button>

                        </div>
                      </td>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="py-12 text-center">
              <CalendarDays className="mx-auto size-10 text-muted-foreground" />

              <h3 className="mt-4 font-medium">
                No bookings found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </CardContent>
      </Card>
      <BookingActionDialog
        open={actionDialog.open}
        onOpenChange={(open) =>
          setActionDialog((previous) => ({
            ...previous,
            open,
          }))
        }
        booking={actionDialog.booking}
        action={actionDialog.action}
      />
    </div>
  );
}

export default Bookings;