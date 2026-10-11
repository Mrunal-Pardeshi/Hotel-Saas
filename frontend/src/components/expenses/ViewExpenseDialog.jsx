
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? new Date(`${date}T00:00:00`)
    : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");
}

function Detail({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="font-medium">{children || "—"}</div>
    </div>
  );
}

export default function ViewExpenseDialog({
  open,
  onOpenChange,
  expense,
}) {
  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            View the complete information for this expense.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              Expense Amount
            </p>
            <p className="mt-1 text-3xl font-bold">
              ₹
              {Number(expense.amount || 0).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              ID: {expense.id}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Detail label="Expense Name">{expense.title}</Detail>
            <Detail label="Vendor">{expense.vendor}</Detail>
            <Detail label="Category">{expense.category}</Detail>
            <Detail label="Date">{formatDate(expense.date)}</Detail>
            <Detail label="Payment Method">
              {expense.paymentMethod}
            </Detail>

            <Detail label="Payment Status">
              <Badge
                variant={
                  expense.status === "Paid" ? "default" : "secondary"
                }
              >
                {expense.status}
              </Badge>
            </Detail>
          </div>

          {expense.notes && (
            <div className="space-y-1 border-t pt-4">
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="text-sm">{expense.notes}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
