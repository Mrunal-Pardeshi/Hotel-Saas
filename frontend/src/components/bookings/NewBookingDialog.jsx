import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const guests = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "9825012345",
  },
  {
    id: 3,
    name: "Amit Shah",
    phone: "9909012345",
  },
];

const rooms = [
  {
    id: 1,
    roomNumber: "101",
    type: "Standard",
    price: 1800,
  },
  {
    id: 2,
    roomNumber: "102",
    type: "Deluxe",
    price: 2500,
  },
  {
    id: 3,
    roomNumber: "201",
    type: "Suite",
    price: 4000,
  },
  {
    id: 4,
    roomNumber: "202",
    type: "Family",
    price: 3200,
  },
];

function NewBookingDialog() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    guestId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    bookingStatus: "Confirmed",
  });

  const selectedRoom = rooms.find(
    (room) => String(room.id) === formData.roomId
  );

  const nights = useMemo(() => {
    if (!formData.checkInDate || !formData.checkOutDate) {
      return 0;
    }

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);

    const difference =
      checkOut.getTime() - checkIn.getTime();

    const calculatedNights =
      difference / (1000 * 60 * 60 * 24);

    return calculatedNights > 0 ? calculatedNights : 0;
  }, [
    formData.checkInDate,
    formData.checkOutDate,
  ]);

  const totalAmount =
    selectedRoom && nights
      ? selectedRoom.price * nights
      : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const booking = {
      ...formData,
      totalAmount,
      nights,
    };

    console.log("New Booking:", booking);

    setOpen(false);

    setFormData({
      guestId: "",
      roomId: "",
      checkInDate: "",
      checkOutDate: "",
      bookingStatus: "Confirmed",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          New Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150">

        <DialogHeader>
          <DialogTitle>
            Create New Booking
          </DialogTitle>

          <DialogDescription>
            Create a reservation for a guest and assign a room.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Guest & Room */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="guestId"
                className="text-sm font-medium"
              >
                Guest
              </label>

              <select
                id="guestId"
                name="guestId"
                value={formData.guestId}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="">
                  Select guest
                </option>

                {guests.map((guest) => (
                  <option
                    key={guest.id}
                    value={guest.id}
                  >
                    {guest.name} — {guest.phone}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="roomId"
                className="text-sm font-medium"
              >
                Room
              </label>

              <select
                id="roomId"
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="">
                  Select room
                </option>

                {rooms.map((room) => (
                  <option
                    key={room.id}
                    value={room.id}
                  >
                    Room {room.roomNumber} — {room.type}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="checkInDate"
                className="text-sm font-medium"
              >
                Check-In Date
              </label>

              <Input
                id="checkInDate"
                name="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="checkOutDate"
                className="text-sm font-medium"
              >
                Check-Out Date
              </label>

              <Input
                id="checkOutDate"
                name="checkOutDate"
                type="date"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Status */}
          <div className="space-y-2">
            <label
              htmlFor="bookingStatus"
              className="text-sm font-medium"
            >
              Booking Status
            </label>

            <select
              id="bookingStatus"
              name="bookingStatus"
              value={formData.bookingStatus}
              onChange={handleChange}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Checked-In">
                Checked-In
              </option>
            </select>
          </div>

          {/* Booking Summary */}
          <div className="rounded-lg border bg-muted/40 p-4">

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Room Price
              </span>

              <span className="font-medium">
                ₹
                {selectedRoom
                  ? selectedRoom.price.toLocaleString("en-IN")
                  : "0"}{" "}
                / night
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Number of Nights
              </span>

              <span className="font-medium">
                {nights}
              </span>
            </div>

            <div className="my-3 border-t" />

            <div className="flex items-center justify-between">
              <span className="font-medium">
                Total Amount
              </span>

              <span className="text-xl font-bold">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Create Booking
            </Button>
          </DialogFooter>

        </form>

      </DialogContent>
    </Dialog>
  );
}

export default NewBookingDialog;