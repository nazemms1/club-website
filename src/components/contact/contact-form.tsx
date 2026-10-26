"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const topics = ["Membership", "Events and hosting", "Private dining and venues", "Press and partnerships", "Something else"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  topic: z.enum(topics, { error: "Choose the closest topic" }),
  message: z.string().trim().min(20, "Please write at least 20 characters so we can help properly"),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const { notify } = useApp();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    // Mock submission. Swap for a real endpoint or CRM call.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSentTo(values.email);
    notify("Message sent. A host will reply within two working days");
    reset();
  }

  if (sentTo) {
    return (
      <div className="flex flex-col gap-6 rounded-3xl border border-mist bg-white/60 p-10">
        <p className="font-display text-4xl tracking-tight">Thank you. It is in the right hands.</p>
        <p className="max-w-lg text-ink-soft">
          We have sent a copy to <span className="font-medium text-ink">{sentTo}</span>. Most messages get a reply within two working
          days.
        </p>
        <button type="button" onClick={() => setSentTo(null)} className="inline-flex w-fit items-center gap-2 text-sm font-medium hover:text-clay">
          Send another message
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 rounded-3xl border border-mist bg-white/60 p-8 md:p-10">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input className={inputClass} autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <Field label="What is this about?" error={errors.topic?.message}>
        <select className={cn(inputClass, "appearance-none")} defaultValue="" {...register("topic")}>
          <option value="" disabled>
            Choose a topic
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Your message" error={errors.message?.message}>
        <textarea className={cn(textareaClass, "min-h-40")} {...register("message")} />
      </Field>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
