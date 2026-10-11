
import {
  CalendarCheck,
  CalendarDays,
  LogIn,
  LogOut,
  MoreHorizontal,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
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
  { guest: "Rahul Sharma", room: "101", time: "10:30 AM" },
  { guest: "Priya Patel", room: "205", time: "12:00 PM" },
  { guest: "Amit Shah", room: "302", time: "2:30 PM" },
];

const departures = [
  { guest: "Neha Mehta", room: "104", time: "11:00 AM" },
  { guest: "Karan Desai", room: "201", time: "11:30 AM" },
  { guest: "Riya Shah", room: "305", time: "12:00 PM" },
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
    <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-4 sm:space-y-6">
      {/* Dashboard Heading and Actions */}
      <section className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening at your hotel today.
          </p>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0">
          <Button
            type="button"
            variant="outline"
            className="h-10 shrink-0 gap-2 px-3"
          >
            <CalendarDays className="size-4 shrink-0" />
            <span>Today</span>
          </Button>

          <Button
            asChild
            className="h-10 min-w-0 flex-1 gap-2 px-3 sm:flex-none"
          >
            <Link to="/bookings">
              <CalendarCheck className="size-4 shrink-0" />
              <span className="whitespace-nowrap">New Booking</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
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
      </section>

      {/* Charts */}
      <section className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <CardTitle>Revenue Overview</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Revenue generated over the last 6 months
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Revenue chart options"
                className="shrink-0"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex h-48 items-end gap-2 sm:h-56 sm:gap-3">
              {revenueData.map((item) => {
                const height = (item.revenue / 300000) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex min-w-0 flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex h-40 w-full items-end sm:h-48">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-colors hover:bg-primary"
                        style={{ height: `${height}%` }}
                        title={`${item.month}: ₹${item.revenue.toLocaleString("en-IN")}`}
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

        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <CardTitle>Occupancy Overview</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Average occupancy percentage
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Occupancy chart options"
                className="shrink-0"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex h-48 items-end gap-2 sm:h-56 sm:gap-3">
              {occupancyData.map((item) => (
                <div
                  key={item.month}
                  className="flex min-w-0 flex-1 flex-col items-center gap-2"
                >
                  <div className="flex h-40 w-full items-end sm:h-48">
                    <div
                      className="w-full rounded-t-md bg-chart-2/80 transition-colors hover:bg-chart-2"
                      style={{ height: `${item.occupancy}%` }}
                      title={`${item.month}: ${item.occupancy}%`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 border-t pt-4">
              <span className="text-sm text-muted-foreground">
                Current occupancy
              </span>
              <span className="font-semibold">82%</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Today's Operations */}
      <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <LogIn className="size-4 shrink-0" />
                Today's Arrivals
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/bookings">View all</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {arrivals.map((arrival) => (
              <div
                key={`${arrival.guest}-${arrival.room}`}
                className="flex min-w-0 items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Users className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {arrival.guest}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Room {arrival.room}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                  {arrival.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <LogOut className="size-4 shrink-0" />
                Today's Departures
              </CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/bookings">View all</Link>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {departures.map((departure) => (
              <div
                key={`${departure.guest}-${departure.room}`}
                className="flex min-w-0 items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Users className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {departure.guest}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Room {departure.room}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                  {departure.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Recent Bookings */}
      <Card className="min-w-0 overflow-hidden">
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <CardTitle>Recent Bookings</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest reservations made at your hotel
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <Link to="/bookings">View all bookings</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="min-w-0">
          <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-170 text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="whitespace-nowrap pb-3 pr-4 font-medium text-muted-foreground">
                    Booking
                  </th>
                  <th className="whitespace-nowrap pb-3 pr-4 font-medium text-muted-foreground">
                    Guest
                  </th>
                  <th className="whitespace-nowrap pb-3 pr-4 font-medium text-muted-foreground">
                    Room
                  </th>
                  <th className="whitespace-nowrap pb-3 pr-4 font-medium text-muted-foreground">
                    Stay
                  </th>
                  <th className="whitespace-nowrap pb-3 pr-4 font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="whitespace-nowrap pb-3 text-right font-medium text-muted-foreground">
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
                    <td className="whitespace-nowrap py-4 pr-4 font-medium">
                      {booking.id}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4">
                      {booking.guest}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4 text-muted-foreground">
                      {booking.room}
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4 text-muted-foreground">
                      <div>{booking.checkIn}</div>
                      <div>{booking.checkOut}</div>
                    </td>
                    <td className="whitespace-nowrap py-4 pr-4 font-medium">
                      {booking.amount}
                    </td>
                    <td className="whitespace-nowrap py-4 text-right">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
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

          <p className="mt-2 text-xs text-muted-foreground sm:hidden">
            Swipe horizontally to view all booking details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;