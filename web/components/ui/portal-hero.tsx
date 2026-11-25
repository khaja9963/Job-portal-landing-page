"use client";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const story = [
  "Every night Aarav sat on the hill, sending his resume to one job portal after another.",
  "Then he found Clyptus. New jobs from all over the internet were already waiting, and one click applied to twenty of them.",
  "An AI interviewer asked him questions out loud. For the first time, he got to speak for himself.",
  "A recruiter read his report and sent a message. The call he had waited for finally came.",
];

/**
 * Portal hero. Everything is bound to scroll POSITION (never a timer), so it
 * plays in reverse when the reader scrolls back up. First the portal opens,
 * then the story appears line by line. With reduced motion the hero renders its
 * finished state.
 */
export default function PortalHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const open = useMotionValue(1);
  const p = useSpring(reduce ? open : scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });

  // 1. the portal opens (first ~40% of the scroll)
  const leftX = useTransform(p, [0.02, 0.34], ["0%", "-105%"]);
  const rightX = useTransform(p, [0.02, 0.34], ["0%", "105%"]);
  const imgScale = useTransform(p, [0, 0.4], [1.18, 1]);
  const wash = useTransform(p, [0.06, 0.4], [0, 0.28]);
  // wordmark grows + tightens as one joined word, always fully inside the screen
  const titleScale = useTransform(p, [0, 0.4], [1, 1.12]);
  const tracking = useTransform(p, [0, 0.4], ["-0.02em", "-0.06em"]);
  const titleY = useTransform(p, [0.4, 0.62], ["0vh", "-30vh"]);
  const d1x = useTransform(p, [0.06, 0.4], ["0vw", "-42vw"]);
  const d1y = useTransform(p, [0.06, 0.4], ["0vh", "-36vh"]);
  const d2x = useTransform(p, [0.06, 0.4], ["0vw", "42vw"]);
  const d2y = useTransform(p, [0.06, 0.4], ["0vh", "36vh"]);
  const dotOpacity = useTransform(p, [0, 0.08, 0.4, 0.5], [0, 1, 1, 0]);

  // 2. the story, line by line
  const headO = useTransform(p, [0.44, 0.52], [0, 1]);
  const headY = useTransform(p, [0.44, 0.52], [30, 0]);
  const l1O = useTransform(p, [0.54, 0.6], [0, 1]);
  const l1Y = useTransform(p, [0.54, 0.6], [24, 0]);
  const l2O = useTransform(p, [0.62, 0.68], [0, 1]);
  const l2Y = useTransform(p, [0.62, 0.68], [24, 0]);
  const l3O = useTransform(p, [0.7, 0.76], [0, 1]);
  const l3Y = useTransform(p, [0.7, 0.76], [24, 0]);
  const l4O = useTransform(p, [0.78, 0.84], [0, 1]);
  const l4Y = useTransform(p, [0.78, 0.84], [24, 0]);
  const lines = [
    { o: l1O, y: l1Y },
    { o: l2O, y: l2Y },
    { o: l3O, y: l3Y },
    { o: l4O, y: l4Y },
  ];

  return (
    <section id="top" ref={ref} style={{ height: reduce ? undefined : "400vh" }} className="relative bg-[#0c0c0a]">
      <div className="sticky top-0 isolate h-screen min-h-[600px] w-full overflow-hidden bg-[#0c0c0a]">
        {/* full-bleed image (video) */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0 -z-0 bg-gradient-to-br from-[#2a1206] via-[#140a05] to-black">
          <video autoPlay loop muted playsInline aria-hidden className="h-full w-full object-cover" src={VIDEO} />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.6] mix-blend-overlay" />
        </motion.div>

        {/* duotone wash + veils */}
        <motion.div style={{ opacity: wash }} className="pointer-events-none absolute inset-0 bg-accent mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75" />

        {/* the two panels - start closed, meeting in the middle */}
        <motion.div style={{ x: leftX }} className="absolute inset-y-0 left-0 z-10 w-[52%] bg-[#0c0c0a]" />
        <motion.div style={{ x: rightX }} className="absolute inset-y-0 right-0 z-10 w-[52%] bg-[#0c0c0a]" />

        {/* accent dots */}
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <motion.span style={{ x: d1x, y: d1y, opacity: dotOpacity }} className="absolute h-2.5 w-2.5 rounded-full bg-accent" />
          <motion.span style={{ x: d2x, y: d2y, opacity: dotOpacity }} className="absolute h-2.5 w-2.5 rounded-full bg-primary" />
        </div>

        {/* the wordmark */}
        <motion.div style={{ y: titleY }} className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
          <motion.h1
            aria-label="Clyptus"
            style={{ scale: titleScale, letterSpacing: tracking }}
            className="flex whitespace-nowrap text-[17vw] font-bold leading-none text-primary md:text-[16vw]"
          >
            Clyptus
          </motion.h1>
        </motion.div>

        {/* the story: appears after the portal opens */}
        <div className="absolute inset-x-0 bottom-10 z-40 px-6 md:bottom-14 md:px-10">
          <motion.h2 style={{ opacity: headO, y: headY }} className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-primary md:text-6xl">
            He applied everywhere. <span className="text-accent">Nobody answered.</span>
          </motion.h2>
          <ol className="mt-5 max-w-2xl space-y-2 md:mt-6 md:space-y-2.5">
            {story.map((t, i) => (
              <motion.li key={t} style={{ opacity: lines[i].o, y: lines[i].y }} className="flex gap-4 text-base leading-snug text-primary/85 md:text-xl">
                <span className="mt-1 w-6 shrink-0 text-xs font-semibold tracking-[0.14em] text-accent md:mt-1.5">0{i + 1}</span>
                <span>{t}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
