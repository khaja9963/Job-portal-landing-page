
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Words } from "@/components/shared";

/** Put the live portal addresses here. Until then both tiles scroll to the form below. */
const RECRUITER_URL = "#cta";
const CANDIDATE_URL = "#cta";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

function Door({
  dark, tag, title, points, href, cta, delay, children,
}: {
  dark?: boolean; tag: string; title: ReactNode; points: string[]; href: string; cta: string; delay: number; children: ReactNode;
}) {
  return (
    <motion.div {...rise(delay)}>
      <a
        href={href}
        className={`group relative flex min-h-[500px] flex-col overflow-hidden rounded-[32px] p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-10 ${
          dark ? "bg-[#121210] text-[#e1e0cc]" : "bg-white text-ink shadow-[0_24px_70px_-24px_rgba(18,18,16,0.3)]"
        }`}
      >
        <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-accent" : "text-accent"}`}>{tag}</span>
        <h3 className="font-serif-d mt-3 text-5xl leading-[1.02] md:text-6xl">{title}</h3>
        <ul className="mt-6 space-y-2.5 text-[15px]">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span className={dark ? "text-[#e1e0cc]/80" : "text-muted"}>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">{children}</div>
        <span
          className={`mt-auto inline-flex w-fit items-center gap-3 rounded-full py-1 pl-5 pr-1 pt-1 text-sm font-medium ${
            dark ? "bg-[#e1e0cc] text-ink" : "bg-ink text-white"
          }`}
          style={{ marginTop: "auto" }}
        >
          {cta}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </span>
      </a>
    </motion.div>
  );
}

export default function TwoDoors() {
  return (
    <section id="doors" style={{ fontFamily: "var(--font-geist)" }} className="relative bg-[#e1e0cc] px-5 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span {...rise(0)} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Two sides, one portal</motion.span>
          <h2 className="font-serif-d mt-4 text-5xl leading-[1.05] md:text-7xl">
            <Words>Which door <span className="italic">are you?</span></Words>
          </h2>
          <motion.p {...rise(0.2)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Pick your side and step in.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Door
            dark
            tag="For recruiters"
            title={<>I&apos;m <span className="italic">hiring.</span></>}
            points={[
              "Post jobs with AI-written descriptions",
              "Find candidates by search, job description or voice",
              "Run AI interviews and read scored reports",
            ]}
            href={RECRUITER_URL}
            cta="Enter the recruiter portal"
            delay={0.1}
          >
            <div className="space-y-2">
              {[["Subham", 92], ["Nikitha", 88], ["Monika", 85]].map(([n, v], i) => (
                <div key={n} className="flex items-center gap-3 text-sm">
                  <span className="w-16 text-[#e1e0cc]/80">{n}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                    <motion.span className="block h-full rounded-full bg-accent" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }} />
                  </span>
                  <span className="w-7 text-right tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </Door>

          <Door
            tag="For candidates"
            title={<>I&apos;m looking for <span className="italic">a job.</span></>}
            points={[
              "Build your profile from your resume in minutes",
              "Find new jobs and apply to twenty with one click",
              "Take AI interviews on your own time, any hour",
            ]}
            href={CANDIDATE_URL}
            cta="Enter the candidate portal"
            delay={0.25}
          >
            <div className="space-y-2">
              {["AI Engineer", "Backend Engineer", "Data Engineer"].map((j, i) => (
                <motion.div key={j} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }} className="flex items-center justify-between rounded-xl bg-black/[0.04] px-3.5 py-2.5 text-sm">
                  <span>{j}</span>
                  <span className="flex items-center gap-1.5 text-xs text-muted"><span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white"><Check size={11} /></span>Applied</span>
                </motion.div>
              ))}
            </div>
          </Door>
        </div>
      </div>
    </section>
  );
}
