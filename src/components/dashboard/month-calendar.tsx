import { cn } from "@/lib/utils";

interface MonthCalendarProps {
  label: string;
  year: number;
  /** 0-based month index. */
  month: number;
  marks: { date: string; tone: "booked" | "open" }[];
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Monday-first grid. Pure date arithmetic in UTC, so server and client render the same markup. */
function buildCells(year: number, month: number) {
  const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = Array.from({ length: offset }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

export function MonthCalendar({ label, year, month, marks }: MonthCalendarProps) {
  const cells = buildCells(year, month);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">{label}</p>
      <div className="grid grid-cols-7 text-center text-xs text-ink-soft">
        {weekdays.map((day) => (
          <span key={day} className="pb-2">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {cells.map((day, index) => {
          if (day === null) {
            return <span key={`empty-${index}`} aria-hidden="true" />;
          }
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const booked = marks.some((mark) => mark.date === iso && mark.tone === "booked");
          const hasOpen = marks.some((mark) => mark.date === iso && mark.tone === "open");
          return (
            <span key={iso} className="flex flex-col items-center gap-1 py-0.5">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  booked ? "bg-forest font-medium text-paper" : hasOpen ? "font-medium" : "text-ink-soft",
                )}
              >
                {day}
              </span>
              <span className={cn("size-1.5 rounded-full", hasOpen && !booked ? "bg-brass" : "bg-transparent")} aria-hidden="true" />
            </span>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-forest" aria-hidden="true" />
          You are booked
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-brass" aria-hidden="true" />
          Open to book
        </span>
      </div>
    </div>
  );
}
