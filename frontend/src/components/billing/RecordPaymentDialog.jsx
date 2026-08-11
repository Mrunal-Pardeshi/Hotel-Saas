import { useState } from "react";
import { CreditCard } from "lucide-react";

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

function RecordPaymentDialog({
  open,
  onOpenChange,
  invoice,
}) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");

  if (!invoice) {
    return null;
  }

  const outstanding =
    invoice.total - invoice.paid;

  const handleSubmit = (event) => {
    event.preventDefault();

    const payment = {
      invoiceId: invoice.id,
      amount: Number(amount),
      method,
    };

    console.log("Payment:", payment);

    setAmount("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-112.5">

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Record Payment
          </DialogTitle>

          <DialogDescription>
            Record a payment against this invoice.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/40 p-4">

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Invoice
            </span>

            <span className="font-medium">
              {invoice.id}
            </span>
          </div>

          <div className="mt-2 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Guest
            </span>

            <span>
              {invoice.guest}
            </span>
          </div>

          <div className="mt-2 flex justify-between">
            <span className="text-sm text-muted-foreground">
              Outstanding
            </span>

            <span className="font-semibold">
              ₹{outstanding.toLocaleString("en-IN")}
            </span>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="space-y-2">
            <label
              htmlFor="paymentAmount"
              className="text-sm font-medium"
            >
              Payment Amount
            </label>

            <Input
              id="paymentAmount"
              type="number"
              min="1"
              max={outstanding}
              placeholder="Enter amount"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="paymentMethod"
              className="text-sm font-medium"
            >
              Payment Method
            </label>

            <select
              id="paymentMethod"
              value={method}
              onChange={(event) =>
                setMethod(event.target.value)
              }
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">
                Bank Transfer
              </option>
              <option value="Online">Online</option>
            </select>
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
              Record Payment
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RecordPaymentDialog;