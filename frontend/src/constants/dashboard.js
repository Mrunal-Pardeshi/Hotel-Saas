import {
  IndianRupee,
  BedDouble,
  Users,
  CalendarCheck,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Revenue",
    value: "₹2,45,000",
    description: "vs last month",
    trend: "+12.5%",
    trendType: "positive",
    icon: IndianRupee,
  },
  {
    title: "Occupancy",
    value: "78.5%",
    description: "vs last week",
    trend: "+4.2%",
    trendType: "positive",
    icon: BedDouble,
  },
  {
    title: "Guests",
    value: "126",
    description: "vs last month",
    trend: "+8.1%",
    trendType: "positive",
    icon: Users,
  },
  {
    title: "Today's Check-In",
    value: "12",
    description: "vs yesterday",
    trend: "-2",
    trendType: "negative",
    icon: CalendarCheck,
  },
];