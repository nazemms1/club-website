"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useApp } from "@/components/providers/app-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, inputClass, textareaClass } from "@/components/ui/field";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

const groupSizes = ["1 to 4", "5 to 10", "11 to 20", "More than 20"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  date: z.string().min(1, "Choose a preferred date"),
  groupSize: z.enum(groupSizes, { error: "Choose a group size" }),
  notes: z.string().trim().max(400, "Please keep notes under 400 characters").optional(),
});

type RequestValues = z.infer<typeof schema>;

export function ServiceRequestDialog({ service, className }: { service: Service; className?: string }) {
  const { notify } = useApp();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", date: "", notes: "" },
  });

  async function onSubmit() {
    // Mock submission: a real build would post to the booking service here.
    await new Promise((resolve) => setTimeout(resolve, 600));
    notify(`Request for ${service.title} sent. A concierge will reply today`);
    reset();
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn(buttonVariants({ variant: "outline" }), className)}>Request this service</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-[70] max-h-[90vh] w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] bg-paper p-8 shadow-2xl focus:outline-none md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-2">
              <Dialog.Title className="font-display text-3xl tracking-tight">{service.title}</Dialog.Title>
              <Dialog.Description className="text-sm text-ink-soft">{service.priceLabel}. Tell us the basics and a concierge will reply today.</Dialog.Description>
            </div>
            <Dialog.Close aria-label="Close" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15">
              <X className="size-4" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-5">
            <Field label="Your name" error={errors.name?.message}>
              <input className={inputClass} autoComplete="name" {...register("name")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input className={inputClass} type="email" autoComplete="email" {...register("email")} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Preferred date" error={errors.date?.message}>
                <input className={inputClass} type="date" {...register("date")} />
              </Field>
              <Field label="Group size" error={errors.groupSize?.message}>
                <select className={cn(inputClass, "appearance-none")} defaultValue="" {...register("groupSize")}>
                  <option value="" disabled>
                    Choose a size
                  </option>
                  {groupSizes.map((size) => (
                    <option key={size} value={size}>
                      {size} guests
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Anything we should know? (optional)" error={errors.notes?.message}>
              <textarea className={textareaClass} {...register("notes")} />
            </Field>
            <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? "Sending" : "Send request"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
