import type { CoverMotif, Palette } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CoverArtProps {
  palette: Palette;
  motif: CoverMotif;
  className?: string;
}

/**
 * Generative cover art so every club has a distinct, photo-free identity.
 * Swap for real photography later by replacing this component's output.
 */
export function CoverArt({ palette, motif, className }: CoverArtProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    >
      <rect width="400" height="500" fill={palette.background} />
      <Motif motif={motif} palette={palette} />
    </svg>
  );
}

function Motif({ motif, palette }: { motif: CoverMotif; palette: Palette }) {
  const { foreground, accent } = palette;

  switch (motif) {
    case "arch":
      return (
        <g fill="none" stroke={accent} strokeWidth="1.5">
          {[110, 92, 74, 56, 38].map((radius, index) => (
            <path key={radius} d={`M ${200 - radius} 430 V 230 A ${radius} ${radius} 0 0 1 ${200 + radius} 230 V 430`} opacity={1 - index * 0.14} />
          ))}
          <circle cx="200" cy="150" r="18" fill={accent} stroke="none" />
        </g>
      );

    case "rings":
      return (
        <g fill="none" stroke={accent} strokeWidth="1.2">
          {Array.from({ length: 9 }, (_, index) => (
            <circle key={index} cx="200" cy="250" r={24 + index * 26} opacity={1 - index * 0.08} />
          ))}
          <circle cx="200" cy="250" r="14" fill={foreground} stroke="none" />
        </g>
      );

    case "sun":
      return (
        <g>
          <circle cx="200" cy="300" r="96" fill={accent} />
          <rect x="0" y="300" width="400" height="200" fill={palette.background} />
          {Array.from({ length: 7 }, (_, index) => (
            <line
              key={index}
              x1="0"
              x2="400"
              y1={300 + index * 26}
              y2={300 + index * 26}
              stroke={foreground}
              strokeWidth="1"
              opacity={0.45}
            />
          ))}
        </g>
      );

    case "waves":
      return (
        <g fill="none" stroke={accent} strokeWidth="2">
          {Array.from({ length: 9 }, (_, index) => {
            const y = 90 + index * 42;
            return <path key={index} d={`M -20 ${y} q 50 -26 100 0 t 100 0 t 100 0 t 100 0 t 100 0`} opacity={0.5 + index * 0.05} />;
          })}
        </g>
      );

    case "peaks":
      return (
        <g>
          <polygon points="0,360 80,250 150,320 230,170 320,300 400,230 400,500 0,500" fill={foreground} opacity="0.25" />
          <polygon points="0,410 110,300 190,380 270,280 400,390 400,500 0,500" fill={accent} />
        </g>
      );

    case "grid":
      return (
        <g>
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 5 }, (_, column) => {
              const filled = (row * 3 + column * 2) % 5 === 0;
              return (
                <rect
                  key={`${row}-${column}`}
                  x={40 + column * 68}
                  y={60 + row * 70}
                  width="60"
                  height="62"
                  fill={filled ? accent : "none"}
                  stroke={foreground}
                  strokeOpacity="0.35"
                />
              );
            }),
          )}
        </g>
      );
  }
}
