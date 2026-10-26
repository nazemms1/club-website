"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useApp } from "@/components/providers/app-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/ui/field";
import type { MembershipTier } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

const interestOptions = ["Arts & Letters", "Food & Wine", "Music", "Wellness", "Outdoors", "Games"] as const;
const cityOptions = ["Toronto", "Montréal", "Vancouver"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Please enter a valid email address"),
  city: z.enum(cityOptions, { error: "Choose the city you live in" }),
  interests: z.array(z.enum(interestOptions)).min(1, "Choose at least one area of interest"),
  statement: z.string().trim().min(30, "Tell us a little more, at least 30 characters"),
  referredBy: z.string().trim().optional(),
  consent: z.boolean().refine((value) => value, { error: "Please accept the house rules to continue" }),
});

type ApplicationValues = z.infer<typeof schema>;

const stepFields: (keyof ApplicationValues)[][] = [
  ["name", "email", "city"],
  ["interests", "statement", "referredBy"],
  ["consent"],
];

const steps = ["About you", "Your interests", "Review"];

let applicationSequence = 1041;

/** Mock reference numbers. A real system would issue these from its database. */
function nextApplicationReference() {
  applicationSequence += 1;
  return `APP-${applicationSequence}`;
}

export function ApplicationForm({ tier, billing }: { tier: MembershipTier; billing: "monthly" | "annual" }) {
  const { notify, signIn } = useApp();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<{ values: ApplicationValues; reference: string } | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", interests: [], statement: "", referredBy: "", consent: false },
  });

  const draft = useWatch({ control });
  const price = billing === "annual" ? tier.annualMonthly : tier.monthly;

  async function goNext() {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((current) => current + 1);
  }

  function onSubmit(values: ApplicationValues) {
    setSubmitted({ values, reference: nextApplicationReference() });
    notify("Application received. We will reply within three working days");
  }

  if (submitted) {
    const { values, reference } = submitted;
    return (
      <div className="flex flex-col gap-6 rounded-3xl bg-forest p-10 text-paper md:p-14">
        <span className="flex size-12 items-center justify-center rounded-full bg-brass text-ink">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="font-display text-4xl tracking-tight">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="max-w-lg text-paper/80">
          Your application for <span className="text-brass">{tier.name}</span> is with the hosts. A host from your city will write within
          three working days, usually with an invitation to a first evening.
        </p>
        <p className="font-mono text-sm tracking-widest text-paper/60">Reference {reference}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/dashboard"
            onClick={() => signIn({ name: values.name, email: values.email, tierId: tier.id, role: "member" })}
            className={buttonVariants({ variant: "inverse" })}
          >
            Open my demo dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10 rounded-3xl border border-mist bg-white/60 p-8 md:p-12">
      <ol className="flex items-center gap-3" aria-label="Application steps">
        {steps.map((label, index) => (
          <li key={label} className="flex flex-1 items-center gap-3">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm",
                index <= step ? "border-forest bg-forest text-paper" : "border-ink/20 text-ink-soft",
              )}
              aria-current={index === step ? "step" : undefined}
            >
              {index + 1}
            </span>
            <span className={cn("hidden text-sm sm:inline", index === step ? "text-ink" : "text-ink-soft")}>{label}</span>
            {index < steps.length - 1 ? <span className="h-px flex-1 bg-ink/15" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Full name" error={errors.name?.message} className="md:col-span-2">
            <input className={inputClass} autoComplete="name" placeholder="Jane Doe" {...register("name")} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input className={inputClass} type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} />
          </Field>
          <Field label="City" error={errors.city?.message}>
            <select className={cn(inputClass, "appearance-none")} defaultValue="" {...register("city")}>
              <option value="" disabled>
                Choose a city
              </option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-4">
            <legend className="text-sm font-medium">Which rooms draw you in? Choose any that apply.</legend>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <label key={interest} className="cursor-pointer">
                  <input type="checkbox" value={interest} className="peer sr-only" {...register("interests")} />
                  <span className="inline-flex rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors peer-checked:border-forest peer-checked:bg-forest peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-brass">
                    {interest}
                  </span>
                </label>
              ))}
            </div>
            {errors.interests ? (
              <span role="alert" className="text-sm text-clay">
                {errors.interests.message}
              </span>
            ) : null}
          </fieldset>

          <Field label="Tell the hosts about yourself" error={errors.statement?.message}>
            <textarea
              className={textareaClass}
              placeholder="What do you love to do on a Thursday night? What would you bring to a table?"
              {...register("statement")}
            />
          </Field>

          <Field label="Referred by a member? (optional)">
            <input className={inputClass} placeholder="A member's name" {...register("referredBy")} />
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="flex flex-col gap-8">
          <dl className="grid gap-5 rounded-2xl bg-paper p-6 text-sm md:grid-cols-2">
            <div>
              <dt className="text-ink-soft">Name</dt>
              <dd className="mt-1 font-medium">{draft.name || "Not yet entered"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Email</dt>
              <dd className="mt-1 font-medium">{draft.email || "Not yet entered"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">City</dt>
              <dd className="mt-1 font-medium">{draft.city || "Not yet chosen"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Membership</dt>
              <dd className="mt-1 font-medium">
                {tier.name}, {formatCurrency(price)} per month {billing === "annual" ? "billed annually" : "billed monthly"}
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-ink-soft">Interests</dt>
              <dd className="mt-1 font-medium">{draft.interests?.join(", ") || "None selected"}</dd>
            </div>
          </dl>

          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" className="mt-1 size-4 accent-forest" {...register("consent")} />
            <span>
              I have read the house rules and understand that membership is by invitation. A host will confirm my place before any
              payment is taken.
            </span>
          </label>
          {errors.consent ? (
            <span role="alert" className="-mt-6 text-sm text-clay">
              {errors.consent.message}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4 border-t border-mist pt-8">
        <Button variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={goNext}>
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit">Submit application</Button>
        )}
      </div>
    </form>
  );
}
