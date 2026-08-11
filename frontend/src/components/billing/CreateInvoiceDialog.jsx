import { useState } from "react";
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

function CreateInvoiceDialog() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    bookingId: "",
    guestName: "",
    room: "",
    subtotal: "",
    taxRate: "18",
  });

  const subtotal = Number(formData.subtotal) || 0;
  const tax = subtotal * (Number(formData.taxRate) / 100);
  const total = subtotal + tax;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("New Invoice:", {
      ...formData,
      tax,
      total,
    });

    setOpen(false);

    setFormData({
      bookingId: "",
      guestName: "",
      room: "",
      subtotal: "",
      taxRate: "18",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Create Invoice
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>

          <DialogDescription>
            Generate an invoice for a guest booking.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="bookingId"
                className="text-sm font-medium"
              >
                Booking ID
              </label>

              <Input
                id="bookingId"
                name="bookingId"
                placeholder="BK-1024"
                value={formData.bookingId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="room"
                className="text-sm font-medium"
              >
                Room
              </label>

              <Input
                id="room"
                name="room"
                placeholder="101"
                value={formData.room}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="space-y-2">
            <label
              htmlFor="guestName"
              className="text-sm font-medium"
            >
              Guest Name
            </label>

            <Input
              id="guestName"
              name="guestName"
              placeholder="Guest name"
              value={formData.guestName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="subtotal"
                className="text-sm font-medium"
              >
                Subtotal
              </label>

              <Input
                id="subtotal"
                name="subtotal"
                type="number"
                min="0"
                placeholder="10000"
                value={formData.subtotal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="taxRate"
                className="text-sm font-medium"
              >
                GST Rate
              </label>

              <select
                id="taxRate"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>

          </div>

          <div className="rounded-lg border bg-muted/40 p-4">

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal
              </span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">
                GST ({formData.taxRate}%)
              </span>

              <span>
                ₹{tax.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="my-3 border-t" />

            <div className="flex justify-between">
              <span className="font-medium">
                Total
              </span>

              <span className="text-xl font-bold">
                ₹{total.toLocaleString("en-IN")}
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
              Create Invoice
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInvoiceDialog;