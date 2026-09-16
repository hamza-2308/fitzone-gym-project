"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdmin } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full justify-center disabled:opacity-60">
      {pending ? "Logging in..." : "Log In"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAdmin, {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-display text-2xl text-bone">
            FIT<span className="text-ember">ZONE</span>
          </div>
          <p className="text-haze text-sm mt-1">Admin Panel</p>
        </div>

        <form action={formAction} className="card p-8 space-y-5">
          <div>
            <label className="text-xs text-haze block mb-1.5">Username</label>
            <input name="username" required className="w-full" autoComplete="username" />
          </div>
          <div>
            <label className="text-xs text-haze block mb-1.5">Password</label>
            <input name="password" type="password" required className="w-full" autoComplete="current-password" />
          </div>
          {state?.error && <p className="text-ember text-sm">{state.error}</p>}
          <SubmitButton />
          <p className="text-haze text-xs text-center">Demo credentials: admin / admin123</p>
        </form>
      </div>
    </div>
  );
}
