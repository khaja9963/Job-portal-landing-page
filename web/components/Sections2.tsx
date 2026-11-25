"use client";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  Eye, Maximize, MonitorSmartphone, Lock, ShieldCheck, Plus, Check, UploadCloud, FileText,
  MessageSquare, Zap, Send,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Counter, GlowCard, Reveal, Words } from "./shared";

/* ---------- Candidate experience ---------- */
const obSteps = ["Basic details", "Education", "Professional", "Resume upload", "AI video intro"];
const parsed = ["Name", "Education", "Skills", "Experience", "Social links"];
export function Candidates() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v + 1) % (obSteps.length + 1)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="candidates" className="relative px-5 py-28 bg-[#f4f2e6] "><div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Candidate experience</span>
        <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
          <Words>A candidate journey <span className="italic">worth finishing.</span></Words>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">A smooth, five-step onboarding and a calm interview room mean more completed profiles and fewer drop-offs.</p>
      </div>
      <div className="mt-14 grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="h-full p-2 md:p-4">
            <div className="flex items-center justify-between"><span className="text-sm font-medium">Candidate onboarding</span><span className="flex items-center gap-1.5 text-xs text-ok"><ShieldCheck size={13} /> Auto-saved securely</span></div>
            <div className="mt-6 flex items-center">
              {obSteps.map((n, i) => (
                <div key={n} className="flex flex-1 items-center last:flex-none">
                  <motion.div animate={{ scale: i === s ? 1.15 : 1 }} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors duration-500 ${i < s ? "border-ok bg-ok text-black" : i === s ? "border-accent bg-accent text-white shadow-[0_0_24px_rgba(255,90,20,.6)]" : "border-line bg-surface text-muted"}`}>{i < s ? <Check size={16} /> : i + 1}</motion.div>
                  {i < 4 && <div className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded bg-line"><motion.div className="absolute inset-0 origin-left bg-ok" animate={{ scaleX: i < s ? 1 : 0 }} transition={{ duration: 0.5 }} /></div>}
                </div>
              ))}
            </div>
            <div className="mt-2 hidden justify-between text-[11px] text-muted sm:flex">{obSteps.map((n, i) => <span key={n} className={i === s ? "text-accent" : ""}>{n}</span>)}</div>
            <div className="mt-8 rounded-2xl border border-dashed border-ok/40 bg-ok/5 p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ok/15 text-ok"><UploadCloud /></div>
              <div className="mt-3 flex items-center justify-center gap-2 font-medium"><FileText size={16} /> Resume.pdf <span className="text-xs text-muted">· Encrypted & stored</span></div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {parsed.map((p, i) => (
                  <motion.span key={p} initial={false} animate={{ opacity: s >= 3 ? 1 : 0.25, scale: s >= 3 ? 1 : 0.9 }} transition={{ delay: s >= 3 ? i * 0.12 : 0 }} className="flex items-center gap-1 rounded-full border border-ok/30 bg-ok/10 px-3 py-1 text-xs text-ok"><Check size={11} /> {p}</motion.span>
                ))}
              </div>
              <div className="mt-3 text-xs text-muted">AI parses the resume and fills empty profile fields</div>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:col-span-2">
          <Reveal delay={0.1}>
            <div className="p-2">
              <div className="flex items-center gap-2 text-sm font-medium"><Zap size={16} className="text-accent" /> Quick apply</div>
              {[["AI Engineer", "80%"], ["Backend Engineer", "76%"]].map(([j, m], i) => (
                <motion.div key={j} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15 }} className="mt-3 flex items-center justify-between rounded-xl bg-slate-900/5 p-3 text-sm">
                  <span>{j}</span><span className="rounded-md bg-ok/15 px-2 py-0.5 text-xs text-ok">{m} match</span><span className="rounded-lg bg-accent px-3 py-1 text-xs font-semibold">Apply</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-2">
              <div className="flex items-center gap-2 text-sm font-medium"><MessageSquare size={16} className="text-accent" /> Recruiter messages</div>
              <div className="mt-3 space-y-2 text-sm">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-accent/20 px-3 py-2">Impressed with your profile. Free for a quick chat?</motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }} className="w-fit max-w-[80%] rounded-2xl rounded-bl-md bg-slate-900/5 px-3 py-2">Absolutely, thank you!</motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div></section>
  );
}

/* ---------- Trust ---------- */
const trust = [
  { i: Eye, c: "bg-violet/15 text-violet", t: "Attention signals", d: "Gaze and look-away tracking surfaced as a timeline in every report." },
  { i: MonitorSmartphone, c: "bg-pink/15 text-pink", t: "Tab-switch tracking", d: "Switches are counted live, with a limit you control." },
  { i: Maximize, c: "bg-sky/20 text-ink/70", t: "Fullscreen sessions", d: "Interviews run in fullscreen with a device check first." },
  { i: Lock, c: "bg-accent/15 text-accent", t: "Encrypted storage", d: "Resumes and recordings stay encrypted and private to your org." },
];
function useIsWide() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(min-width: 1024px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false
  );
}

/* On wide screens each card appears on its own stretch of scroll, one after another. */
function TrustCard({ t, i, progress, sequential }: { t: (typeof trust)[number]; i: number; progress: MotionValue<number>; sequential: boolean }) {
  const from = 0.1 + i * 0.2;
  const o = useTransform(progress, [from, from + 0.17], [0, 1]);
  const y = useTransform(progress, [from, from + 0.17], [70, 0]);
  const sc = useTransform(progress, [from, from + 0.17], [0.94, 1]);
  const card = (
    <GlowCard className="h-full p-6">
      <div className={`grid h-12 w-12 place-items-center rounded-2xl ${t.c}`}><t.i size={22} /></div>
      <h3 className="font-display mt-5 text-xl font-semibold">{t.t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t.d}</p>
    </GlowCard>
  );
  return sequential ? (
    <motion.div style={{ opacity: o, y, scale: sc }} className="h-full">{card}</motion.div>
  ) : (
    <Reveal delay={i * 0.08}>{card}</Reveal>
  );
}

export function Trust() {
  const ref = useRef<HTMLElement>(null);
  const wide = useIsWide();
  const reduce = useReducedMotion();
  const sequential = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} style={sequential ? { height: "280svh" } : undefined} className="relative bg-[#e1e0cc] px-5">
      <div className={sequential ? "sticky top-0 flex min-h-svh items-center" : "py-28"}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Trust &amp; integrity</span>
            <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
              <Words>Trust, <span className="italic">built into every interview.</span></Words>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">Evidence, not guesswork. Every interview comes with signals that help you judge it fairly.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <TrustCard key={t.t} t={t} i={i} progress={scrollYProgress} sequential={sequential} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
const facts: { value: ReactNode; unit?: string; title: string; desc: string }[] = [
  { value: <Counter to={20} />, unit: "min", title: "Per AI interview", desc: "Each candidate answers six questions by voice in about twenty minutes." },
  { value: <Counter to={7} />, unit: "stages", title: "From applied to hired", desc: "Applied, screening, shortlisted, interview, offer, hired and rejected, in one pipeline." },
  { value: <Counter to={3} />, unit: "ways", title: "To search for candidates", desc: "Use filters, paste a job description, or simply speak." },
  { value: <span>24/7</span>, title: "Interviews on their time", desc: "Candidates take the AI interview whenever it suits them, day or night." },
];

const replay = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.4 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Stats() {
  return (
    <section className="bg-[#f4f2e6] px-5 py-24 text-ink">
      <div className="mx-auto max-w-6xl">
        <motion.div {...replay(0)} className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">At a glance</span>
          <h2 className="font-serif-d mt-4 text-4xl leading-[1.05] md:text-6xl">
            Clyptus in <span className="italic">four numbers.</span>
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <motion.div key={f.title} {...replay(i * 0.1)}>
              <div className="border-t border-black/15 pt-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-d text-7xl leading-none tabular-nums">{f.value}</span>
                  {f.unit && <span className="text-lg text-muted">{f.unit}</span>}
                </div>
                <div className="mt-4 text-lg font-semibold tracking-tight">{f.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  ["How does the AI interview work?", "You generate a shareable link from a job description. Candidates do a camera and microphone check, then answer adaptive questions by voice. You get a scored report with transcript and attention signals."],
  ["How do you check for cheating or distraction?", "Interviews run fullscreen, tab switches are counted live, and the report includes an attention timeline. These are signals to support your review, not automatic hiring decisions."],
  ["How do tokens work?", "Your organisation holds a shared token balance. AI actions such as AI-assisted matching and starting a conversation use tokens, and replies are free."],
  ["Can my team have different permissions?", "Yes. Roles and permissions control who can post jobs, search candidates, run interviews and manage the wallet."],
  ["What happens to candidate data?", "Resumes and recordings are encrypted at rest and visible only to the hiring organisation."],
  ["How fast can we get started?", "Book a demo and we'll set up your workspace, import your jobs and run your first AI interview campaign with you."],
];
export function FAQ() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section id="faq" className="relative px-5 py-28 bg-[#f4f2e6] "><div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">FAQ</span>
        <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
          <Words>Before <span className="italic">you ask.</span></Words>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">Still curious? Start here.</p>
      </div>
      <div className="mt-12 space-y-3">
        {faqs.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.05}>
            <div className={`glass overflow-hidden rounded-2xl transition-colors ${o === i ? "border-accent/40" : ""}`}>
              <button aria-expanded={o === i} onClick={() => setO(o === i ? null : i)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-medium focus-visible:outline-2 focus-visible:outline-accent">
                {q}
                <motion.span animate={{ rotate: o === i ? 45 : 0 }} className="shrink-0 text-accent"><Plus size={20} /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {o === i && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><p className="px-6 pb-5 leading-relaxed text-muted">{a}</p></motion.div>}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}

/* ---------- CTA + footer ---------- */
export function CTA() {
  const [done, setDone] = useState(false);
  const inp = "w-full rounded-xl border border-line bg-slate-900/5 px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-muted focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/40";
  return (
    <section id="cta" className="relative bg-[#f4f2e6] px-5 py-28">
      <div className="relative mx-auto max-w-5xl p-2 text-ink md:p-8">
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink md:text-5xl">Want to visit our portal?</h2>
            <p className="mt-5 text-lg text-muted">Book a 20-minute demo. We&apos;ll walk through your next open role, live.</p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {["Workspace set up for you", "Run your first AI interview campaign", "Custom token quote"].map((x) => (
                <li key={x} className="flex gap-2"><Check size={16} className="text-accent" /> {x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            {done ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ok/15 text-ok"><Check /></div>
                <h3 className="font-display mt-4 text-2xl font-semibold">Thanks, we&apos;ll be in touch.</h3>
                <p className="mt-2 text-muted">Expect an email within one working day.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-3">
                <label className="sr-only" htmlFor="n">Full name</label><input id="n" required placeholder="Full name" className={inp} />
                <label className="sr-only" htmlFor="e">Work email</label><input id="e" required type="email" placeholder="Work email" className={inp} />
                <label className="sr-only" htmlFor="p">Phone number</label><input id="p" required type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone number" className={inp} />
                <button className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ink py-4 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03]">Book my demo <Send size={16} className="transition-transform group-hover:translate-x-1" /></button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
