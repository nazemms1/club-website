export function WorkspaceSkeleton() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-8">
      <span className="sr-only">Loading</span>
      <div className="flex flex-col gap-3">
        <div className="skeleton h-3 w-28 rounded-full" />
        <div className="skeleton h-10 w-80 max-w-full rounded-2xl" />
        <div className="skeleton h-4 w-[28rem] max-w-full rounded-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="skeleton h-36 rounded-3xl" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="skeleton h-96 rounded-3xl xl:col-span-7" />
        <div className="skeleton h-96 rounded-3xl xl:col-span-5" />
      </div>
    </div>
  );
}
