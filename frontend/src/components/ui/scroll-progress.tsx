
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin orange line at the very top of the page that fills as you scroll. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
    />
  );
}
