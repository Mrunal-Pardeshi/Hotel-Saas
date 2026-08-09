import { Badge } from "@/components/ui/badge";

const statusStyles = {
  Paid: "bg-green-100 text-green-700 hover:bg-green-100",
  Partial: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Overdue: "bg-red-100 text-red-700 hover:bg-red-100",
  Refunded: "bg-purple-100 text-purple-700 hover:bg-purple-100",
};

function PaymentStatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={statusStyles[status]}
    >
      {status}
    </Badge>
  );
}

export default PaymentStatusBadge;