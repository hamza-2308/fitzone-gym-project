"use client";

import { useFormState, useFormStatus } from "react-dom";
import { changeAdminPassword } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
      {pending ? "Saving..." : "Update Password"}
    </button>
  );
}

export default function AdminSettingsPage() {
  const [state, formAction] = useFormState(changeAdminPassword, {});

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl text-bone mb-1">Settings</h1>
      <p className="text-haze text-sm mb-8">Manage your admin account.</p>

      <div className="card p-5 sm:p-8 max-w-md w-full">
        <h2 className="text-bone font-semibold mb-5">Change Password</h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs text-haze block mb-1.5">Current Password</label>
            <input name="current" type="password" required className="w-full" />
          </div>
          <div>
            <label className="text-xs text-haze block mb-1.5">New Password</label>
            <input name="next" type="password" required className="w-full" />
          </div>
          {state?.error && <p className="text-ember text-sm">{state.error}</p>}
          {state?.success && <p className="text-emerald-400 text-sm">{state.success}</p>}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
