
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Bot, Check, X } from "lucide-react";
import { useRef, type CSSProperties, type ReactNode } from "react";

const before = [
  "Hundreds of resumes to read by hand",
  "Weeks of phone screens and scheduling",
  "Gut-feel decisions, no comparable data",
  "Tools scattered across email and sheets",
];
const after = [
  "AI ranks the best-fit candidates instantly",
  "AI interviews run 24/7, on the candidate's time",
  "Scored reports with transcript and integrity signals",
  "One workspace: search, interview, pipeline, offers",
];

function Rows({ items, tone }: { items: string[]; tone: "before" | "after" }) {
  const after = tone === "after";
  return (
    <ul className="w-full max-w-2xl">
      {items.map((t, i) => (
        <li key={t} className={`flex items-center gap-4 border-t py-3.5 md:py-4 ${after ? "border-black/20" : "border-black/15"}`}>
          <span className={`w-8 text-xs font-semibold tracking-[0.14em] ${after ? "text-ink/45" : "text-ink/45"}`}>0{i + 1}</span>
          <span className={`flex-1 text-lg tracking-tight md:text-2xl ${after ? "text-ink" : "text-ink/40 line-through decoration-ink/40"}`}>{t}</span>
          {after ? <Check size={18} className="text-accent" /> : <X size={18} className="text-ink/40" />}
        </li>
      ))}
    </ul>
  );
}

function Headline() {
  return (
    <h2 className={`font-serif-d text-[14vw] leading-[0.9] md:text-[9.5vw] text-ink`}>
      The old way.<br />The <span className="italic">Clyptus</span> way.
    </h2>
  );
}

/* A constellation of widgets in different shapes: dial, island pill, notification deck, sticker. */
/* Four live cards in two clean columns. Each column drifts as one, so cards never overlap. */
const CARD = "w-[270px] rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_24px_70px_-20px_rgba(18,18,16,0.28)]";
const anim = (name: string, dur: number, delay = 0): CSSProperties => ({ animation: `${name} ${dur}s ${delay}s infinite both` });
const Label = ({ children }: { children: ReactNode }) => (
  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">{children}</div>
);

function ApplyCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between"><Label>Smart apply</Label><span className="text-[10px] text-ink/40">Sample data</span></div>
      <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold leading-none tracking-tight">20</span><span className="pb-1 text-sm text-ink/55">jobs, one click</span></div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full origin-left rounded-full bg-accent" style={{ width: "100%", ...anim("growx", 6) }} /></div>
      <ul className="mt-4 space-y-2">
        {["AI Engineer", "Backend Engineer", "Data Engineer"].map((r, i) => (
          <li key={r} className="flex items-center gap-2 text-sm" style={anim("popin", 6, i * 0.7)}>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white"><Check size={11} /></span>{r}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MessageCard() {
  return (
    <div className={CARD}>
      <Label>Messages</Label>
      <div className="mt-3 space-y-2 text-[13px]">
        <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#ecead8] px-3.5 py-2" style={anim("popin", 8, 0)}>Impressed with your profile!</div>
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-white" style={anim("popin", 8, 1.6)}>Thank you, happy to chat.</div>
        <div className="flex w-fit gap-1 rounded-2xl bg-[#ecead8] px-3.5 py-2.5" style={anim("popin", 8, 3.2)}>
          {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50" style={{ animationDelay: `${d * 0.15}s` }} />)}
        </div>
      </div>
    </div>
  );
}

function InterviewCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between"><Label>AI interview</Label><span className="text-[10px] text-ink/40">Question 1 of 6</span></div>
      <div className="mt-4 flex items-center gap-3">
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink text-white"><Bot size={20} /><span className="absolute inset-0 animate-ping rounded-2xl border border-ink/40" /></span>
        <span className="text-[13px] font-medium">AI interviewer</span>
      </div>
      <p className="mt-3 text-[15px] leading-snug" style={anim("wipe", 7)}>How would you evaluate a model before shipping it?</p>
      <div className="mt-4 flex h-9 items-center gap-[3px]">
        {Array.from({ length: 30 }).map((_, i) => <span key={i} className="w-[3px] rounded-full bg-accent" style={{ height: "100%", animation: `bar ${0.6 + ((i * 37) % 60) / 100}s ease-in-out ${(i % 7) * 0.07}s infinite` }} />)}
      </div>
    </div>
  );
}

function ScoreCard() {
  return (
    <div className={CARD}>
      <Label>Interview score</Label>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative grid h-20 w-20 shrink-0 place-items-center">
          <svg width="80" height="80" className="-rotate-90"><circle cx="40" cy="40" r="34" stroke="rgba(18,18,16,.1)" strokeWidth="7" fill="none" /><circle cx="40" cy="40" r="34" stroke="#ff5a14" strokeWidth="7" fill="none" strokeLinecap="round" strokeDasharray="214" style={{ ...anim("ringdraw", 6), "--c": "214", "--o": "17" } as CSSProperties} /></svg>
          <span className="absolute text-2xl font-semibold">92</span>
        </div>
        <div className="flex-1 space-y-2 text-[11px] text-ink/60">
          {[["Technical", 92], ["Communication", 95], ["Role fit", 88]].map(([l, v], i) => (
            <div key={l}><div className="mb-0.5 flex justify-between"><span>{l}</span><span>{v}</span></div><div className="h-1 overflow-hidden rounded-full bg-black/10"><div className="h-full origin-left rounded-full bg-ink" style={{ width: `${v}%`, ...anim("growx", 6, i * 0.3) }} /></div></div>
          ))}
        </div>
      </div>
      <div className="mt-4 border-t border-black/10 pt-3 text-[13px]">Aarav Mehta<span className="text-ink/50"> · AI Engineer</span></div>
    </div>
  );
}

/* Each card flows in on its own stretch of scroll: apply, interview, messages, score. */
function FlowIn({ p, from, to, children }: { p: MotionValue<number>; from: number; to: number; children: ReactNode }) {
  const o = useTransform(p, [from, to], [0, 1]);
  const y = useTransform(p, [from, to], [90, 0]);
  const sc = useTransform(p, [from, to], [0.94, 1]);
  return <motion.div style={{ opacity: o, y, scale: sc }}>{children}</motion.div>;
}

function Gallery({ p }: { p: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-[3%] hidden items-start gap-6 pt-[7%] 2xl:flex">
      <div className="flex flex-col gap-6">
        <FlowIn p={p} from={0.5} to={0.62}><ApplyCard /></FlowIn>
        <FlowIn p={p} from={0.7} to={0.82}><MessageCard /></FlowIn>
      </div>
      <div className="mt-24 flex flex-col gap-6">
        <FlowIn p={p} from={0.6} to={0.72}><InterviewCard /></FlowIn>
        <FlowIn p={p} from={0.8} to={0.92}><ScoreCard /></FlowIn>
      </div>
    </div>
  );
}

export default function StripStage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // bottom-up wipe: the top inset closes as progress rises
  const clip = useTransform(p, [0.06, 0.46], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const headO = useTransform(p, [0.38, 0.54], [1, 0]);

  // Reduced motion: the finished page - no pin, no clip.
  if (reduce) {
    return (
      <section style={{ fontFamily: "var(--font-geist)" }} className="bg-[#e1e0cc] px-6 py-24 text-ink md:px-10">
        <h2 className="font-serif-d max-w-3xl text-5xl leading-[1] md:text-7xl">
          The old way. The <span className="italic">Clyptus</span> way.
        </h2>
        <div className="mt-10"><Rows items={after} tone="after" /></div>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ fontFamily: "var(--font-geist)" }} className="relative h-[440svh] bg-[#f4efe4]">
      <div className="sticky top-0 isolate h-svh min-h-[600px] w-full overflow-hidden">
        {/* ground: the "before" */}
        <div className="absolute inset-0 bg-[#f4efe4]">
          <div className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-16 md:px-10 md:pb-20">
            <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/50">Without Clyptus</span>
            <Rows items={before} tone="before" />
          </div>
        </div>

        {/* revealed: the "after", wiping up from the bottom edge */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden bg-[#e1e0cc]">
          <Gallery p={p} />
          <div className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-16 md:px-10 md:pb-20">
            <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/60">With Clyptus</span>
            <Rows items={after} tone="after" />
          </div>
        </motion.div>

        <motion.div style={{ opacity: headO }} className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-4 text-center">
          <Headline />
        </motion.div>
      </div>
    </section>
  );
}
