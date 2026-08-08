import { Badge } from "@/components/ui/badge";

const statusStyles = {
  Confirmed:
    "bg-green-100 text-green-700 hover:bg-green-100",
  "Checked-in":
    "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "Checked-out":
    "bg-slate-100 text-slate-700 hover:bg-slate-100",
  Cancelled:
    "bg-red-100 text-red-700 hover:bg-red-100",
  Pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
};

function BookingStatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={statusStyles[status]}
    >
      {status}
    </Badge>
  );
}

export default BookingStatusBadge;