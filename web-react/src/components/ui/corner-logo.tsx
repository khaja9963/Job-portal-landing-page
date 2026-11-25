
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared";

/**
 * Small Clyptus logo in the top-left corner. It stays hidden for the whole opening
 * hero and appears from the next section on. No background: a faint light edge
 * keeps the navy text readable.
 */
export default function CornerLogo() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  // hidden for the whole opening hero; shows once the next section starts
  const crossed = (y: number) => {
    const hero = document.getElementById("top");
    const end = hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight : window.innerHeight * 4;
    return y > end;
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    const n = crossed(y);
    setShow((c) => (c === n ? c : n));
  });
  // also handles a page that reloads already scrolled down
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(crossed(window.scrollY)));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.a
      href="#top"
      aria-label="Clyptus, back to top"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -12 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ pointerEvents: show ? "auto" : "none" }}
      className="fixed left-4 top-4 z-50 inline-flex cursor-pointer items-center md:left-6 md:top-5"
    >
      <Logo className="h-10 [filter:drop-shadow(0_0_1.5px_rgba(255,255,255,0.95))_drop-shadow(0_0_5px_rgba(255,255,255,0.5))]" />
    </motion.a>
  );
}
