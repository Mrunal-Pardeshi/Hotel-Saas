import { Badge } from "@/components/ui/badge";

const typeStyles = {
  Individual:
    "bg-slate-100 text-slate-700 hover:bg-slate-100",

  Corporate:
    "bg-blue-100 text-blue-700 hover:bg-blue-100",

  VIP:
    "bg-purple-100 text-purple-700 hover:bg-purple-100",
};

function GuestTypeBadge({ type }) {
  return (
    <Badge
      variant="outline"
      className={typeStyles[type]}
    >
      {type}
    </Badge>
  );
}

export default GuestTypeBadge;