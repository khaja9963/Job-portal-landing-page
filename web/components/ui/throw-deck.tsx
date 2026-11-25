"use client";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type Report = { code: string; name: string; role: string; score: number; tags: string[]; theme: string };

// Sample candidates for illustration only.
const reports: Report[] = [
  { code: "RPT-01", name: "Subham", role: "Senior React Developer", score: 92, tags: ["React", "TypeScript", "GraphQL"], theme: "bg-[#e1e0cc] text-[#121210]" },
  { code: "RPT-02", name: "Nikitha", role: "Full-stack Engineer", score: 88, tags: ["Node.js", "AWS", "React"], theme: "bg-[#0c0c0a] text-[#e1e0cc]" },
  { code: "RPT-03", name: "Monika", role: "React Developer", score: 85, tags: ["React", "GraphQL"], theme: "bg-accent text-white" },
  { code: "RPT-04", name: "Charan", role: "Frontend Engineer", score: 81, tags: ["Vue", "CSS", "Testing"], theme: "bg-white text-[#121210]" },
  { code: "RPT-05", name: "Harshini", role: "Backend Engineer", score: 78, tags: ["Python", "Docker"], theme: "bg-[#e1e0cc] text-[#121210]" },
];

export default function ThrowDeck() {
  const [order, setOrder] = useState(reports.map((_, i) => i));
  const [dx, setDx] = useState(0);
  const [drag, setDrag] = useState(false);
  const [fly, setFly] = useState<0 | 1 | -1>(0);
  const [snap, setSnap] = useState<number | null>(null);
  const start = useRef(0);
  const deck = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const throwCard = (dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setFly(dir);
    setTimeout(() => {
      setOrder((o) => {
        setSnap(o[0]);
        return [...o.slice(1), o[0]];
      });
      setFly(0);
      setDx(0);
      busy.current = false;
    }, 380);
  };

  useEffect(() => {
    if (snap === null) return;
    const t = setTimeout(() => setSnap(null), 60);
    return () => clearTimeout(t);
  }, [snap]);

  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (busy.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = e.clientX;
    setDrag(true);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (drag) setDx(e.clientX - start.current);
  };
  const up = () => {
    if (!drag) return;
    setDrag(false);
    const w = deck.current?.offsetWidth ?? 400;
    if (Math.abs(dx) > w * 0.1) throwCard(dx > 0 ? 1 : -1);
    else setDx(0);
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") throwCard(1);
    if (e.key === "ArrowLeft") throwCard(-1);
  };

  return (
    <div>
      <div
        ref={deck}
        role="group"
        aria-roledescription="deck of candidate reports"
        aria-label="Candidate report deck. Use left and right arrow keys to flip."
        tabIndex={0}
        onKeyDown={key}
        className="relative mx-auto aspect-square w-full max-w-[440px] select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#ecead8]"
      >
        {reports.map((r, idx) => {
          const k = order.indexOf(idx);
          const top = k === 0;
          let transform = `translate(${k * 12}px, ${-k * 9}px) scale(${1 - k * 0.05}) rotate(${(k % 2 ? 1 : -1) * k * 2}deg)`;
          if (top && (drag || fly)) {
            if (fly) transform = `translate(${fly * 115}%, -24px) rotate(${fly * 22}deg)`;
            else transform = `translate(${dx}px, 0) rotate(${dx / 18}deg) scale(1.02)`;
          }
          return (
            <div
              key={r.code}
              onPointerDown={top ? down : undefined}
              onPointerMove={top ? move : undefined}
              onPointerUp={top ? up : undefined}
              onPointerCancel={top ? up : undefined}
              aria-hidden={!top}
              style={{
                transform,
                zIndex: reports.length - k,
                transition: drag && top ? "none" : snap === idx ? "none" : "transform .38s cubic-bezier(.22,1,.36,1)",
                touchAction: "pan-y",
              }}
              className={`absolute inset-0 flex flex-col justify-between rounded-3xl p-7 shadow-[0_24px_60px_-20px_rgba(0,0,0,.45)] ${r.theme} ${top ? "cursor-grab active:cursor-grabbing" : ""}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">{r.code} · Interview report</span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Sample</span>
              </div>
              <div>
                <div className="text-7xl font-bold leading-none tracking-tight">{r.score}</div>
                <div className="mt-1 text-sm opacity-70">overall score</div>
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-tight">{r.name}</div>
                <div className="text-sm opacity-70">{r.role}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span key={t} className="rounded-full bg-current/15 px-3 py-1 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-xs uppercase tracking-[0.14em] text-muted">Drag a card aside, or use ← →</p>
      <div className="mt-3 flex justify-center gap-2" aria-live="polite">
        {reports.map((r, i) => (
          <span key={r.code} className={`h-1.5 rounded-full transition-all ${order[0] === i ? "w-6 bg-accent" : "w-1.5 bg-black/25"}`} />
        ))}
        <span className="sr-only">Showing {reports[order[0]].name}</span>
      </div>
    </div>
  );
}

export function ReportsDeck() {
  return (
    <section id="reports" className="bg-[#ecead8] px-5 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Interview reports</span>
          <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
            Review talent like a <span className="italic">deck of cards.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Every AI interview ends in a scored report with transcript and attention signals. Review them like a deck,
            keep the best, set the rest aside.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#interview" className="cursor-pointer rounded-full border border-black/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">See the interview</a>
          </div>
        </div>
        <ThrowDeck />
      </div>
    </section>
  );
}
