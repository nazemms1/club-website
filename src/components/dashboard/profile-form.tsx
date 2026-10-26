"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, inputClass, textareaClass } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const cityOptions = ["Toronto", "Montréal", "Vancouver"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Please enter a valid email address"),
  city: z.enum(cityOptions, { error: "Choose your home city" }),
  bio: z.string().trim().max(280, "Keep your bio under 280 characters"),
  houseLetter: z.boolean(),
  eventReminders: z.boolean(),
  hostMessages: z.boolean(),
});

type ProfileValues = z.infer<typeof schema>;

const notifications = [
  { name: "houseLetter", label: "House letter", description: "A monthly note with new clubs, hosts and events." },
  { name: "eventReminders", label: "Event reminders", description: "A reminder the day before any evening you have booked." },
  { name: "hostMessages", label: "Messages from hosts", description: "Direct notes from the hosts of clubs you have joined." },
] as const;

export function ProfileForm() {
  const { user, updateUser, notify } = useApp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      city: "Toronto",
      bio: "Reader, cook, occasional swimmer. Happiest when a conversation runs past midnight.",
      houseLetter: true,
      eventReminders: true,
      hostMessages: false,
    },
  });

  async function onSubmit(values: ProfileValues) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    updateUser({ name: values.name, email: values.email });
    reset(values);
    notify("Profile saved");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 xl:grid-cols-12">
      <Card className="flex flex-col gap-8 xl:col-span-7">
        <CardHeader title="Personal details" description="How hosts see you in the house" />
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Full name" error={errors.name?.message} className="md:col-span-2">
            <input className={inputClass} autoComplete="name" {...register("name")} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Home city" error={errors.city?.message}>
            <select className={cn(inputClass, "appearance-none")} {...register("city")}>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Short bio" error={errors.bio?.message}>
          <textarea className={textareaClass} {...register("bio")} />
        </Field>
      </Card>

      <Card className="flex flex-col gap-6 xl:col-span-5">
        <CardHeader title="Notifications" description="Choose what reaches your inbox" />
        <ul className="flex flex-col divide-y divide-mist/70">
          {notifications.map((item) => (
            <li key={item.name} className="flex items-start justify-between gap-6 py-5 first:pt-0 last:pb-0">
              <label className="flex cursor-pointer flex-col gap-1">
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-ink-soft">{item.description}</span>
              </label>
              <input type="checkbox" className="mt-1 size-5 shrink-0 accent-forest" {...register(item.name)} aria-label={item.label} />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Saving" : "Save changes"}
          </Button>
          {!isDirty ? <span className="text-sm text-ink-soft">No unsaved changes</span> : null}
        </div>
      </Card>
    </form>
  );
}
