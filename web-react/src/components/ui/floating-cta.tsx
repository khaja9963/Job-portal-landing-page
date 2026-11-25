
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Small "Visit the portal" button pinned to the bottom-right corner. It appears once the
 * opening hero is behind you and hides again while the final section is on screen.
 */
export default function FloatingCta() {
  const [past, setPast] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const { scrollY } = useScroll();

  const heroEnd = () => {
    const hero = document.getElementById("top");
    return hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight : window.innerHeight * 3;
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    const n = y > heroEnd();
    setPast((c) => (c === n ? c : n));
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setPast(window.scrollY > heroEnd()));
    const target = document.getElementById("cta");
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting), { threshold: 0.25 });
      io.observe(target);
    }
    return () => {
      cancelAnimationFrame(id);
      io?.disconnect();
    };
  }, []);

  const show = past && !atEnd;
  return (
    <motion.a
      href="#cta"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ pointerEvents: show ? "auto" : "none" }}
      className="group fixed bottom-5 right-5 z-50 inline-flex cursor-pointer items-center gap-3 rounded-full bg-black py-1 pl-5 pr-1 text-sm font-medium text-white shadow-xl shadow-black/25 transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:bottom-6 md:right-6"
    >
      Visit the portal
      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight size={16} />
      </span>
    </motion.a>
  );
}
