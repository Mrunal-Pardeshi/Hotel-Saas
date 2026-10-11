
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialForm = {
  title: "",
  vendor: "",
  category: "Utilities",
  date: new Date().toISOString().split("T")[0],
  amount: "",
  paymentMethod: "Bank Transfer",
  status: "Paid",
  notes: "",
};

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
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none">
      {children}
    </label>
  );
}

export default function AddExpenseDialog({ onAddExpense }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      ...formData,
      amount: Number(formData.amount),
    };

    onAddExpense?.(expense);

    setFormData({
      ...initialForm,
      date: new Date().toISOString().split("T")[0],
    });

    setOpen(false);
  };

  const selectClass =
    "h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add Expense</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Enter the details of your hotel expense.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FieldLabel htmlFor="title">Expense Name</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Electricity Bill"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="vendor">Vendor</FieldLabel>
            <Input
              id="vendor"
              name="vendor"
              placeholder="e.g. Electricity Provider"
              value={formData.vendor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <select
                id="category"
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
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="amount">Amount (₹)</FieldLabel>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="paymentMethod">Payment Method</FieldLabel>
              <select
                id="paymentMethod"
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
              <FieldLabel htmlFor="status">Payment Status</FieldLabel>
              <select
                id="status"
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
            <FieldLabel htmlFor="notes">Notes (Optional)</FieldLabel>
            <Input
              id="notes"
              name="notes"
              placeholder="Additional details"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Save Expense</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
