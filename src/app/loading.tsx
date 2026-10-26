export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="size-10 animate-pulse rounded-full bg-forest/25" aria-hidden="true" />
        <p className="text-sm text-ink-soft">Opening the house</p>
      </div>
    </div>
  );
}
