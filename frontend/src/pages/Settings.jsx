import {
  Building2,
  Bell,
  CreditCard,
  Save,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Settings() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your hotel configuration and system preferences.
          </p>
        </div>

        <Button>
          <Save className="mr-2 size-4" />
          Save Changes
        </Button>
      </div>

      {/* Hotel Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Building2 className="size-5" />
            </div>

            <div>
              <CardTitle>Hotel Profile</CardTitle>

              <p className="text-sm text-muted-foreground">
                Basic information about your hotel.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Hotel Name
              </label>

              <Input defaultValue="Hotel Grand Palace" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                GST Number
              </label>

              <Input defaultValue="24ABCDE1234F1Z5" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                defaultValue="admin@grandpalace.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Phone
              </label>

              <Input defaultValue="+91 98765 43210" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Address
              </label>

              <Input defaultValue="MG Road, Indore, Madhya Pradesh" />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <CreditCard className="size-5" />
            </div>

            <div>
              <CardTitle>Tax & Billing</CardTitle>

              <p className="text-sm text-muted-foreground">
                Configure invoice and GST settings.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                GST Rate
              </label>

              <select className="h-9 w-full rounded-md border bg-background px-3 text-sm">
                <option>5%</option>
                <option>12%</option>
                <option>18%</option>
                <option>28%</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Invoice Prefix
              </label>

              <Input defaultValue="INV" />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Users & Roles */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Users className="size-5" />
            </div>

            <div>
              <CardTitle>Users & Roles</CardTitle>

              <p className="text-sm text-muted-foreground">
                Manage hotel staff access.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">

            {[
              ["Hotel Admin", "Full access to hotel operations"],
              ["Manager", "Manage bookings, guests and reports"],
              ["Receptionist", "Manage bookings and check-in/check-out"],
            ].map(([role, description]) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{role}</p>

                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>

                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}

          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Bell className="size-5" />
            </div>

            <div>
              <CardTitle>Notifications</CardTitle>

              <p className="text-sm text-muted-foreground">
                Configure communication preferences.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">
                  WhatsApp Notifications
                </p>

                <p className="text-sm text-muted-foreground">
                  Send booking and payment updates through WhatsApp.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="size-4"
              />
            </label>

            <label className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">
                  Email Notifications
                </p>

                <p className="text-sm text-muted-foreground">
                  Send invoices and booking confirmations through email.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="size-4"
              />
            </label>

          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <CardTitle>Security</CardTitle>

              <p className="text-sm text-muted-foreground">
                Manage session and authentication settings.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Session Timeout
              </label>

              <select className="h-9 w-full rounded-md border bg-background px-3 text-sm">
                <option>15 Minutes</option>
                <option selected>30 Minutes</option>
                <option>60 Minutes</option>
                <option>120 Minutes</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="outline">
                Change Password
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default Settings;