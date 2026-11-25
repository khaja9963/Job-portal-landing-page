"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Words } from "@/components/shared";

/** Assumption shown to the visitor: minutes to read one scored AI-interview report. */
const REVIEW_MIN = 3;

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

function Slider({
  id, label, hint, value, min, max, step, unit, onChange,
}: {
  id: string; label: string; hint: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-base font-medium">{label}</label>
        <span className="font-serif-d text-4xl tabular-nums">
          {value}
          <span className="ml-1.5 font-sans text-base text-muted">{unit}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={`${value} ${unit}`}
        className="mt-4 h-2 w-full cursor-pointer accent-accent"
      />
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}

function BigNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: "easeOut" });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

export default function TimeCalculator() {
  const [roles, setRoles] = useState(5);
  const [cands, setCands] = useState(40);
  const [mins, setMins] = useState(15);

  const today = (roles * cands * mins) / 60; // hours spent screening now
  const withC = (roles * cands * Math.min(REVIEW_MIN, mins)) / 60; // hours reading scored reports
  const saved = Math.max(0, today - withC);
  const days = saved / 8;
  const pct = today > 0 ? Math.max(4, (withC / today) * 100) : 0;
  const fmt = (n: number) => (n >= 10 ? Math.round(n).toLocaleString() : n.toFixed(1));

  return (
    <section id="calculator" style={{ fontFamily: "var(--font-geist)" }} className="relative bg-[#ecead8] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span {...rise(0)} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Time-saved calculator</motion.span>
          <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
            <Words>How much time could you <span className="italic">save?</span></Words>
          </h2>
          <motion.p {...rise(0.2)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Move the sliders. The math is shown below.
          </motion.p>
        </div>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
          <motion.div {...rise(0.1)} className="space-y-10">
            <Slider id="roles" label="Open roles" hint="Roles you are hiring for right now" value={roles} min={1} max={50} step={1} unit={roles === 1 ? "role" : "roles"} onChange={setRoles} />
            <Slider id="cands" label="Candidates per role" hint="People you screen for each role" value={cands} min={5} max={200} step={5} unit="people" onChange={setCands} />
            <Slider id="mins" label="Time spent screening each" hint="Reading a resume plus a first call, on average" value={mins} min={5} max={45} step={1} unit="min" onChange={setMins} />
          </motion.div>

          <motion.div {...rise(0.25)}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">You could save about</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-serif-d text-8xl leading-none tabular-nums md:text-9xl"><BigNumber value={saved} /></span>
              <span className="text-xl text-muted">hours a month</span>
            </div>
            <p className="mt-2 text-muted">
              {saved > 0 ? <>That is about <b className="font-semibold text-ink">{days.toFixed(1)} working days</b> of 8 hours.</> : "At this speed you are already quick. Try a longer screening time."}
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-sm"><span>Screening today</span><span className="tabular-nums text-muted">{fmt(today)} h</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-black/10"><motion.div className="h-full rounded-full bg-ink" animate={{ width: today > 0 ? "100%" : "0%" }} transition={{ duration: 0.5 }} /></div>
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-sm"><span>With Clyptus (reading scored reports)</span><span className="tabular-nums text-muted">{fmt(withC)} h</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-black/10"><motion.div className="h-full rounded-full bg-accent" animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} /></div>
              </div>
            </div>

            <div className="mt-8 border-t border-black/15 pt-5 text-sm leading-relaxed">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">How we worked it out</div>
              <p className="mt-2 font-mono text-[13px] text-ink">
                {roles} roles × {cands} candidates × ({mins} − {Math.min(REVIEW_MIN, mins)}) min ÷ 60 = {fmt(saved)} hours
              </p>
              <p className="mt-3 text-muted">
                <b className="font-semibold text-ink">This is an estimate, not a promise.</b> It assumes each open role is screened once a month, that Clyptus AI interviews replace your first-round screening, and that a scored report takes about {REVIEW_MIN} minutes to read. Your own results will vary.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
