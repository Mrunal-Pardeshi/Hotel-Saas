import {
  BarChart3,
  CalendarDays,
  Download,
  FileText,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  monthlyReport,
} from "@/constants/reports";

function Reports() {
  const totalRevenue = monthlyReport.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalExpenses = monthlyReport.reduce(
    (sum, item) => sum + item.expenses,
    0
  );

  const totalBookings = monthlyReport.reduce(
    (sum, item) => sum + item.bookings,
    0
  );

  const averageOccupancy =
    monthlyReport.reduce(
      (sum, item) => sum + item.occupancy,
      0
    ) / monthlyReport.length;

  const estimatedProfit =
    totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Reports
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Analyze hotel performance and business metrics.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarDays className="mr-2 size-4" />
            Last 6 Months
          </Button>

          <Button>
            <Download className="mr-2 size-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <IndianRupee className="size-5 text-muted-foreground" />

              <p className="text-2xl font-bold">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estimated Profit
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600" />

              <p className="text-2xl font-bold text-green-600">
                ₹{estimatedProfit.toLocaleString("en-IN")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-muted-foreground" />

              <p className="text-2xl font-bold">
                {totalBookings}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Occupancy
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {averageOccupancy.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Revenue & Expenses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue vs Expenses</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Monthly financial performance
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex h-72 items-end gap-4">

            {monthlyReport.map((item) => {
              const revenueHeight =
                (item.revenue / 320000) * 100;

              const expenseHeight =
                (item.expenses / 320000) * 100;

              return (
                <div
                  key={item.month}
                  className="flex h-full flex-1 items-end justify-center gap-1"
                >
                  <div
                    className="w-1/2 rounded-t-md bg-primary/80"
                    style={{
                      height: `${revenueHeight}%`,
                    }}
                    title={`Revenue: ₹${item.revenue.toLocaleString("en-IN")}`}
                  />

                  <div
                    className="w-1/2 rounded-t-md bg-muted-foreground/40"
                    style={{
                      height: `${expenseHeight}%`,
                    }}
                    title={`Expenses: ₹${item.expenses.toLocaleString("en-IN")}`}
                  />
                </div>
              );
            })}

          </div>

          <div className="mt-4 flex justify-between border-t pt-4">
            {monthlyReport.map((item) => (
              <span
                key={item.month}
                className="text-xs text-muted-foreground"
              >
                {item.month}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary" />
              Revenue
            </div>

            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-muted-foreground/40" />
              Expenses
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <div className="grid gap-4 lg:grid-cols-2">

        {/* Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Performance</CardTitle>

            <p className="text-sm text-muted-foreground">
              Monthly average occupancy
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {monthlyReport.map((item) => (
                <div key={item.month}>

                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item.month}</span>

                    <span className="font-medium">
                      {item.occupancy}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${item.occupancy}%`,
                      }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Performance</CardTitle>

            <p className="text-sm text-muted-foreground">
              Number of bookings by month
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">

              {monthlyReport.map((item) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4" />
                    </div>

                    <span className="font-medium">
                      {item.month}
                    </span>
                  </div>

                  <span className="font-semibold">
                    {item.bookings} bookings
                  </span>
                </div>
              ))}

            </div>
          </CardContent>
        </Card>

      </div>

      {/* Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Revenue
              </p>

              <p className="mt-1 text-xl font-semibold">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Expenses
              </p>

              <p className="mt-1 text-xl font-semibold">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Net Profit
              </p>

              <p className="mt-1 text-xl font-semibold text-green-600">
                ₹{estimatedProfit.toLocaleString("en-IN")}
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default Reports;