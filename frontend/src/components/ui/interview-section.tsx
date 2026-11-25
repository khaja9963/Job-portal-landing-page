
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Eye, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Words } from "@/components/shared";

const INK = "#121210";
const ACCENT = "#ff5a14";
const QUESTION =
  "Can you explain the core fundamentals of building and evaluating machine learning models relevant to an AI Engineer role?";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

/* ---------- the interview room ---------- */
function Room() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [phase, setPhase] = useState(0); // 0 asking, 1 listening
  const [typed, setTyped] = useState(0);
  const [sec, setSec] = useState(0);
  const [voice, setVoice] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 0) {
      const iv = setInterval(
        () =>
          setTyped((n) => {
            if (n >= QUESTION.length) {
              clearInterval(iv);
              timer = setTimeout(() => setPhase(1), 700);
              return n;
            }
            return n + 2;
          }),
        28
      );
      return () => {
        clearInterval(iv);
        clearTimeout(timer);
      };
    }
    timer = setTimeout(() => {
      setTyped(0);
      setPhase(0);
    }, 4200);
    return () => clearTimeout(timer);
  }, [phase, inView]);

  useEffect(
    () => () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    []
  );
  const hear = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(QUESTION);
    u.rate = 0.95;
    u.onstart = () => setVoice(true);
    u.onend = () => setVoice(false);
    u.onerror = () => setVoice(false);
    window.speechSynthesis.speak(u);
  };

  const mm = String(Math.floor((1200 - sec) / 60)).padStart(2, "0");
  const ss = String((1200 - sec) % 60).padStart(2, "0");
  const asking = phase === 0 || voice;
  const live = asking || phase === 1;

  return (
    <div ref={ref}>
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div>
            <div className="font-medium">AI Interview · AI Engineer</div>
            <div className="text-xs text-muted">Technical core · Question 1 of 6</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs"><Eye size={13} /> Switches: 0/3</span>
            <span className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 font-mono text-xs text-red-600"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> REC {mm}:{ss}</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
          <div className="grid gap-4">
            <div className="relative grid h-56 place-items-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a1d12] to-[#141210] text-white">
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> AI Interviewer</span>
              <span className="absolute bottom-3 left-3 rounded-full bg-emerald-400/20 px-2.5 py-1 text-xs text-emerald-300">Looking toward screen</span>
              <motion.span
                animate={asking ? { scale: [1, 1.3, 1], opacity: [0.5, 0.12, 0.5] } : { scale: 1, opacity: 0.15 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute h-44 w-44 rounded-full border border-accent"
              />
              <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-[#e1e0cc]">
                <div className="flex h-12 w-16 items-center justify-center gap-3 rounded-2xl" style={{ background: INK }}>
                  {[0, 1].map((e) => (
                    <motion.span key={e} animate={{ scaleY: [1, 0.15, 1] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }} className="h-4 w-3 rounded-full bg-white" />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative grid h-44 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 text-white">
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-xs"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Candidate · Live camera</span>
              <div className="h-16 w-16 rounded-full bg-zinc-700" />
              <div className="absolute bottom-0 h-20 w-40 rounded-t-[60px] bg-zinc-700" />
              <motion.div className="absolute inset-x-0 h-px bg-emerald-400/60" animate={{ top: ["10%", "90%", "10%"] }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} />
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col p-2">
            <span className="w-fit rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">Question #1 · Machine learning fundamentals</span>
            <p className="font-serif-d mt-4 min-h-[150px] text-2xl leading-snug md:text-[1.75rem]">
              {QUESTION.slice(0, typed)}
              <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse align-middle bg-accent" />
            </p>
            <div className="mt-auto">
              <div className="flex h-12 items-center gap-[3px]">
                {Array.from({ length: 44 }).map((_, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-accent"
                    style={{
                      height: live ? "100%" : "12%",
                      opacity: live ? 1 : 0.3,
                      animation: live ? `bar ${0.6 + ((i * 37) % 60) / 100}s ease-in-out ${(i % 7) * 0.07}s infinite` : "none",
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 pt-3 text-sm">
                <AnimatePresence mode="wait">
                  <motion.span key={phase} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-muted">
                    {phase === 0 ? "AI is asking…" : "Listening to your answer…"}
                  </motion.span>
                </AnimatePresence>
                <button onClick={hear} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-accent">
                  <Volume2 size={14} /> Hear it spoken
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- report chart: draws itself; the picker re-draws the same chart ---------- */
const competencies = ["Technical", "Communication", "Role fit"] as const;
const scores: Record<(typeof competencies)[number], number[]> = {
  Technical: [78, 84, 81, 90, 86, 92],
  Communication: [88, 90, 85, 94, 91, 93],
  "Role fit": [72, 80, 83, 85, 88, 87],
};

function ReportChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%", once: true });
  const reduce = useReducedMotion();
  const [c, setC] = useState<(typeof competencies)[number]>("Technical");
  const v = scores[c];
  const avg = Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  const best = v.indexOf(Math.max(...v));
  const low = v.indexOf(Math.min(...v));
  const X = (i: number) => 28 + i * (344 / (v.length - 1));
  const Y = (s: number) => 124 - ((s - 60) / 40) * 100;
  const d = v.map((s, i) => `${i ? "L" : "M"}${X(i)} ${Y(s)}`).join(" ");
  const weight = c === "Technical" ? 3 : c === "Communication" ? 2.5 : 2;
  return (
    <div ref={ref} className="p-1 md:p-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50">Interview report · score by question</span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40">Sample data</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Competency">
        {competencies.map((x) => (
          <button
            key={x}
            aria-pressed={c === x}
            onClick={() => setC(x)}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent ${c === x ? "border-ink bg-ink text-white" : "border-black/15 text-ink/70 hover:border-accent hover:text-accent"}`}
          >
            {x}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 400 150" className="mt-5 h-44 w-full" role="img" aria-label={`${c} score by question, average ${avg}`}>
        {[24, 54, 84].map((y) => <line key={y} x1="28" x2="372" y1={y} y2={y} stroke="rgba(18,18,16,.08)" />)}
        <line x1="28" x2="372" y1="124" y2="124" stroke="rgba(18,18,16,.25)" />
        {v.map((_, i) => (
          <text key={i} x={X(i)} y="142" textAnchor="middle" fontSize="9" fill="rgba(18,18,16,.5)">Q{i + 1}</text>
        ))}
        <motion.path
          key={c}
          d={d}
          fill="none"
          stroke={ACCENT}
          strokeWidth={weight}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={inView || reduce ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
      <dl className="mt-3 grid grid-cols-3 gap-4 pt-4">
        {[["Average", String(avg)], ["Best question", `Q${best + 1} · ${v[best]}`], ["Lowest question", `Q${low + 1} · ${v[low]}`]].map(([a, b]) => (
          <div key={a}>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-ink/50">{a}</dt>
            <dd className="font-serif-d text-4xl tabular-nums">{b}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const rows: [string, string, string][] = [
  ["Questions", "Written from the job description", "6 per interview"],
  ["Voice", "Asked aloud, answered by voice", "Spoken"],
  ["Integrity", "Tab switches and look-aways tracked", "Live"],
  ["Report", "Score, transcript and attention signals", "Per interview"],
  ["Length", "A standard AI interview", "20 min"],
];

export default function InterviewSection() {
  return (
    <section id="interview" style={{ fontFamily: "var(--font-geist)" }} className="relative overflow-hidden bg-[#e1e0cc] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span {...rise(0)} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">AI video interviews</motion.span>
          <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
            <Words>Meet your interviewer. <span className="italic">It never sleeps.</span></Words>
          </h2>
          <motion.p {...rise(0.2)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Adaptive questions, voice answers, live integrity signals, and a scored report waiting when it ends.
          </motion.p>
          <motion.div {...rise(0.4)} className="mt-8">
            <a href="#report" className="inline-flex cursor-pointer items-center rounded-full border border-black/25 px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent">See a sample report</a>
          </motion.div>
        </div>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[1.45fr_1fr]">
          <motion.div {...rise(0)}><Room /></motion.div>
          <motion.div {...rise(0.15)}>
            <h3 className="font-serif-d text-4xl leading-[1.05] md:text-5xl">
              The whole interview, <span className="italic">run for you.</span>
            </h3>
            <p className="mt-4 text-muted">Candidates join when it suits them. You get the evidence, not the scheduling.</p>
            <ul className="mt-6 border-b border-black/15">
              {rows.map(([a, b, c], k) => (
                <motion.li key={a} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: 0.2 + k * 0.1, ease: [0.16, 1, 0.3, 1] }} className="grid grid-cols-[6rem_1fr_auto] items-baseline gap-4 border-t border-black/15 py-3.5 text-sm">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{a}</span>
                  <span className="text-muted">{b}</span>
                  <span className="text-right font-medium tabular-nums">{c}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div id="report" className="mt-24 scroll-mt-28">
          <motion.div {...rise(0)} className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="font-serif-d text-4xl leading-[1.05] md:text-5xl">
              Every answer, <span className="italic">scored.</span>
            </h3>
            <p className="mt-4 text-muted">Pick a competency to redraw the line across all six questions. The figures underneath change with it.</p>
          </motion.div>
          <ReportChart />
        </div>
      </div>
    </section>
  );
}
