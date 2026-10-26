"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authenticate } from "@/lib/auth";
import type { SessionUser } from "@/lib/types";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

const schema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
});

type SignInValues = z.infer<typeof schema>;

interface SignInFormProps {
  /** Staff screens pass ["admin"], so member accounts are refused without being signed in. */
  allowedRoles?: SessionUser["role"][];
  onSignedIn?: (user: SessionUser) => void;
  submitLabel?: string;
}

export function SignInForm({ allowedRoles = ["member", "admin"], onSignedIn, submitLabel = "Sign in" }: SignInFormProps) {
  const { signIn, notify } = useApp();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: SignInValues) {
    const result = authenticate(values.email, values.password);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (!allowedRoles.includes(result.user.role)) {
      setError("This area is for staff accounts. Please use the staff credentials.");
      return;
    }

    setError(null);
    signIn(result.user);
    notify(result.user.role === "admin" ? "Signed in to the staff workspace" : "Welcome back to the house");
    onSignedIn?.(result.user);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {error ? (
        <p role="alert" className="rounded-2xl bg-clay/10 px-4 py-3 text-sm text-clay">
          {error}
        </p>
      ) : null}
      <Field label="Email" error={errors.email?.message}>
        <input className={inputClass} type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <input className={inputClass} type="password" autoComplete="current-password" placeholder="At least 8 characters" {...register("password")} />
      </Field>
      <Button type="submit" size="lg">
        {submitLabel}
      </Button>
    </form>
  );
}
