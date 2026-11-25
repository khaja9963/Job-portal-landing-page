
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

type Job = { title: string; company: string; city: string; source: string; ago: string };

// Sample data for illustration only.
const jobs: Job[] = [
  { title: "Backend Engineer", company: "Northwind Labs", city: "Bengaluru", source: "Career page", ago: "2 min ago" },
  { title: "AI Engineer", company: "Acme Corp", city: "Hyderabad", source: "Job board", ago: "5 min ago" },
  { title: "Frontend Developer", company: "Bluepeak", city: "Pune", source: "Aggregator", ago: "8 min ago" },
  { title: "Data Analyst", company: "Orbit Retail", city: "Chennai", source: "Job board", ago: "11 min ago" },
  { title: "DevOps Engineer", company: "Cloudline", city: "Remote", source: "Career page", ago: "14 min ago" },
  { title: "Product Designer", company: "Lumen", city: "Mumbai", source: "Job board", ago: "17 min ago" },
  { title: "QA Engineer", company: "Fintrail", city: "Noida", source: "Aggregator", ago: "21 min ago" },
  { title: "Full-stack Developer", company: "Kitepay", city: "Bengaluru", source: "Career page", ago: "26 min ago" },
  { title: "ML Engineer", company: "Helio", city: "Hyderabad", source: "Job board", ago: "31 min ago" },
  { title: "Data Engineer", company: "Stackwell", city: "Pune", source: "Aggregator", ago: "36 min ago" },
];

function JobCard({ j }: { j: Job }) {
  return (
    <div className="flex w-[300px] shrink-0 items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_10px_30px_-14px_rgba(18,18,16,0.25)]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ecead8] text-sm font-semibold">{j.company[0]}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold">{j.title}</span>
          <span className="shrink-0 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">New</span>
        </span>
        <span className="block truncate text-xs text-muted">{j.company} · {j.city}</span>
        <span className="mt-0.5 block text-[11px] text-ink/45">{j.source} · {j.ago}</span>
      </span>
    </div>
  );
}

export default function JobsTicker() {
  const row = [...jobs, ...jobs];
  return (
    <section id="ticker" style={{ fontFamily: "var(--font-geist)" }} className="relative overflow-hidden bg-[#e1e0cc] py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto mb-5 flex max-w-6xl items-center justify-between gap-4 px-5 md:px-10"
      >
        <span className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/70">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <Globe size={14} /> Live · New jobs from our crawler
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-ink/45">Sample data</span>
      </motion.div>

      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
        <div className="marquee flex w-max gap-4 px-2 py-2 hover:[animation-play-state:paused] motion-reduce:animate-none" style={{ animationDuration: "55s" }}>
          {row.map((j, i) => (
            <JobCard key={i} j={j} />
          ))}
        </div>
      </div>
    </section>
  );
}
