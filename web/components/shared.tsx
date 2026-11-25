"use client";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { Fragment, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode, type MouseEvent } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


/** Splits text into per-word spans that rise 0.4em on a 38ms stagger. Fires once. */
export function Words({ children, step = 0.038, className = "" }: { children: ReactNode; step?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  let n = 0;
  const walk = (node: ReactNode, cls: string): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node)
        .split(/(\s+)/)
        .map((w, k) =>
          w === "" || /^\s+$/.test(w) ? (
            w
          ) : (
            <motion.span
              key={k}
              className={`inline-block ${cls}`}
              initial={reduce ? false : { y: "0.4em", opacity: 0 }}
              animate={inView || reduce ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: n++ * step, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
            </motion.span>
          )
        );
    }
    if (Array.isArray(node)) return node.map((c, k) => <Fragment key={k}>{walk(c, cls)}</Fragment>);
    if (isValidElement(node)) {
      const el = node as ReactElement<{ children?: ReactNode; className?: string }>;
      if (el.type === "br") return el;
      if (el.type === Fragment) return walk(el.props.children, cls);
      return walk(el.props.children, `${cls} ${el.props.className ?? ""}`);
    }
    return node;
  };
  return (
    <span ref={ref} className={className}>
      {walk(children, "")}
    </span>
  );
}


const fadeRise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

/** Editorial section head: fade-and-rise entrance, staggered 0 / 0.2s / 0.4s. */
export function EditorialHead({
  eyebrow,
  title,
  sub,
  cta,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  cta?: ReactNode;
  center?: boolean;
}) {
  const reduce = useReducedMotion();
  const r = (d: number) => (reduce ? {} : fadeRise(d));
  return (
    <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-2xl"}>
      <motion.span {...r(0)} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {eyebrow}
      </motion.span>
      <motion.h2 {...r(0)} className="font-editorial mt-6 text-[2.9rem] leading-[0.95] text-[#0f172a] md:text-[5rem]">
        {title}
      </motion.h2>
      {sub && (
        <motion.p {...r(0.2)} className={`mt-7 max-w-[670px] text-lg leading-[1.625] text-[hsl(215,25%,32%)] ${center ? "mx-auto" : ""}`}>
          {sub}
        </motion.p>
      )}
      {cta && <motion.div {...r(0.4)} className={`mt-10 flex ${center ? "justify-center" : ""}`}>{cta}</motion.div>}
    </div>
  );
}

/** Black pill button, white text, subtle scale on hover. */
export function PillButton({ href, children, large = false }: { href: string; children: ReactNode; large?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full bg-black font-medium text-white transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        large ? "px-14 py-5 text-base" : "px-6 py-2.5 text-sm"
      }`}
    >
      {children}
    </a>
  );
}

export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={onMove} className={`card-glow glass rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = true,
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${tone === "dark" ? "bg-white/20 text-white" : "bg-white text-accent shadow-sm"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${tone === "dark" ? "bg-white" : "bg-accent"}`} /> {eyebrow}
      </span>
      <h2 className={`font-display mt-5 text-4xl font-bold leading-[1.05] md:text-6xl ${tone === "dark" ? "text-white" : "text-ink"}`}><Words>{title}</Words></h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${tone === "dark" ? "text-white/85" : "text-muted"}`}>{sub}</p>}
    </Reveal>
  );
}

export function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 }); // replays every time it scrolls into view
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => {
      c.stop();
      setV(0);
    };
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

export function Logo({ className = "h-9" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.png" alt="Clyptus" className={`${className} w-auto`} />;
}

export const CTA_HREF = "#cta";
