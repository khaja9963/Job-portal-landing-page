
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bot, Check, FileSpreadsheet, Loader2, MessageSquare, Send, Volume2, Zap } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Words } from "@/components/shared";

/* ---------- shared window chrome ---------- */
function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1 text-xs">
        <span className="font-medium text-ink/60">{title}</span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ink/40">Sample data</span>
      </div>
      {children}
    </div>
  );
}

function useDemoClock(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setT((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [inView, reduce, ms]);
  return { ref, t, setT, reduce: !!reduce };
}

/* ---------- 1. messaging ---------- */
type Item = { k: "r" | "c" | "typing"; text?: string };
const chat: Item[] = [
  { k: "r", text: "Hi Aarav, I was impressed by your profile. Open to a quick chat about an AI Engineer role?" },
  { k: "typing" },
  { k: "c", text: "Thank you! Yes, I'd love to hear more." },
  { k: "r", text: "Great. Does tomorrow at 11am work? I'll send a video call link." },
  { k: "typing" },
  { k: "c", text: "Works for me. See you then." },
];

function MessagingDemo() {
  const { ref, t, reduce } = useDemoClock(1600);
  const n = reduce ? chat.length : t % (chat.length + 3);
  const shown = chat.map((m, i) => ({ m, i })).filter(({ m, i }) => i < n && (m.k !== "typing" || i === n - 1));
  const lastC = shown.filter(({ m }) => m.k === "c").map(({ i }) => i);
  return (
    <div ref={ref}>
      <Frame title="Messages · Aarav Mehta, AI Engineer">
        <div className="flex h-[360px] flex-col justify-end gap-3 overflow-hidden p-1 text-sm">
          <AnimatePresence initial={false}>
            {shown.map(({ m, i }) => {
              const read = m.k === "r" && lastC.some((c) => c > i);
              if (m.k === "typing")
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#ecead8] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/50" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </motion.div>
                );
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className={m.k === "r" ? "ml-auto max-w-[80%]" : "max-w-[80%]"}>
                  <div className={`rounded-2xl px-4 py-2.5 leading-snug ${m.k === "r" ? "rounded-br-md bg-ink text-white" : "rounded-bl-md bg-[#ecead8] text-ink"}`}>{m.text}</div>
                  {m.k === "r" && <div className="mt-1 text-right text-[10px] text-ink/45">{read ? "Read" : "Sent"}</div>}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3 px-1 pt-4">
          <span className="flex-1 text-sm text-ink/40">Type your message…</span>
          <span className="text-[11px] text-ink/50">2 tokens to start · replies are free</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white"><Send size={15} /></span>
        </div>
      </Frame>
    </div>
  );
}

/* ---------- 2. crawler -> spreadsheet -> portal ---------- */
const crawled: [string, string, string, string][] = [
  ["Backend Engineer", "Northwind Labs", "Career page", "2h ago"],
  ["AI Engineer", "Acme Corp", "Job board", "3h ago"],
  ["Frontend Developer", "Bluepeak", "Aggregator", "5h ago"],
  ["Data Analyst", "Orbit Retail", "Job board", "6h ago"],
  ["DevOps Engineer", "Cloudline", "Career page", "8h ago"],
  ["Product Designer", "Lumen", "Job board", "9h ago"],
  ["QA Engineer", "Fintrail", "Aggregator", "10h ago"],
  ["Full-stack Developer", "Kitepay", "Career page", "12h ago"],
];
const sources = ["Job boards", "Aggregators", "Career pages"];

function CrawlerDemo() {
  const { ref, t, reduce } = useDemoClock(1100);
  const n = reduce ? crawled.length : Math.min(crawled.length, t % (crawled.length + 5));
  const rows = crawled.slice(0, n);
  const live = crawled.slice(0, Math.max(0, n - 1));
  return (
    <div ref={ref}>
      <Frame title="Job crawler">
        <div className="space-y-4 p-1">
          {/* sources being scanned */}
          <div className="relative flex flex-wrap items-center gap-2 overflow-hidden rounded-2xl bg-black/[0.04] p-3">
            <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink/50">Scanning</span>
            {sources.map((s, i) => (
              <span key={s} className={`rounded-full border px-3 py-1 text-xs transition-colors duration-300 ${t % 3 === i && !reduce ? "border-accent bg-accent/10 text-accent" : "border-black/15 text-ink/60"}`}>{s}</span>
            ))}
            <span className="ml-auto text-xs font-medium text-ink">{n} new jobs found</span>
            {!reduce && <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/10 to-transparent" style={{ animation: "sweep 2.2s linear infinite" }} />}
          </div>

          <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
            {/* the spreadsheet */}
            <div className="overflow-hidden rounded-2xl bg-black/[0.04]">
              <div className="flex items-center gap-2 bg-[#1d6f42] px-3 py-2 text-xs font-medium text-white"><FileSpreadsheet size={14} /> new_jobs.xlsx</div>
              <div className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.6fr] border-b border-black/10 bg-[#f1f3ef] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/55">
                <span>Title</span><span>Company</span><span>Source</span><span>Posted</span>
              </div>
              <div className="h-[216px] overflow-hidden">
                <AnimatePresence initial={false}>
                  {rows.slice(-6).map((r) => (
                    <motion.div key={r[0]} initial={{ opacity: 0, backgroundColor: "rgba(255,90,20,0.18)" }} animate={{ opacity: 1, backgroundColor: "rgba(255,90,20,0)" }} transition={{ duration: 1.2 }} className="grid grid-cols-[1.4fr_1.1fr_0.9fr_0.6fr] border-b border-black/5 px-3 py-2 text-xs text-ink">
                      <span className="truncate font-medium">{r[0]}</span><span className="truncate text-ink/70">{r[1]}</span><span className="truncate text-ink/70">{r[2]}</span><span className="text-ink/60">{r[3]}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* our portal */}
            <div className="rounded-2xl bg-black/[0.04] p-3">
              <div className="mb-2 flex items-center justify-between text-xs"><span className="font-medium">Clyptus portal · Latest jobs</span><span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">Live</span></div>
              <div className="space-y-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {live.slice(-3).reverse().map((r) => (
                    <motion.div layout key={r[0]} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 rounded-xl border border-black/10 p-2.5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#ecead8] text-xs font-semibold">{r[1][0]}</span>
                      <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{r[0]}</span><span className="block truncate text-[11px] text-ink/55">{r[1]}</span></span>
                      <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">New</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {live.length === 0 && <div className="py-10 text-center text-xs text-ink/40">Waiting for the crawler…</div>}
              </div>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ---------- 3. AI interview: generated question, spoken aloud ---------- */
const questions: { jd: string; q: string }[] = [
  { jd: "AI Engineer", q: "Can you explain how you would evaluate a machine learning model before shipping it?" },
  { jd: "Backend Engineer", q: "Tell me about a time you had to debug a production issue under pressure." },
  { jd: "Backend Engineer", q: "How would you design a REST API for a job application workflow?" },
];

function InterviewDemo() {
  const { ref, t, reduce } = useDemoClock(260);
  const GEN = 7;
  const LISTEN = 9;
  const lens = questions.map((x) => GEN + x.q.split(" ").length + LISTEN);
  const total = lens.reduce((a, b) => a + b, 0);
  let local = reduce ? GEN + 1 : t % total;
  let qi = 0;
  while (local >= lens[qi]) { local -= lens[qi]; qi++; }
  const cur = questions[qi];
  const words = cur.q.split(" ");
  const phase = reduce ? "say" : local < GEN ? "gen" : local < GEN + words.length ? "say" : "listen";
  const spoken = reduce ? words.length : phase === "gen" ? 0 : Math.min(words.length, local - GEN + 1);
  const [voice, setVoice] = useState(false);

  useEffect(() => () => { if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);
  const hear = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(cur.q);
    u.rate = 0.95;
    u.onstart = () => setVoice(true);
    u.onend = () => setVoice(false);
    u.onerror = () => setVoice(false);
    window.speechSynthesis.speak(u);
  };
  const speaking = phase === "say" || voice;

  return (
    <div ref={ref}>
      <Frame title="AI interview">
        <div className="p-1">
          <div className="flex items-center gap-3">
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
              <Bot size={26} />
              {speaking && <span className="absolute inset-0 animate-ping rounded-2xl border border-accent" />}
            </div>
            <div>
              <div className="text-sm font-semibold">AI Interviewer</div>
              <div className="text-xs text-ink/55">Question {qi + 1} of {questions.length} · Technical core</div>
            </div>
            <span className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${phase === "gen" ? "bg-black/5 text-ink/60" : speaking ? "bg-accent/10 text-accent" : "bg-black/5 text-ink/60"}`}>
              {phase === "gen" ? "Generating…" : speaking ? "Speaking" : "Listening"}
            </span>
          </div>

          <div className="mt-5 min-h-[150px] rounded-2xl bg-black/[0.04] p-5">
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink/45">
              <Zap size={12} className="text-accent" /> Generated from the {cur.jd} job description
            </div>
            {phase === "gen" ? (
              <div className="flex items-center gap-2 text-sm text-ink/55"><Loader2 size={16} className="animate-spin" /> Writing a role-specific question…</div>
            ) : (
              <p className="font-serif-d text-2xl leading-snug">
                {words.map((w, i) => (
                  <span key={i} className={`transition-colors duration-200 ${i < spoken ? "text-ink" : "text-ink/25"}`}>{w} </span>
                ))}
              </p>
            )}
          </div>

          <div className="mt-4 flex h-12 items-center justify-center gap-[3px]">
            {Array.from({ length: 44 }).map((_, i) => (
              <span key={i} className="w-[3px] rounded-full bg-accent" style={{ height: speaking ? "100%" : "12%", opacity: speaking ? 1 : 0.35, animation: speaking ? `bar ${0.6 + ((i * 37) % 60) / 100}s ease-in-out ${(i % 7) * 0.07}s infinite` : "none", transition: "height .3s" }} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-ink/45">Plays with your browser&apos;s voice</span>
            <button onClick={hear} className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-accent">
              <Volume2 size={14} /> Hear the AI ask it
            </button>
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ---------- 4. smart apply: 20 jobs, one click ---------- */
const titles = ["AI Engineer", "Backend Engineer", "Frontend Developer", "Data Analyst", "DevOps Engineer", "QA Engineer", "Full-stack Developer", "Product Designer", "ML Engineer", "Data Engineer"];
const cos = ["Acme Corp", "Northwind Labs", "Bluepeak", "Orbit Retail", "Cloudline", "Lumen", "Fintrail", "Kitepay", "Helio", "Stackwell"];
const jobs = Array.from({ length: 20 }, (_, i) => ({ t: titles[i % 10], c: cos[(i * 3) % 10], m: 96 - ((i * 7) % 19) }));
const ROW = 56;

function SmartApplyDemo() {
  const { ref, t, setT, reduce } = useDemoClock(170);
  const cycle = 46;
  const tt = reduce ? 5 + 20 + 1 : t % cycle;
  const a = Math.min(20, Math.max(0, tt - 5));
  const done = a >= 20;
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (list.current) list.current.scrollTop = Math.max(0, a - 4) * ROW;
  }, [a]);
  return (
    <div ref={ref}>
      <Frame title="Smart apply">
        <div className="p-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">20 jobs match your profile</div>
              <div className="text-xs text-ink/55">One profile · one click</div>
            </div>
            <button onClick={() => setT(5)} disabled={a > 0 && !done} className={`inline-flex min-w-[170px] cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all focus-visible:outline-2 focus-visible:outline-accent ${done ? "bg-ok" : "bg-accent hover:scale-[1.03]"}`}>
              {done ? <><Check size={16} /> 20 sent</> : a > 0 ? <><Loader2 size={16} className="animate-spin" /> {a}/20</> : <><Zap size={16} /> Smart apply</>}
            </button>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-accent transition-[width] duration-200" style={{ width: `${(a / 20) * 100}%` }} /></div>

          <div ref={list} className="mt-4 h-[280px] overflow-hidden rounded-2xl bg-black/[0.04]">
            {jobs.map((j, i) => {
              const state = i < a ? "done" : i === a && a > 0 && !done ? "run" : "queued";
              return (
                <div key={i} style={{ height: ROW }} className="flex items-center gap-3 border-b border-black/5 px-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#ecead8] text-xs font-semibold">{j.c[0]}</span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{j.t}</span><span className="block truncate text-xs text-ink/55">{j.c}</span></span>
                  <span className="text-xs text-ink/50">{j.m}% match</span>
                  <span className="grid h-6 w-6 place-items-center">
                    {state === "done" && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-5 w-5 place-items-center rounded-full bg-ok text-white"><Check size={12} /></motion.span>}
                    {state === "run" && <Loader2 size={16} className="animate-spin text-accent" />}
                    {state === "queued" && <span className="h-4 w-4 rounded-full border border-black/20" />}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 h-5 text-center text-xs text-ink/55">{done ? "20 applications sent with a single click." : a > 0 ? "Applying with your saved profile…" : "Press Smart apply to send your profile to all 20."}</div>
        </div>
      </Frame>
    </div>
  );
}

/* ---------- the section ---------- */
const features: { n: string; icon: typeof MessageSquare; title: ReactNode; body: string; points: string[]; demo: ReactNode }[] = [
  {
    n: "01", icon: MessageSquare,
    title: <>Recruiter and candidate, <span className="italic">in one thread.</span></>,
    body: "Reach the people you found without leaving the portal. Start a conversation, then keep talking. Candidates reply from their own inbox.",
    points: ["First message costs 2 tokens", "Every reply is free", "Unread, replied and closed filters"],
    demo: <MessagingDemo />,
  },
  {
    n: "02", icon: FileSpreadsheet,
    title: <>A crawler that finds new jobs <span className="italic">for you.</span></>,
    body: "Our crawler scans job portals across the internet for newly posted roles, logs each one in an Excel sheet, and publishes them on the Clyptus portal for candidates to find.",
    points: ["Scans job boards, aggregators and career pages", "Every new job is logged in a spreadsheet", "Listings appear on our portal automatically"],
    demo: <CrawlerDemo />,
  },
  {
    n: "03", icon: Bot,
    title: <>An interviewer that <span className="italic">asks out loud.</span></>,
    body: "The AI writes role-specific questions from the job description, then speaks each one. Candidates answer by voice, whenever it suits them.",
    points: ["Questions generated from the job description", "The AI speaks every question", "Adaptive follow-ups based on answers"],
    demo: <InterviewDemo />,
  },
  {
    n: "04", icon: Zap,
    title: <>Twenty applications, <span className="italic">one click.</span></>,
    body: "Smart apply sends your profile to the best-matching jobs in a single action, so candidates spend their time preparing, not filling forms.",
    points: ["Apply to up to 20 jobs at once", "Matched to your profile and preferences", "Track every application in one place"],
    demo: <SmartApplyDemo />,
  },
];

function FeatureRow({ f, i }: { f: (typeof features)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const demoY = useTransform(p, [0, 1], [80, -80]);
  const rotX = useTransform(p, [0, 0.3, 0.7, 1], [14, 0, 0, -8]);
  const scale = useTransform(p, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.95]);
  const demoO = useTransform(p, [0, 0.18, 0.85, 1], [0, 1, 1, 0.5]);
  const textY = useTransform(p, [0, 1], [36, -36]);
  const numY = useTransform(p, [0, 1], [150, -150]);
  const glowY = useTransform(p, [0, 1], [-60, 60]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} id={`feat-${i}`} className="relative grid scroll-mt-24 items-center gap-12 lg:grid-cols-2 lg:gap-16 [perspective:1400px]">
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y: numY }}
        className={`pointer-events-none absolute -top-16 select-none font-serif-d text-[9rem] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(18,18,16,0.13)] md:text-[16rem] ${flip ? "right-0" : "left-0"}`}
      >
        {f.n}
      </motion.span>

      <motion.div style={reduce ? undefined : { y: textY }} className={`relative z-10 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10"><f.icon size={16} /></span> Feature {f.n}
        </div>
        <h3 className="font-serif-d mt-5 text-4xl leading-[1.05] text-ink md:text-5xl">
          <Words>{f.title}</Words>
        </h3>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="mt-5 max-w-md text-lg leading-relaxed text-muted">
          {f.body}
        </motion.p>
        <ul className="mt-7 space-y-3">
          {f.points.map((pt, k) => (
            <motion.li key={pt} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: 0.4 + k * 0.12, ease: [0.16, 1, 0.3, 1] }} className="relative flex items-center gap-3 pt-3 text-sm text-ink/80">
              <motion.span aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4 + k * 0.12, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 top-0 h-px w-full origin-left bg-black/20" />
              <Check size={15} className="shrink-0 text-accent" /> {pt}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className={`relative z-10 ${flip ? "lg:order-1" : ""}`}>
        <motion.div aria-hidden style={reduce ? undefined : { y: glowY }} className={`pointer-events-none absolute -inset-10 -z-10 rounded-full bg-accent/15 blur-3xl ${flip ? "-translate-x-6" : "translate-x-6"}`} />
        <motion.div style={reduce ? undefined : { y: demoY, rotateX: rotX, scale, opacity: demoO }} className="origin-center [transform-style:preserve-3d]">
          {f.demo}
        </motion.div>
      </div>
    </div>
  );
}

export default function LiveFeatures() {
  return (
    <section id="live" className="relative overflow-hidden bg-[#f4f2e6] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Four innovations</span>
          <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
            <Words>More than a <span className="italic">job board.</span></Words>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">Four powerful innovations. One intelligent recruitment ecosystem.</p>
        </div>
        <div className="mt-28 space-y-40">
          {features.map((f, i) => (
            <FeatureRow key={f.n} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
