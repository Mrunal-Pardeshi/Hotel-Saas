import { Badge } from "@/components/ui/badge";

const statusStyles = {
  Available: "bg-green-100 text-green-700 hover:bg-green-100",
  Occupied: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Reserved: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Maintenance: "bg-red-100 text-red-700 hover:bg-red-100",
};

function RoomStatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={statusStyles[status]}
    >
      {status}
    </Badge>
  );
}

export default RoomStatusBadge;