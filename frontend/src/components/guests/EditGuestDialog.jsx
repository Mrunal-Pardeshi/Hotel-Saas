
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const guestTypes = ["Regular", "VIP", "Corporate"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  type: "Regular",
  idProofType: "",
  idProofNumber: "",
  idVerified: false,
};

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
}

export default function EditGuestDialog({
  open,
  onOpenChange,
  guest,
  onSave,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (guest) {
      setFormData({
        ...initialForm,
        ...guest,
        name: guest.name || "",
        email: guest.email || "",
        phone: guest.phone || "",
        address: guest.address || "",
        city: guest.city || "",
        type: guest.type || "Regular",
        idProofType: guest.idProofType || "",
        idProofNumber: guest.idProofNumber || "",
        idVerified: Boolean(guest.idVerified),
      });
    }
  }, [guest, open]);

  if (!guest) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...guest,
      ...formData,
      id: guest.id,
    });

    onOpenChange(false);
  };

  const selectClass =
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-130">
        <DialogHeader>
          <DialogTitle>Edit Guest</DialogTitle>
          <DialogDescription>
            Update the guest's contact and profile information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FieldLabel htmlFor="guest-name">Full Name</FieldLabel>
            <Input
              id="guest-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="guest-email">Email</FieldLabel>
              <Input
                id="guest-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="guest-phone">Phone</FieldLabel>
              <Input
                id="guest-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="guest-address">Address</FieldLabel>
            <Input
              id="guest-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="guest-city">City</FieldLabel>
              <Input
                id="guest-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="guest-type">Guest Type</FieldLabel>
              <select
                id="guest-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={selectClass}
              >
                {guestTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="guest-id-type">ID Proof Type</FieldLabel>
              <Input
                id="guest-id-type"
                name="idProofType"
                placeholder="e.g. Aadhaar, Passport"
                value={formData.idProofType}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="guest-id-number">ID Proof Number</FieldLabel>
              <Input
                id="guest-id-number"
                name="idProofNumber"
                value={formData.idProofNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="idVerified"
              checked={formData.idVerified}
              onChange={handleChange}
              className="size-4"
            />
            ID proof verified
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
