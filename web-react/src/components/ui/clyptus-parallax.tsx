
import type { CSSProperties, ReactNode } from "react";
import { Bookmark, Bot, Check, Mic, Send } from "lucide-react";
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax";

type Theme = "sand" | "cream" | "white";
const themes: Record<Theme, string> = {
  sand: "bg-[#d3d1b8] text-[#121210]",
  cream: "bg-[#e1e0cc] text-[#121210]",
  white: "bg-white text-[#121210]",
};

/* looping CSS animations (keyframes live in globals.css) */
const anim = (name: string, dur: number, delay = 0): CSSProperties => ({ animation: `${name} ${dur}s ${delay}s infinite both` });
const typing = (dur: number, ch: number, delay = 0): CSSProperties =>
  ({ animation: `tw ${dur}s ${delay}s steps(${ch}) infinite both`, "--w": `${ch}ch` }) as CSSProperties;
const Typed = ({ text, dur = 7, delay = 0, className = "" }: { text: string; dur?: number; delay?: number; className?: string }) => (
  <span className={`inline-block overflow-hidden whitespace-nowrap border-r-2 border-current align-bottom ${className}`} style={typing(dur, text.length, delay)}>{text}</span>
);
const Bar = ({ w, delay = 0, className = "" }: { w: number; delay?: number; className?: string }) => (
  <div className={`h-1.5 overflow-hidden rounded-full bg-current/15 ${className}`}>
    <div className="h-full origin-left rounded-full bg-current/70" style={{ width: `${w}%`, ...anim("growx", 6, delay) }} />
  </div>
);

/* ---------- 15 card visuals: real text, each one animated for what it does ---------- */
const V: Record<string, () => ReactNode> = {
  "AI job posting": () => (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 rounded-xl bg-current/10 px-3 py-2 text-sm"><span className="opacity-55">Title</span><Typed text="Senior React Developer" /></div>
      <div className="flex gap-2">{["React", "TypeScript", "GraphQL"].map((t, i) => <span key={t} className="rounded-full bg-current/15 px-3 py-1 text-xs" style={anim("popin", 7, 2.4 + i * 0.4)}>{t}</span>)}</div>
      <Bar w={92} delay={1} /><Bar w={70} delay={1.3} />
    </div>
  ),
  "AI candidate search": () => (
    <div className="space-y-2">
      {[["Aarav M.", 96], ["Sara K.", 91], ["Neha K.", 88]].map(([n, m], i) => (
        <div key={n} className="flex items-center gap-3 rounded-xl bg-current/10 px-3 py-2 text-sm" style={anim("popin", 7, i * 0.5)}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-current/80 text-[10px] font-semibold text-white">{(n as string)[0]}</span>
          <span className="flex-1">{n}</span>
          <span className="w-16"><Bar w={m as number} delay={i * 0.5 + 0.6} /></span>
          <span className="w-9 text-right font-semibold">{m}%</span>
        </div>
      ))}
    </div>
  ),
  "Voice search": () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-xl bg-current/10 px-3 py-2 text-sm"><Mic size={15} /><Typed text="Senior React developers in Pune" dur={7} /></div>
      <div className="flex h-12 items-center gap-[3px]">
        {Array.from({ length: 36 }).map((_, i) => <span key={i} className="w-[3px] rounded-full bg-current/70" style={{ height: "100%", animation: `bar ${0.6 + ((i * 37) % 60) / 100}s ease-in-out ${(i % 7) * 0.07}s infinite` }} />)}
      </div>
    </div>
  ),
  "Smart insights": () => (
    <div className="flex flex-wrap gap-2">
      {["Has founder experience", "Promoted in current company", "Early startup employee", "Has a portfolio", "Remote", "H1 visa"].map((c, i) => (
        <span key={c} className={`rounded-full px-3 py-1.5 text-xs ${i % 3 === 0 ? "bg-current/85 text-white" : "bg-current/12"}`} style={anim("popin", 7, i * 0.45)}>{c}</span>
      ))}
    </div>
  ),
  "Saved searches": () => (
    <div className="space-y-2">
      {[["TypeScript Node.js Docker", "4:52 PM"], ["fullstack engineer", "4:50 PM"], ["All candidates", "4:49 PM"]].map(([q, t], i) => (
        <div key={q} className="flex items-center gap-3 rounded-xl bg-current/10 px-3 py-2 text-sm" style={anim("popin", 7, i * 0.6)}>
          <Bookmark size={14} className="shrink-0" /><span className="flex-1 truncate">{q}</span><span className="text-xs opacity-55">{t}</span>
        </div>
      ))}
    </div>
  ),
  "Interview campaigns": () => (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 text-center">
        {[["34", "Links"], ["33", "Claimed"], ["5", "Completed"]].map(([a, b], i) => (
          <div key={b} className="rounded-xl bg-current/10 py-2" style={anim("popin", 7, i * 0.4)}><div className="text-2xl font-semibold leading-none">{a}</div><div className="mt-1 text-[11px] opacity-60">{b}</div></div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl bg-current/10 px-3 py-2 text-sm"><span>AI Engineer · 20 min</span><span className="flex items-center gap-1.5 text-xs"><span className="h-2 w-2 animate-pulse rounded-full bg-current" /> Active</span></div>
    </div>
  ),
  "Live AI interview": () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-current/85 text-white"><Bot size={22} /><span className="absolute inset-0 animate-ping rounded-xl border border-current/50" /></span>
        <span className="text-sm leading-snug"><Typed text="How would you evaluate a model?" dur={7} /></span>
      </div>
      <div className="flex h-10 items-center gap-[3px]">
        {Array.from({ length: 34 }).map((_, i) => <span key={i} className="w-[3px] rounded-full bg-current/70" style={{ height: "100%", animation: `bar ${0.6 + ((i * 37) % 60) / 100}s ease-in-out ${(i % 7) * 0.07}s infinite` }} />)}
      </div>
    </div>
  ),
  "Scored reports": () => (
    <div className="flex items-center gap-5">
      <div className="relative grid h-24 w-24 shrink-0 place-items-center">
        <svg width="96" height="96" className="-rotate-90"><circle cx="48" cy="48" r="40" stroke="currentColor" strokeOpacity=".15" strokeWidth="8" fill="none" /><circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="251" style={{ ...anim("ringdraw", 6), "--c": "251", "--o": "30" } as CSSProperties} /></svg>
        <span className="absolute text-2xl font-semibold">88</span>
      </div>
      <div className="flex-1 space-y-2.5 text-xs">
        {[["Technical", 88], ["Communication", 92], ["Role fit", 85]].map(([l, v], i) => <div key={l}><div className="mb-1 flex justify-between"><span>{l}</span><span>{v}</span></div><Bar w={v as number} delay={i * 0.3} /></div>)}
      </div>
    </div>
  ),
  "Full transcripts": () => (
    <div className="space-y-2 text-[13px] leading-snug">
      {[["AI", "Walk me through your approach."], ["You", "I start by framing the problem and the metric."], ["AI", "How would you test it?"]].map(([w, t], i) => (
        <div key={t} className="flex gap-2" style={anim("popin", 7, i * 0.9)}><span className="w-8 shrink-0 text-[11px] font-semibold uppercase opacity-55">{w}</span><span>{t}</span></div>
      ))}
    </div>
  ),
  "Attention signals": () => (
    <div>
      <div className="flex h-14 items-end gap-[3px]">
        {Array.from({ length: 34 }).map((_, i) => <span key={i} className={`flex-1 origin-bottom rounded-sm ${i === 12 || i === 24 ? "bg-current/30" : "bg-current/75"}`} style={{ height: `${55 + ((i * 29) % 45)}%`, ...anim("bar", 3 + (i % 5) * 0.4, (i % 6) * 0.1) }} />)}
      </div>
      <div className="mt-2 flex justify-between text-xs opacity-65"><span>2 brief look-aways</span><span>0 tab switches</span></div>
    </div>
  ),
  "Hiring pipeline": () => (
    <div>
      <div className="flex items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <span className="h-4 w-4 shrink-0 rounded-full bg-current" style={anim("popin", 7, i * 0.55)} />
            {i < 5 && <span className="h-0.5 flex-1 origin-left bg-current/60" style={anim("growx", 7, i * 0.55 + 0.3)} />}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] opacity-65">{["Applied", "Screen", "Short", "Interview", "Offer", "Hired"].map((s) => <span key={s}>{s}</span>)}</div>
    </div>
  ),
  "Offers & folders": () => (
    <div className="space-y-2 text-sm">
      {[["Offer · Aarav Mehta", "Awaiting approval"], ["Folder · Shortlist", "4 candidates"], ["Offer · Sara Khan", "Sent"]].map(([a, b], i) => (
        <div key={a} className="flex items-center justify-between rounded-xl bg-current/10 px-3 py-2" style={anim("popin", 7, i * 0.6)}><span>{a}</span><span className="text-xs opacity-60">{b}</span></div>
      ))}
    </div>
  ),
  "Recruiter messaging": () => (
    <div className="space-y-2 text-[13px]">
      <div className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-current/12 px-3 py-2" style={anim("popin", 8, 0)}>Impressed with your profile!</div>
      <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-current/85 px-3 py-2 text-white" style={anim("popin", 8, 1.6)}>Thank you, happy to chat.</div>
      <div className="flex items-center gap-2 pt-0.5" style={anim("popin", 8, 3.2)}><span className="flex gap-1 rounded-2xl bg-current/12 px-3 py-2">{[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-current/60" style={{ animationDelay: `${d * 0.15}s` }} />)}</span><Send size={13} className="opacity-50" /></div>
    </div>
  ),
  "Token wallet": () => (
    <div className="flex items-end justify-between">
      <div><div className="text-5xl font-semibold leading-none tracking-tight">6,748</div><div className="mt-1 text-xs opacity-60">org token balance</div></div>
      <div className="space-y-1.5 text-right text-xs">
        {[["AI match", "−5"], ["Message", "−2"], ["Replies", "Free"]].map(([a, b], i) => <div key={a} className="rounded-full bg-current/12 px-3 py-1" style={anim("popin", 7, i * 0.7)}>{a} <b>{b}</b></div>)}
      </div>
    </div>
  ),
  "Team roles": () => (
    <div className="space-y-2 text-sm">
      {[["Admin", "Everything"], ["Recruiter", "Jobs, search, interviews"], ["Hiring manager", "Scorecards, offers"]].map(([a, b], i) => (
        <div key={a} className="flex items-center gap-3 rounded-xl bg-current/10 px-3 py-2">
          <span className="flex-1"><span className="font-medium">{a}</span> <span className="text-xs opacity-55">{b}</span></span>
          <span className="flex h-5 w-9 items-center rounded-full bg-current/20 p-0.5"><span className="h-4 w-4 rounded-full bg-current" style={anim("knob", 6, i * 0.8)} /></span>
          <Check size={13} className="opacity-60" />
        </div>
      ))}
    </div>
  ),
};

const defs: [string, string, Theme, string][] = [
  ["AI job posting", "Recruiter", "cream", "Type a title. AI drafts the description and skills."],
  ["AI candidate search", "Recruiter", "sand", "Rank people by how well they match your role."],
  ["Voice search", "Recruiter", "white", "Just say who you need and the search runs."],
  ["Smart insights", "Recruiter", "white", "One-tap filters like founder experience."],
  ["Saved searches", "Recruiter", "cream", "Re-run your best searches in a click."],

  ["Interview campaigns", "AI interviews", "sand", "One shareable link per job, tracked end to end."],
  ["Live AI interview", "AI interviews", "cream", "The AI asks out loud. Candidates answer by voice."],
  ["Scored reports", "AI interviews", "white", "Every interview ends in a clear score."],
  ["Full transcripts", "AI interviews", "white", "Read every question and answer, word for word."],
  ["Attention signals", "AI interviews", "sand", "See look-aways and tab switches on a timeline."],

  ["Hiring pipeline", "Pipeline", "cream", "Applied to hired, across seven stages."],
  ["Offers & folders", "Pipeline", "white", "Keep offers and shortlists organised."],
  ["Recruiter messaging", "Messaging", "sand", "Message candidates right inside the portal."],
  ["Token wallet", "Billing", "white", "Pay per use from one shared balance."],
  ["Team roles", "Team", "cream", "Give each person exactly the access they need."],
];

function Tile({ title, tag, theme, desc }: { title: string; tag: string; theme: Theme; desc: string }) {
  return (
    <div className={`flex h-full w-full flex-col p-7 ${themes[theme]}`}>
      <span className="text-[11px] font-semibold uppercase tracking-widest opacity-55">{tag}</span>
      <h3 className="mt-1.5 text-[1.7rem] font-semibold leading-tight tracking-tight">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-snug opacity-65">{desc}</p>
      <div className="mt-auto pt-3">{V[title]()}</div>
    </div>
  );
}

const products: ParallaxProduct[] = defs.map(([title, tag, theme, desc]) => ({
  title,
  link: "#features",
  visual: <Tile title={title} tag={tag} theme={theme} desc={desc} />,
}));

function TourHeader() {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">Platform tour</span>
      <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-ink md:text-7xl">
        One workspace. <br /> Every step of hiring.
      </h2>
      <p className="mt-8 max-w-2xl text-base text-muted md:text-xl">
        From the first job post to the signed offer, search, interviews, reports, pipeline, messaging and billing live
        in a single place, with AI doing the heavy lifting.
      </p>
    </div>
  );
}

export default function ClyptusParallax() {
  return (
    <section id="tour" className="bg-[#f4f2e6]">
      <HeroParallax products={products} header={<TourHeader />} />
    </section>
  );
}
