"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerMember } from "@/lib/auth";
import { SignInForm } from "@/components/auth/sign-in-form";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string(),
  })
  .refine((values) => values.password === values.confirm, {
    path: ["confirm"],
    error: "Passwords do not match",
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export function AuthPanel() {
  const router = useRouter();
  const { signIn, notify } = useApp();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  function handleSignUp(values: SignUpValues) {
    const result = registerMember(values.name, values.email);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError(null);
    signIn(result.user);
    notify("Account created. Explore the clubs to find your first evening");
    router.push("/dashboard");
  }

  const tabClass =
    "flex-1 rounded-full px-5 py-2.5 text-sm text-ink-soft transition-colors hover:text-ink data-[state=active]:bg-forest data-[state=active]:text-paper";

  return (
    <Tabs.Root defaultValue="sign-in" className="flex w-full flex-col gap-8">
      <Tabs.List aria-label="Sign in or create an account" className="flex rounded-full border border-ink/15 bg-white/70 p-1">
        <Tabs.Trigger value="sign-in" className={tabClass}>
          Sign in
        </Tabs.Trigger>
        <Tabs.Trigger value="create" className={tabClass}>
          Create account
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="sign-in" className="focus:outline-none">
        <SignInForm onSignedIn={(user) => router.push(user.role === "admin" ? "/admin" : "/dashboard")} />
      </Tabs.Content>

      <Tabs.Content value="create" className="focus:outline-none">
        <form onSubmit={handleSubmit(handleSignUp)} noValidate className="flex flex-col gap-6">
          {error ? (
            <p role="alert" className="rounded-2xl bg-clay/10 px-4 py-3 text-sm text-clay">
              {error}
            </p>
          ) : null}
          <Field label="Full name" error={errors.name?.message}>
            <input className={inputClass} autoComplete="name" {...register("name")} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <input className={inputClass} type="password" autoComplete="new-password" {...register("password")} />
          </Field>
          <Field label="Confirm password" error={errors.confirm?.message}>
            <input className={inputClass} type="password" autoComplete="new-password" {...register("confirm")} />
          </Field>
          <Button type="submit" size="lg">
            Create my account
          </Button>
          <p className="text-sm text-ink-soft">New accounts start as Associate. You can change tiers at any time from your membership page.</p>
        </form>
      </Tabs.Content>
    </Tabs.Root>
  );
}
