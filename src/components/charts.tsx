"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tableClass, tableWrapClass, tdClass, theadClass, thClass, rowClass } from "@/components/ui/table";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

// Chart tokens. The categorical palette is not used: series are single-hue (magnitude) or an
// ordinal ramp (ordered tiers), which the dataviz checks validate on the chart surface below.
const SURFACE = "#fdfcf9";
const FOREST = "#1d3a2f";
const BRASS = "#b08a4e";
const INK = "#1c1b18";
const INK_SOFT = "#5a564e";
const GRID = "#ece6d9";
const BASELINE = "#d8cfbd";
const TIER_RAMP = ["#8fb1a0", "#3d6a57", "#1d3a2f"];

const axisTick = { fill: INK_SOFT, fontSize: 12 };

function TooltipBox({ title, rows }: { title?: string; rows: { label: string; value: string; color?: string }[] }) {
  return (
    <div className="min-w-[150px] rounded-2xl border border-mist/80 bg-white px-4 py-3 text-sm shadow-lg">
      {title ? <p className="mb-2 font-medium">{title}</p> : null}
      <ul className="flex flex-col gap-1.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-2 text-ink-soft">
              {row.color ? <span className="size-2 rounded-full" style={{ background: row.color }} aria-hidden="true" /> : null}
              {row.label}
            </span>
            <span className="font-medium">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Table twin used by ChartCard in table view. Numbers align right and use tabular figures. */
export function ChartDataTable({ caption, columns, rows }: { caption: string; columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className={tableWrapClass}>
      <table className={tableClass}>
        <caption className="sr-only">{caption}</caption>
        <thead className={theadClass}>
          <tr>
            {columns.map((column, index) => (
              <th key={column} scope="col" className={cn(thClass, index > 0 && "text-right")}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowClass}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={cn(tdClass, cellIndex > 0 && "text-right tabular-nums")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MembershipGrowthChart({ data }: { data: { month: string; members: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="membership-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={FOREST} stopOpacity={0.2} />
            <stop offset="100%" stopColor={FOREST} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis axisLine={{ stroke: BASELINE }} dataKey="month" dy={8} tick={axisTick} tickLine={false} />
        <YAxis axisLine={false} domain={[0, "dataMax + 100"]} tick={axisTick} tickFormatter={(value: number) => formatNumber(value)} tickLine={false} width={48} />
        <Tooltip
          cursor={{ stroke: BASELINE, strokeWidth: 1 }}
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <TooltipBox
                title={String(label)}
                rows={payload.map((item) => ({ label: String(item.name), value: formatNumber(Number(item.value)), color: FOREST }))}
              />
            ) : null
          }
        />
        <Area
          activeDot={{ r: 5, fill: FOREST, stroke: SURFACE, strokeWidth: 2 }}
          dataKey="members"
          dot={false}
          fill="url(#membership-fill)"
          name="Members"
          stroke={FOREST}
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RsvpBarChart({ data }: { data: { category: string; rsvps: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid horizontal={false} stroke={GRID} />
        <XAxis hide type="number" />
        <YAxis axisLine={false} dataKey="category" tick={{ fill: INK, fontSize: 13 }} tickLine={false} type="category" width={112} />
        <Tooltip
          cursor={{ fill: "rgba(29, 58, 47, 0.05)" }}
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <TooltipBox title={String(label)} rows={[{ label: "RSVPs", value: formatNumber(Number(payload[0].value)), color: FOREST }]} />
            ) : null
          }
        />
        <Bar barSize={14} dataKey="rsvps" fill={FOREST} name="RSVPs" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function VisitsSparkline({ data }: { data: { week: string; visits: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="visits-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={BRASS} stopOpacity={0.35} />
            <stop offset="100%" stopColor={BRASS} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis axisLine={{ stroke: BASELINE }} dataKey="week" tick={axisTick} tickLine={false} />
        <YAxis domain={[0, "dataMax + 2"]} hide />
        <Tooltip
          cursor={{ stroke: BASELINE, strokeWidth: 1 }}
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <TooltipBox title={String(label)} rows={[{ label: "Visits", value: String(payload[0].value), color: BRASS }]} />
            ) : null
          }
        />
        <Area
          activeDot={{ r: 5, fill: BRASS, stroke: SURFACE, strokeWidth: 2 }}
          dataKey="visits"
          dot={false}
          fill="url(#visits-fill)"
          name="Visits"
          stroke={BRASS}
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TierDonut({ data }: { data: { tier: string; monthly: number; members: number }[] }) {
  const total = data.reduce((sum, item) => sum + item.monthly, 0);
  const slices = data.map((item, index) => ({
    ...item,
    fill: TIER_RAMP[index] ?? FOREST,
    share: Math.round((item.monthly / total) * 100),
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="relative mx-auto h-56 w-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="monthly"
              nameKey="tier"
              innerRadius="64%"
              outerRadius="94%"
              stroke={SURFACE}
              strokeWidth={2}
              isAnimationActive={false}
            >
              {slices.map((slice) => (
                <Cell key={slice.tier} fill={slice.fill} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <TooltipBox
                    title={String(payload[0].name)}
                    rows={[
                      { label: "Revenue", value: formatCurrency(Number(payload[0].value)) },
                      { label: "Share", value: `${Math.round((Number(payload[0].value) / total) * 100)}%` },
                    ]}
                  />
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold tracking-tight">{formatCurrency(total)}</p>
          <p className="text-xs text-ink-soft">per month</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {slices.map((slice) => (
          <li key={slice.tier} className="flex items-start justify-between gap-4 text-sm">
            <span className="flex min-w-0 items-start gap-3">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: slice.fill }} aria-hidden="true" />
              <span className="flex flex-col">
                <span className="font-medium">{slice.tier}</span>
                <span className="text-xs text-ink-soft">{formatNumber(slice.members)} members</span>
              </span>
            </span>
            <span className="flex shrink-0 flex-col items-end whitespace-nowrap">
              <span className="font-medium tabular-nums">{formatCurrency(slice.monthly)}</span>
              <span className="text-xs text-ink-soft tabular-nums">{slice.share}% of revenue</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
