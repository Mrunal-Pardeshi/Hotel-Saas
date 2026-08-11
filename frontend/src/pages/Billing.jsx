import { useMemo, useState } from "react";
import {
  CreditCard,
  Download,
  Eye,
  FileText,
  IndianRupee,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PaymentStatusBadge from "@/components/billing/PaymentStatusBadge";

import {
  invoices,
  paymentStatuses,
} from "@/constants/billing";

import CreateInvoiceDialog from "@/components/billing/CreateInvoiceDialog";

import RecordPaymentDialog from "@/components/billing/RecordPaymentDialog";

function Billing() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [paymentDialog, setPaymentDialog] = useState({
    open: false,
    invoice: null,
  });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        invoice.id.toLowerCase().includes(searchValue) ||
        invoice.bookingId.toLowerCase().includes(searchValue) ||
        invoice.guest.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" ||
        invoice.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const totalPaid = invoices.reduce(
    (sum, invoice) => sum + invoice.paid,
    0
  );

  const totalOutstanding = totalRevenue - totalPaid;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Billing
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage invoices, payments and outstanding balances.
          </p>
        </div>

        <CreateInvoiceDialog />
      </div>

      {/* Summary */}
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
              Collected
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalPaid.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              ₹{totalOutstanding.toLocaleString("en-IN")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid Invoices
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-muted-foreground" />

              <p className="text-2xl font-bold">
                {paidInvoices}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search invoice, booking or guest..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="pl-9"
              />
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="All">
                All Payment Statuses
              </option>

              {paymentStatuses.map((item) => (
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
                    Invoice
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Guest
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Date
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Amount
                  </th>

                  <th className="pb-3 font-medium text-muted-foreground">
                    Paid
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
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b last:border-0"
                  >

                    <td className="py-4">
                      <p className="font-medium">
                        {invoice.id}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {invoice.bookingId}
                      </p>
                    </td>

                    <td className="py-4">
                      <p className="font-medium">
                        {invoice.guest}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Room {invoice.room}
                      </p>
                    </td>

                    <td className="py-4 text-muted-foreground">
                      {invoice.date}
                    </td>

                    <td className="py-4 font-medium">
                      ₹{invoice.total.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4">
                      <p>
                        ₹{invoice.paid.toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Due ₹
                        {(invoice.total - invoice.paid)
                          .toLocaleString("en-IN")}
                      </p>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="size-4 text-muted-foreground" />
                        <span>{invoice.paymentMethod}</span>
                      </div>
                    </td>

                    <td className="py-4">
                      <PaymentStatusBadge
                        status={invoice.status}
                      />
                    </td>

                    <td className="py-4">
                      <div className="flex justify-end gap-1">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View invoice"
                          >
                            <Eye className="size-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            title="Download invoice"
                          >
                            <Download className="size-4" />
                          </Button>

                          {invoice.total > invoice.paid && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setPaymentDialog({
                                  open: true,
                                  invoice,
                                })
                              }
                            >
                              Pay
                            </Button>
                          )}
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Empty */}
          {filteredInvoices.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto size-10 text-muted-foreground" />

              <h3 className="mt-4 font-medium">
                No invoices found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </CardContent>
      </Card>

      <RecordPaymentDialog
        open={paymentDialog.open}
        onOpenChange={(open) =>
          setPaymentDialog((previous) => ({
            ...previous,
            open,
          }))
        }
        invoice={paymentDialog.invoice}
      />

    </div>
  );
}

export default Billing;