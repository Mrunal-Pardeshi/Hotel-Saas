
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Detail({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="wrap-break-word font-medium">{children || "—"}</div>
    </div>
  );
}

export default function ViewGuestDialog({
  open,
  onOpenChange,
  guest,
}) {
  if (!guest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-130">
        <DialogHeader>
          <DialogTitle>Guest Details</DialogTitle>
          <DialogDescription>
            Complete information about this guest.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold">
              {String(guest.name || "?")
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold">{guest.name}</h3>
              <p className="text-sm text-muted-foreground">
                Guest ID: {guest.id}
              </p>
              <Badge className="mt-1">{guest.type || "Regular"}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Detail label="Email">{guest.email}</Detail>
            <Detail label="Phone">{guest.phone}</Detail>
            <Detail label="Address">{guest.address}</Detail>
            <Detail label="City">{guest.city}</Detail>
            <Detail label="Total Bookings">{guest.bookings ?? 0}</Detail>
            <Detail label="Last Stay">{guest.lastStay}</Detail>
            <Detail label="Total Spent">
              ₹{Number(guest.totalSpent || 0).toLocaleString("en-IN")}
            </Detail>
            <Detail label="ID Verification">
              {guest.idVerified ? "Verified" : "Pending"}
            </Detail>
            <Detail label="ID Proof Type">{guest.idProofType}</Detail>
            <Detail label="ID Proof Number">{guest.idProofNumber}</Detail>
          </div>

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
