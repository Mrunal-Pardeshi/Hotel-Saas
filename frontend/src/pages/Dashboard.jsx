import {
  CalendarCheck,
  CalendarDays,
  LogIn,
  LogOut,
  MoreHorizontal,
  Users,
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";
import { dashboardStats } from "@/constants/dashboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const revenueData = [
  { month: "Jan", revenue: 185000 },
  { month: "Feb", revenue: 212000 },
  { month: "Mar", revenue: 198000 },
  { month: "Apr", revenue: 245000 },
  { month: "May", revenue: 268000 },
  { month: "Jun", revenue: 291000 },
];

const occupancyData = [
  { month: "Jan", occupancy: 64 },
  { month: "Feb", occupancy: 69 },
  { month: "Mar", occupancy: 67 },
  { month: "Apr", occupancy: 74 },
  { month: "May", occupancy: 78 },
  { month: "Jun", occupancy: 82 },
];

const arrivals = [
  {
    guest: "Rahul Sharma",
    room: "101",
    time: "10:30 AM",
    type: "Check-in",
  },
  {
    guest: "Priya Patel",
    room: "205",
    time: "12:00 PM",
    type: "Check-in",
  },
  {
    guest: "Amit Shah",
    room: "302",
    time: "2:30 PM",
    type: "Check-in",
  },
];

const departures = [
  {
    guest: "Neha Mehta",
    room: "104",
    time: "11:00 AM",
  },
  {
    guest: "Karan Desai",
    room: "201",
    time: "11:30 AM",
  },
  {
    guest: "Riya Shah",
    room: "305",
    time: "12:00 PM",
  },
];

const recentBookings = [
  {
    id: "#BK-1024",
    guest: "Rahul Sharma",
    room: "Deluxe Room",
    checkIn: "08 Aug 2026",
    checkOut: "10 Aug 2026",
    amount: "₹12,500",
    status: "Confirmed",
  },
  {
    id: "#BK-1023",
    guest: "Priya Patel",
    room: "Suite",
    checkIn: "08 Aug 2026",
    checkOut: "12 Aug 2026",
    amount: "₹28,000",
    status: "Checked-in",
  },
  {
    id: "#BK-1022",
    guest: "Amit Shah",
    room: "Standard Room",
    checkIn: "09 Aug 2026",
    checkOut: "11 Aug 2026",
    amount: "₹8,500",
    status: "Confirmed",
  },
  {
    id: "#BK-1021",
    guest: "Neha Mehta",
    room: "Deluxe Room",
    checkIn: "07 Aug 2026",
    checkOut: "08 Aug 2026",
    amount: "₹6,500",
    status: "Completed",
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening at your hotel today.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarDays className="mr-2 size-4" />
            Today
          </Button>

          <Button>
            <CalendarCheck className="mr-2 size-4" />
            New Booking
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            trend={stat.trend}
            trendType={stat.trendType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-2">

        {/* Revenue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Revenue generated over the last 6 months
                </p>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex h-64 items-end gap-3">
              {revenueData.map((item) => {
                const height = (item.revenue / 300000) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex h-52 w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                        style={{ height: `${height}%` }}
                        title={`₹${item.revenue.toLocaleString("en-IN")}`}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Occupancy */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Occupancy Overview</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Average occupancy percentage
                </p>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex h-64 items-end gap-3">
              {occupancyData.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-52 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-chart-2/80 transition-all hover:bg-chart-2"
                      style={{ height: `${item.occupancy}%` }}
                      title={`${item.occupancy}%`}
                    />
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">
                Current occupancy
              </span>

              <span className="font-semibold">
                82%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Operations */}
      <div className="grid gap-4 lg:grid-cols-2">

        {/* Arrivals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <LogIn className="size-4" />
                Today's Arrivals
              </CardTitle>

              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {arrivals.map((arrival) => (
              <div
                key={`${arrival.guest}-${arrival.room}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                    <Users className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {arrival.guest}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Room {arrival.room}
                    </p>
                  </div>
                </div>

                <span className="text-sm text-muted-foreground">
                  {arrival.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Departures */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <LogOut className="size-4" />
                Today's Departures
              </CardTitle>

              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {departures.map((departure) => (
              <div
                key={`${departure.guest}-${departure.room}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                    <Users className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {departure.guest}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Room {departure.room}
                    </p>
                  </div>
                </div>

                <span className="text-sm text-muted-foreground">
                  {departure.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest reservations made at your hotel
              </p>
            </div>

            <Button variant="outline" size="sm">
              View all bookings
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">
                    Booking
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Guest
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Room
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Stay
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">
                      {booking.id}
                    </td>

                    <td className="py-4">
                      {booking.guest}
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {booking.room}
                    </td>

                    <td className="py-4 text-muted-foreground">
                      <div>
                        {booking.checkIn}
                      </div>
                      <div>
                        {booking.checkOut}
                      </div>
                    </td>

                    <td className="py-4 font-medium">
                      {booking.amount}
                    </td>

                    <td className="py-4 text-right">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Checked-in"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default Dashboard;