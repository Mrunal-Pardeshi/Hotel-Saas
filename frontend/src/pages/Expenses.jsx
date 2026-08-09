import { useMemo, useState } from "react";
import {
  Eye,
  FileText,
  IndianRupee,
  Plus,
  Search,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ExpenseStatusBadge from "@/components/expenses/ExpenseStatusBadge";

import {
  expenses,
  expenseCategories,
  expenseStatuses,
} from "@/constants/expenses";

function Expenses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        expense.id.toLowerCase().includes(searchValue) ||
        expense.title.toLowerCase().includes(searchValue) ||
        expense.vendor.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" ||
        expense.category === category;

      const matchesStatus =
        status === "All" ||
        expense.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, category, status]);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const paidExpenses = expenses
    .filter((expense) => expense.status === "Paid")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const pendingExpenses = expenses
    .filter((expense) => expense.status !== "Paid")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const vendors = new Set(
    expenses.map((expense) => expense.vendor)
  ).size;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Expenses
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track hotel expenses, vendors and payments.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 size-4" />
          Add Expense
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <IndianRupee className="size-5 text-muted-foreground" />

              <p className="text-2xl font-bold">
                ₹{totalExpenses.toLocaleString("en-IN")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ₹{paidExpenses.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              ₹{pendingExpenses.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vendors
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <Store className="size-5 text-muted-foreground" />

              <p className="text-2xl font-bold">
                {vendors}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search expense, vendor or ID..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="pl-9"
              />
            </div>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">
                All Categories
              </option>

              {expenseCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">
                All Statuses
              </option>

              {expenseStatuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="border-b text-left">

                  <th className="pb-3 font-medium text-muted-foreground">
                    Expense
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Vendor
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Category
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Date
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Amount
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Payment
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>

                  <th className="pb-3" />

                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4">
                      <p className="font-medium">
                        {expense.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {expense.id}
                      </p>
                    </td>

                    <td className="py-4">
                      {expense.vendor}
                    </td>

                    <td className="py-4">
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">
                        {expense.category}
                      </span>
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {expense.date}
                    </td>

                    <td className="py-4 font-medium">
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {expense.paymentMethod}
                    </td>

                    <td className="py-4">
                      <ExpenseStatusBadge
                        status={expense.status}
                      />
                    </td>

                    <td className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Eye className="size-4" />
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto size-10 text-muted-foreground" />

              <h3 className="mt-4 font-medium">
                No expenses found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

export default Expenses;