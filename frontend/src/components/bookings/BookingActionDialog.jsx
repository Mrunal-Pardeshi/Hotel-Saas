import { useState } from "react";
import {
  Check,
  LogIn,
  LogOut,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BookingActionDialog({
  open,
  onOpenChange,
  booking,
  action,
}) {
  const [notes, setNotes] = useState("");

  if (!booking) {
    return null;
  }

  const isCheckIn = action === "check-in";

  const handleSubmit = (event) => {
    event.preventDefault();

    const actionData = {
      bookingId: booking.id,
      action,
      notes,
    };

    console.log(
      isCheckIn ? "Check-In:" : "Check-Out:",
      actionData
    );

    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isCheckIn ? (
              <LogIn className="size-5" />
            ) : (
              <LogOut className="size-5" />
            )}

            {isCheckIn
              ? "Guest Check-In"
              : "Guest Check-Out"}
          </DialogTitle>

          <DialogDescription>
            {isCheckIn
              ? "Confirm that the guest has arrived and is checking into the hotel."
              : "Confirm that the guest has completed their stay and is checking out."}
          </DialogDescription>
        </DialogHeader>

        {/* Booking Details */}
        <div className="rounded-lg border bg-muted/40 p-4">

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Booking
            </span>

            <span className="font-medium">
              {booking.id}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Guest
            </span>

            <span className="font-medium">
              {booking.guest}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Room
            </span>

            <span className="font-medium">
              Room {booking.room}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Amount
            </span>

            <span className="font-semibold">
              ₹{booking.amount.toLocaleString("en-IN")}
            </span>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="space-y-2">
            <label
              htmlFor="actionDate"
              className="text-sm font-medium"
            >
              {isCheckIn
                ? "Check-In Date & Time"
                : "Check-Out Date & Time"}
            </label>

            <Input
              id="actionDate"
              type="datetime-local"
              defaultValue={new Date()
                .toISOString()
                .slice(0, 16)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="notes"
              className="text-sm font-medium"
            >
              Notes
            </label>

            <textarea
              id="notes"
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              placeholder={
                isCheckIn
                  ? "Add check-in notes..."
                  : "Add check-out notes..."
              }
              className="min-h-20 w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              <Check className="mr-2 size-4" />

              {isCheckIn
                ? "Confirm Check-In"
                : "Confirm Check-Out"}
            </Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}

export default BookingActionDialog;