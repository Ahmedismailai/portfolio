"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import ThemeToggle from "@/components/ThemeToggle";
import { useHomeData } from "@/contex/HomeDataContext";

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Services",
  "Contact",
];

export default function Navbar() {
  const { data } = useHomeData();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;
      setScrolled((current) => {
        const next = window.scrollY > 20;
        return current === next ? current : next;
      });

      let current = "home";

      navItems.forEach((item) => {
        const id = item.toLowerCase();
        const section = document.getElementById(id);

        if (!section) return;

        const sectionTop = section.offsetTop - 140;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          current = id;
        }
      });

      setActive((activeItem) => (activeItem === current ? activeItem : current));
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (id) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <>
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-black/10 bg-white/80 shadow-[0_10px_40px_rgba(168,85,247,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#030712]/80"
          : "border-black/5 bg-white/55 backdrop-blur-xl dark:border-white/10 dark:bg-[#030712]/65"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <a
          href="#home"
          onClick={() => handleNavClick("home")}
          className="group flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-fuchsia-500/20 opacity-0 blur-xl transition group-hover:opacity-100" />

            <Image
              src="/IMG_20260518_131508.png"
              alt="Logo"
              width={64}
              height={64}
              priority
              className={`relative rounded-2xl object-contain drop-shadow-[0_0_22px_rgba(168,85,247,0.35)] transition-all duration-300 ${
                scrolled ? "h-12 w-12" : "h-14 w-14 sm:h-16 sm:w-16"
              }`}
            />
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-black/65 dark:text-white/70 lg:flex">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;

            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={() => handleNavClick(id)}
                className={`relative transition hover:text-fuchsia-500 dark:hover:text-fuchsia-300 ${
                  isActive ? "text-fuchsia-500 dark:text-white" : ""
                }`}
              >
                {item}

                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_18px_#a855f7]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />

          <motion.a
            href={data.setting?.socialLinks?.github || "#contact"}
            {...(data.setting?.socialLinks?.github
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 rounded-2xl border border-fuchsia-500/25 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-6 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.14)] backdrop-blur-xl transition hover:border-fuchsia-500/45 dark:text-fuchsia-300"
          >
            <FaGithub />
            GitHub
          </motion.a>

          <motion.a
            href="#contact"
            onClick={() => handleNavClick("contact")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.35)]"
          >
            Let’s Talk
          </motion.a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-black backdrop-blur-xl transition hover:border-fuchsia-500/35 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {open ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto h-full w-[85%] max-w-sm overflow-hidden border-l border-black/10 bg-white/95 p-7 shadow-[0_0_80px_rgba(168,85,247,0.18)] dark:border-violet-500/20 dark:bg-[#050816]/95"
            >
              <div className="absolute right-0 top-0 h-[250px] w-[250px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-[100px]" />

              <div className="relative mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/IMG_20260518_131508.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-xl object-contain drop-shadow-[0_0_22px_rgba(168,85,247,0.35)]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-black transition hover:border-fuchsia-500/35 dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  <HiX className="text-2xl" />
                </button>
              </div>

              <nav className="relative space-y-4">
                {navItems.map((item, i) => {
                  const id = item.toLowerCase();
                  const isActive = active === id;

                  return (
                    <motion.a
                      key={item}
                      href={`#${id}`}
                      onClick={() => handleNavClick(id)}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`block rounded-2xl border px-5 py-4 text-lg font-semibold transition ${
                        isActive
                          ? "border-fuchsia-500/35 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 text-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.16)] dark:text-white"
                          : "border-black/10 bg-black/5 text-black/70 hover:text-fuchsia-500 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:text-white"
                      }`}
                    >
                      {item}
                    </motion.a>
                  );
                })}
              </nav>

              <motion.a
                href="#contact"
                onClick={() => handleNavClick("contact")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative mt-10 flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-[0_0_35px_rgba(168,85,247,0.35)]"
              >
                Let’s Talk
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
