
import { useMemo, useState } from "react";
import {
  Eye,
  FileText,
  IndianRupee,
  Search,
  Store,
  Pencil,
  Trash2,
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
import AddExpenseDialog from "@/components/expenses/AddExpenseDialog";
import ViewExpenseDialog from "@/components/expenses/ViewExpenseDialog";
import EditExpenseDialog from "@/components/expenses/EditExpenseDialog";

import {
  expenses,
  expenseCategories,
  expenseStatuses,
} from "@/constants/expenses";

function formatExpenseDate(date) {
  if (!date) return "—";

  const isoMatch = String(date).match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const parsed = new Date(Number(year), Number(month) - 1, Number(day));

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(",", "");
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(",", "");
}

function Expenses() {
  const [expenseList, setExpenseList] = useState(expenses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);

  const handleAddExpense = (newExpense) => {
    setExpenseList((previous) => {
      const highestId = previous.reduce((highest, expense) => {
        const match = expense.id.match(/^EXP-(\d+)$/);
        return match
          ? Math.max(highest, Number(match[1]))
          : highest;
      }, 1000);

      return [
        { ...newExpense, id: `EXP-${highestId + 1}` },
        ...previous,
      ];
    });
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenseList((previous) =>
      previous.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  const handleDeleteExpense = () => {
    if (!deletingExpense) return;

    setExpenseList((previous) =>
      previous.filter(
        (expense) => expense.id !== deletingExpense.id
      )
    );

    setDeletingExpense(null);
  };

  const filteredExpenses = useMemo(() => {
    return expenseList.filter((expense) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        expense.id.toLowerCase().includes(searchValue) ||
        expense.title.toLowerCase().includes(searchValue) ||
        expense.vendor.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || expense.category === category;

      const matchesStatus =
        status === "All" || expense.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [expenseList, search, category, status]);

  const totalExpenses = expenseList.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const paidExpenses = expenseList
    .filter((expense) => expense.status === "Paid")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const pendingExpenses = expenseList
    .filter((expense) => expense.status !== "Paid")
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const vendors = new Set(
    expenseList.map((expense) => expense.vendor)
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

        <AddExpenseDialog onAddExpense={handleAddExpense} />
      </div>

      {/* Summary cards */}
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
              <p className="text-2xl font-bold">{vendors}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense records */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Search and filters */}
          <div className="mb-6 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search expense, vendor or ID..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">All Categories</option>
              {expenseCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">All Statuses</option>
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
                  <th className="pb-3 font-medium text-muted-foreground">Expense</th>
                  <th className="pb-3 font-medium text-muted-foreground">Vendor</th>
                  <th className="pb-3 font-medium text-muted-foreground">Category</th>
                  <th className="pb-3 font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 font-medium text-muted-foreground">Payment</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b last:border-0">
                    <td className="py-4">
                      <p className="font-medium">{expense.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {expense.id}
                      </p>
                    </td>

                    <td className="py-4">{expense.vendor}</td>

                    <td className="py-4">
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">
                        {expense.category}
                      </span>
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {formatExpenseDate(expense.date)}
                    </td>

                    <td className="py-4 font-medium">
                      ₹{Number(expense.amount).toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {expense.paymentMethod}
                    </td>

                    <td className="py-4">
                      <ExpenseStatusBadge status={expense.status} />
                    </td>

                    <td className="py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label={`View ${expense.title}`}
                          onClick={() => setSelectedExpense(expense)}
                        >
                          <Eye className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label={`Edit ${expense.title}`}
                          onClick={() => setEditingExpense(expense)}
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          aria-label={`Delete ${expense.title}`}
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeletingExpense(expense)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto size-10 text-muted-foreground" />
              <h3 className="mt-4 font-medium">No expenses found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View expense dialog */}
      <ViewExpenseDialog
        open={Boolean(selectedExpense)}
        onOpenChange={(open) => {
          if (!open) setSelectedExpense(null);
        }}
        expense={selectedExpense}
      />

      {/* Edit expense dialog */}
      <EditExpenseDialog
        open={Boolean(editingExpense)}
        onOpenChange={(open) => {
          if (!open) setEditingExpense(null);
        }}
        expense={editingExpense}
        onSave={handleEditExpense}
      />

      {/* Delete confirmation */}
      {deletingExpense && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-expense-title"
            className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl"
          >
            <h2
              id="delete-expense-title"
              className="text-lg font-semibold"
            >
              Delete Expense?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong>{deletingExpense.title}</strong> (
              {deletingExpense.id})? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeletingExpense(null)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDeleteExpense}
              >
                Delete Expense
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;
