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

function AddRoomDialog() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    floor: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("New Room:", formData);

    setOpen(false);

    setFormData({
      roomNumber: "",
      roomType: "",
      floor: "",
      price: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Room
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">

        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>

          <DialogDescription>
            Add a room to your hotel's room inventory.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="roomNumber"
                className="text-sm font-medium"
              >
                Room Number
              </label>

              <Input
                id="roomNumber"
                name="roomNumber"
                placeholder="e.g. 101"
                value={formData.roomNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="floor"
                className="text-sm font-medium"
              >
                Floor
              </label>

              <Input
                id="floor"
                name="floor"
                type="number"
                placeholder="e.g. 1"
                value={formData.floor}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="space-y-2">
            <label
              htmlFor="roomType"
              className="text-sm font-medium"
            >
              Room Type
            </label>

            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">
                Select room type
              </option>

              <option value="Standard">
                Standard
              </option>

              <option value="Deluxe">
                Deluxe
              </option>

              <option value="Suite">
                Suite
              </option>

              <option value="Family">
                Family
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-medium"
            >
              Base Price / Night
            </label>

            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              placeholder="e.g. 2500"
              value={formData.price}
              onChange={handleChange}
              required
            />
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
              Add Room
            </Button>
          </DialogFooter>

        </form>

      </DialogContent>

    </Dialog>
  );
}

export default AddRoomDialog;