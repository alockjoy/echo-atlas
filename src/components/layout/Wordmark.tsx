import { Link } from "@tanstack/react-router";

export function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      aria-label="Echo Atlas — home"
      className="group flex items-baseline gap-2.5"
    >
      <svg
        viewBox="0 0 28 16"
        aria-hidden="true"
        className="h-4 w-7 shrink-0 self-center text-primary"
      >
        {[
          { x: 2, h: 5 },
          { x: 7, h: 11 },
          { x: 12, h: 16 },
          { x: 17, h: 9 },
          { x: 22, h: 13 },
          { x: 26, h: 6 },
        ].map((bar, i) => (
          <rect
            key={bar.x}
            x={bar.x}
            y={(16 - bar.h) / 2}
            width="2"
            height={bar.h}
            rx="1"
            fill="currentColor"
            opacity={0.45 + i * 0.09}
          />
        ))}
      </svg>
      <span className="font-display text-xl leading-none tracking-[0.02em] text-foreground sm:text-[1.4rem]">
        Echo <span className="text-primary">Atlas</span>
      </span>
    </Link>
  );
}
