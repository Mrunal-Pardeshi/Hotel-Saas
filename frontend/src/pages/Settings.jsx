
import { useEffect, useState } from "react";
import {
  Building2,
  Bell,
  CreditCard,
  Save,
  ShieldCheck,
  Users,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STORAGE_KEY = "hotel-saas-settings";

const defaultSettings = {
  hotelName: "Hotel Grand Palace",
  gstNumber: "24ABCDE1234F1Z5",
  email: "admin@grandpalace.com",
  phone: "+91 98765 43210",
  address: "MG Road, Indore, Madhya Pradesh",
  gstRate: "5%",
  invoicePrefix: "INV",
  whatsappNotifications: true,
  emailNotifications: true,
  sessionTimeout: "30 Minutes",
};

function readSavedSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function Settings() {
  const [formData, setFormData] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(readSavedSettings());
  }, []);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setSaved(true);
    } catch {
      setSaved(false);
      window.alert("Unable to save settings in this browser.");
    }
  }

  function handleReset() {
    setFormData(defaultSettings);
    setSaved(false);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The form still resets if browser storage is unavailable.
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your hotel configuration and system preferences.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 size-4" />
            Reset
          </Button>

          <Button type="submit">
            <Save className="mr-2 size-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {saved && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
        >
          <CheckCircle2 className="size-4" />
          Settings saved successfully in this browser.
        </div>
      )}

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
              <label htmlFor="hotelName" className="text-sm font-medium">
                Hotel Name
              </label>
              <Input
                id="hotelName"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gstNumber" className="text-sm font-medium">
                GST Number
              </label>
              <Input
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax & Billing */}
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
              <label htmlFor="gstRate" className="text-sm font-medium">
                GST Rate
              </label>
              <select
                id="gstRate"
                name="gstRate"
                value={formData.gstRate}
                onChange={handleChange}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                {["5%", "12%", "18%", "28%"].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="invoicePrefix"
                className="text-sm font-medium"
              >
                Invoice Prefix
              </label>
              <Input
                id="invoicePrefix"
                name="invoicePrefix"
                value={formData.invoicePrefix}
                onChange={handleChange}
                required
              />
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
                Preview the available staff roles.
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
                className="flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium">{role}</p>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  Demo role
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Staff management requires authentication and a backend, which
            are outside this frontend-only implementation.
          </p>
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
                Configure your notification preferences.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p className="font-medium">WhatsApp Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Preference for booking and payment updates through WhatsApp.
                </p>
              </div>
              <input
                type="checkbox"
                name="whatsappNotifications"
                checked={formData.whatsappNotifications}
                onChange={handleChange}
                className="size-4 accent-primary"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Preference for invoices and booking confirmations by email.
                </p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
                className="size-4 accent-primary"
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            These switches save preferences only; they do not send messages.
          </p>
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
                Configure the demo session preference.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="sessionTimeout"
                className="text-sm font-medium"
              >
                Session Timeout
              </label>
              <select
                id="sessionTimeout"
                name="sessionTimeout"
                value={formData.sessionTimeout}
                onChange={handleChange}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm"
              >
                {[
                  "15 Minutes",
                  "30 Minutes",
                  "60 Minutes",
                  "120 Minutes",
                ].map((timeout) => (
                  <option key={timeout} value={timeout}>
                    {timeout}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  window.alert(
                    "Password changes require an authentication system, which is not configured in this frontend demo."
                  )
                }
              >
                Change Password
              </Button>
              <p className="text-xs text-muted-foreground">
                The timeout is saved as a preference; it does not enforce
                session expiration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Save */}
      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 size-4" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default Settings;
