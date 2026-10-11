
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

const categories = [
  "Utilities",
  "Maintenance",
  "Housekeeping",
  "Staff Salary",
  "Supplies",
  "Food & Beverage",
  "Marketing",
  "Other",
];

const paymentMethods = [
  "Bank Transfer",
  "Cash",
  "UPI",
  "Card",
  "Cheque",
];

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
}

export default function EditExpenseDialog({
  open,
  onOpenChange,
  expense,
  onSave,
}) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (expense) {
      setFormData({
        ...expense,
        amount: String(expense.amount ?? ""),
        notes: expense.notes ?? "",
      });
    }
  }, [expense, open]);

  if (!formData) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...formData,
      amount: Number(formData.amount),
    });

    onOpenChange(false);
  };

  const selectClass =
    "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the expense details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FieldLabel htmlFor="edit-title">Expense Name</FieldLabel>
            <Input
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="edit-vendor">Vendor</FieldLabel>
            <Input
              id="edit-vendor"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="edit-category">Category</FieldLabel>
              <select
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectClass}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="edit-date">Date</FieldLabel>
              <Input
                id="edit-date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="edit-amount">Amount (₹)</FieldLabel>
            <Input
              id="edit-amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="edit-paymentMethod">
                Payment Method
              </FieldLabel>
              <select
                id="edit-paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={selectClass}
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="edit-status">Payment Status</FieldLabel>
              <select
                id="edit-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="edit-notes">Notes</FieldLabel>
            <Input
              id="edit-notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes"
            />
          </div>

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
