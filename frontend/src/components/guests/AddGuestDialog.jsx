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

function AddGuestDialog() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    idProofType: "",
    idProofNumber: "",
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

    console.log("New Guest:", formData);

    setOpen(false);

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      idProofType: "",
      idProofNumber: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Guest
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>

          <DialogDescription>
            Register a guest and store their identification details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium"
              >
                Full Name
              </label>

              <Input
                id="name"
                name="name"
                placeholder="Guest name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium"
              >
                Phone
              </label>

              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email
            </label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="guest@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium"
            >
              Address
            </label>

            <Input
              id="address"
              name="address"
              placeholder="Guest address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="space-y-2">
              <label
                htmlFor="idProofType"
                className="text-sm font-medium"
              >
                ID Proof Type
              </label>

              <select
                id="idProofType"
                name="idProofType"
                value={formData.idProofType}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="">
                  Select ID type
                </option>

                <option value="Aadhaar">
                  Aadhaar
                </option>

                <option value="Passport">
                  Passport
                </option>

                <option value="Driving License">
                  Driving License
                </option>

                <option value="Voter ID">
                  Voter ID
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="idProofNumber"
                className="text-sm font-medium"
              >
                ID Proof Number
              </label>

              <Input
                id="idProofNumber"
                name="idProofNumber"
                placeholder="ID number"
                value={formData.idProofNumber}
                onChange={handleChange}
                required
              />
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
              Add Guest
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddGuestDialog;