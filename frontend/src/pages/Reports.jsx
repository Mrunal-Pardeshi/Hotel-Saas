
import { useMemo, useState } from "react";
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

import { monthlyReport } from "@/constants/reports";

function Reports() {
  const [period, setPeriod] = useState("6");

  const availableMonths = monthlyReport.length;

  const displayedReport = useMemo(() => {
    const count = Number(period);

    if (count === 12) {
      return monthlyReport;
    }

    return monthlyReport.slice(-Math.min(count, availableMonths));
  }, [period, availableMonths]);

  const totalRevenue = displayedReport.reduce(
    (sum, item) => sum + Number(item.revenue || 0),
    0
  );

  const totalExpenses = displayedReport.reduce(
    (sum, item) => sum + Number(item.expenses || 0),
    0
  );

  const totalBookings = displayedReport.reduce(
    (sum, item) => sum + Number(item.bookings || 0),
    0
  );

  const averageOccupancy = displayedReport.length
    ? displayedReport.reduce(
        (sum, item) => sum + Number(item.occupancy || 0),
        0
      ) / displayedReport.length
    : 0;

  const estimatedProfit = totalRevenue - totalExpenses;

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const exportReport = () => {
    const headers = [
      "Month",
      "Revenue (INR)",
      "Expenses (INR)",
      "Estimated Profit (INR)",
      "Bookings",
      "Occupancy (%)",
    ];

    const rows = displayedReport.map((item) => [
      item.month,
      item.revenue,
      item.expenses,
      item.revenue - item.expenses,
      item.bookings,
      item.occupancy,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `hotel-report-${period}-months.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const maxRevenue = Math.max(
    ...displayedReport.map((item) => Number(item.revenue || 0)),
    1
  );

  const maxBookings = Math.max(
    ...displayedReport.map((item) => Number(item.bookings || 0)),
    1
  );

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

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-md border p-1">
            {["3", "6", "12"].map((value) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={period === value ? "default" : "ghost"}
                onClick={() => setPeriod(value)}
              >
                {value} Months
              </Button>
            ))}
          </div>

          <Button type="button" onClick={exportReport}>
            <Download className="mr-2 size-4" />
            Export Report
          </Button>
        </div>
      </div>

      {Number(period) > availableMonths && (
        <p className="text-sm text-muted-foreground">
          Showing all {availableMonths} available months. Add more
          monthly entries to your report data to display a full{" "}
          {period}-month report.
        </p>
      )}

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
                {formatCurrency(totalRevenue)}
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
              <p
                className={`text-2xl font-bold ${
                  estimatedProfit < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatCurrency(estimatedProfit)}
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
              <p className="text-2xl font-bold">{totalBookings}</p>
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

      {/* Revenue and Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <p className="text-sm text-muted-foreground">
            Monthly financial performance
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex h-72 items-end gap-3 sm:gap-4">
            {displayedReport.map((item) => {
              const revenueHeight =
                (Number(item.revenue || 0) / maxRevenue) * 100;

              const expenseHeight =
                (Number(item.expenses || 0) / maxRevenue) * 100;

              return (
                <div
                  key={item.month}
                  className="flex h-full min-w-0 flex-1 items-end justify-center gap-1"
                >
                  <div
                    className="w-1/2 rounded-t-md bg-primary/80 transition-all"
                    style={{ height: `${revenueHeight}%` }}
                    title={`${item.month} Revenue: ${formatCurrency(item.revenue)}`}
                  />

                  <div
                    className="w-1/2 rounded-t-md bg-muted-foreground/40 transition-all"
                    style={{ height: `${expenseHeight}%` }}
                    title={`${item.month} Expenses: ${formatCurrency(item.expenses)}`}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="mt-4 grid gap-2 border-t pt-4 text-center text-xs text-muted-foreground"
            style={{
              gridTemplateColumns: `repeat(${Math.max(displayedReport.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {displayedReport.map((item) => (
              <span key={item.month}>{item.month}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm">
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
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Performance</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly average occupancy
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {displayedReport.map((item) => (
                <div key={item.month}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item.month}</span>
                    <span className="font-medium">
                      {item.occupancy}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(
                          Math.max(Number(item.occupancy || 0), 0),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Performance</CardTitle>
            <p className="text-sm text-muted-foreground">
              Number of bookings by month
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {displayedReport.map((item) => (
                <div
                  key={item.month}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4" />
                    </div>
                    <span className="font-medium">{item.month}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden h-2 w-20 overflow-hidden rounded-full bg-muted sm:block">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${
                            (Number(item.bookings || 0) / maxBookings) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold">
                      {item.bookings} bookings
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="mt-1 text-xl font-semibold">
                {formatCurrency(totalRevenue)}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Expenses</p>
              <p className="mt-1 text-xl font-semibold">
                {formatCurrency(totalExpenses)}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p
                className={`mt-1 text-xl font-semibold ${
                  estimatedProfit < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatCurrency(estimatedProfit)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarDays className="size-3.5" />
        Reports use the sample monthly data configured in your frontend.
      </p>
    </div>
  );
}

export default Reports;
