import { useCallback, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";

import type { Recording } from "@/data/recordings";
import { WORLD_HEIGHT, WORLD_PATHS, WORLD_WIDTH, projectToMap } from "@/data/world-map";
import { cn } from "@/lib/utils";

interface SoundMapProps {
  recordings: Recording[];
  selectedId: string | null;
  onSelect: (recording: Recording) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;

export function SoundMap({ recordings, selectedId, onSelect }: SoundMapProps) {
  const [zoom, setZoom] = useState(1.25);
  const [center, setCenter] = useState({ x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2.35 });
  const [hovered, setHovered] = useState<string | null>(null);
  const dragRef = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const w = WORLD_WIDTH / zoom;
  const h = WORLD_HEIGHT / zoom;

  const clamp = useCallback(
    (x: number, y: number, z: number) => ({
      x: Math.min(WORLD_WIDTH - WORLD_WIDTH / z / 2, Math.max(WORLD_WIDTH / z / 2, x)),
      y: Math.min(WORLD_HEIGHT - WORLD_HEIGHT / z / 2, Math.max(WORLD_HEIGHT / z / 2, y)),
    }),
    [],
  );

  const applyZoom = (next: number) => {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
    setZoom(z);
    setCenter((c) => clamp(c.x, c.y, z));
  };

  const focus = (recording: Recording) => {
    const p = projectToMap(recording.latitude, recording.longitude);
    const z = Math.max(zoom, 2.4);
    setZoom(z);
    setCenter(clamp(p.x, p.y, z));
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY, cx: center.x, cy: center.y };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current;
    if (!d || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const dx = ((e.clientX - d.x) / rect.width) * w;
    const dy = ((e.clientY - d.y) / rect.height) * h;
    setCenter(clamp(d.cx - dx, d.cy - dy, zoom));
  };

  const endDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = null;
    svgRef.current?.releasePointerCapture(e.pointerId);
  };

  const markerScale = 1 / zoom;

  return (
    <div className="relative isolate h-full w-full overflow-hidden bg-[oklch(0.17_0.014_245)]">
      <svg
        ref={svgRef}
        role="img"
        aria-label="World map of archive recording locations"
        viewBox={`${center.x - w / 2} ${center.y - h / 2} ${w} ${h}`}
        className="size-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="oklch(0.28 0.03 200)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.15 0.012 250)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          x={0}
          y={0}
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}
          fill="url(#mapGlow)"
          pointerEvents="none"
        />

        {/* graticule */}
        <g stroke="oklch(1 0 0 / 0.05)" strokeWidth={0.4 * markerScale} pointerEvents="none">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={WORLD_HEIGHT} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 100} x2={WORLD_WIDTH} y2={i * 100} />
          ))}
        </g>

        <g
          fill="oklch(0.24 0.016 243)"
          stroke="oklch(1 0 0 / 0.14)"
          strokeWidth={0.35 * markerScale}
          pointerEvents="none"
        >
          {WORLD_PATHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {recordings.map((recording) => {
          const p = projectToMap(recording.latitude, recording.longitude);
          const selected = recording.id === selectedId;
          const active = selected || hovered === recording.id;
          const r = (selected ? 5.5 : 4) * markerScale;
          return (
            <g
              key={recording.id}
              role="button"
              tabIndex={0}
              aria-label={`${recording.title}, ${recording.location} — ${recording.category}`}
              aria-pressed={selected}
              className="cursor-pointer outline-none"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                onSelect(recording);
                focus(recording);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(recording);
                  focus(recording);
                }
              }}
              onMouseEnter={() => setHovered(recording.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(recording.id)}
              onBlur={() => setHovered(null)}
            >
              {selected ? (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  className="pulse-ring"
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  fill="oklch(0.82 0.1 178 / 0.5)"
                />
              ) : null}
              <circle
                cx={p.x}
                cy={p.y}
                r={r * 2.6}
                fill="oklch(0.82 0.1 178 / 0.1)"
                opacity={active ? 1 : 0}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={r}
                fill={
                  recording.audioUrl ? "oklch(0.82 0.1 178)" : "oklch(0.78 0.085 75)"
                }
                stroke="oklch(0.14 0.012 250)"
                strokeWidth={r * 0.35}
              />
              {active ? (
                <text
                  x={p.x + r * 2.4}
                  y={p.y + r * 0.9}
                  fill="oklch(0.96 0.012 95)"
                  fontSize={11 * markerScale}
                  fontFamily="var(--font-mono)"
                  letterSpacing={0.6 * markerScale}
                  pointerEvents="none"
                >
                  {recording.location.toUpperCase()}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-px border border-border bg-background/80 backdrop-blur">
        <button
          type="button"
          onClick={() => applyZoom(zoom * 1.5)}
          aria-label="Zoom in"
          className="grid size-10 place-items-center text-muted-foreground transition-colors hover:text-primary"
        >
          <Plus className="size-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => applyZoom(zoom / 1.5)}
          aria-label="Zoom out"
          className="grid size-10 place-items-center border-t border-border text-muted-foreground transition-colors hover:text-primary"
        >
          <Minus className="size-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => {
            setZoom(1.25);
            setCenter({ x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2.35 });
          }}
          aria-label="Reset the map view"
          className="grid size-10 place-items-center border-t border-border text-muted-foreground transition-colors hover:text-primary"
        >
          <RotateCcw className="size-3.5" strokeWidth={1.5} />
        </button>
      </div>

      {/* legend */}
      <dl className="pointer-events-none absolute bottom-4 left-4 space-y-1.5 border border-border bg-background/80 p-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <dt className="meta">Recording held</dt>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-sand" />
          <dt className="meta">Recording wanted</dt>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full bg-primary ring-2 ring-primary/40")} />
          <dt className="meta">Selected</dt>
        </div>
      </dl>
    </div>
  );
}
