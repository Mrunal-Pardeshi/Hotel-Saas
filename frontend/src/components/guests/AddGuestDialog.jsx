
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  type: "Regular",
  idProofType: "Aadhaar",
  idProofNumber: "",
};

function AddGuestDialog({ open, onOpenChange, onAddGuest }) {
  const [formData, setFormData] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newGuest = {
      ...formData,
      idVerified: false,
      bookings: 0,
      lastStay: "—",
      totalSpent: 0,
    };

    onAddGuest?.(newGuest);
    setFormData(initialForm);
    onOpenChange(false);
  }

  function handleOpenChange(nextOpen) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setFormData(initialForm);
    }
  }

  const fields = [
    { name: "name", label: "Full Name", placeholder: "Enter guest name", required: true },
    { name: "email", label: "Email", placeholder: "guest@example.com", type: "email" },
    { name: "phone", label: "Phone Number", placeholder: "Enter phone number", required: true },
    { name: "address", label: "Address", placeholder: "Enter address" },
    { name: "city", label: "City", placeholder: "Enter city" },
    { name: "idProofNumber", label: "ID Proof Number", placeholder: "Enter ID number" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>
            Enter the guest details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium"
                >
                  {field.label}
                </label>

                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required || false}
                />
              </div>
            ))}

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Guest Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="Regular">Regular</option>
                <option value="VIP">VIP</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="idProofType" className="text-sm font-medium">
                ID Proof Type
              </label>
              <select
                id="idProofType"
                name="idProofType"
                value={formData.idProofType}
                onChange={handleChange}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="Aadhaar">Aadhaar</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Add Guest</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddGuestDialog;
