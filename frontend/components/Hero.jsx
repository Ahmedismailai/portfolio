"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useHomeData } from "@/contex/HomeDataContext";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { FiDownload, FiArrowRight, FiArrowUpRight, FiCode, FiStar } from "react-icons/fi";

function OrbitLines() {
  return (
    <div className="hero-orbit-svg pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      <svg viewBox="0 0 900 560" className="w-[950px] max-w-none -rotate-6">
        <defs>
          <linearGradient id="orbitStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="65%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          id="orbitPath1"
          d="M70 350 C180 120, 500 40, 780 145 C915 200, 795 340, 600 410 C360 495, 110 455, 70 350Z"
          fill="none"
          stroke="url(#orbitStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#strongGlow)"
          className="snake-line snake-line-main"
        />

        <path
          id="orbitPath2"
          d="M95 260 C260 390, 560 420, 830 250 C720 165, 430 145, 200 210 C120 235, 90 250, 95 260Z"
          fill="none"
          stroke="url(#orbitStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#strongGlow)"
          className="snake-line snake-line-soft"
        />

        <circle r="6" fill="#38bdf8" filter="url(#strongGlow)">
          <animateMotion dur="5s" repeatCount="indefinite">
            <mpath href="#orbitPath1" />
          </animateMotion>
        </circle>

        <circle r="5" fill="#ec4899" filter="url(#strongGlow)">
          <animateMotion dur="7s" repeatCount="indefinite">
            <mpath href="#orbitPath2" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
}

const heroStars = [
  [6, 18, 1, 0], [12, 47, 2, 4], [19, 28, 1, 7], [27, 78, 2, 2],
  [34, 13, 1, 6], [42, 57, 2, 1], [49, 22, 1, 8], [58, 84, 2, 3],
  [64, 15, 1, 5], [71, 43, 2, 0], [78, 72, 1, 4], [84, 24, 2, 7],
  [91, 58, 1, 2], [96, 31, 2, 6], [4, 76, 1, 5], [55, 6, 1, 1],
];

function HeroConnectionLines() {
  return (
    <svg aria-hidden="true" viewBox="0 0 600 660" className="hero-connection-lines pointer-events-none absolute inset-0 z-10 h-full w-full">
      <path d="M2 165 C104 165 116 200 182 243" />
      <path d="M598 207 C510 207 486 232 425 270" />
      <path d="M2 500 C106 500 126 466 187 426" />
      <path d="M598 532 C506 532 486 496 432 452" />
      <circle cx="182" cy="243" r="3" />
      <circle cx="425" cy="270" r="3" />
      <circle cx="187" cy="426" r="3" />
      <circle cx="432" cy="452" r="3" />
    </svg>
  );
}

function moveHeroParallax(event) {
  if (event.pointerType && event.pointerType !== "mouse") return;

  const visual = event.currentTarget;
  const bounds = visual.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5).toFixed(3);
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5).toFixed(3);
  visual.style.setProperty("--hero-pointer-x", x);
  visual.style.setProperty("--hero-pointer-y", y);
}

function resetHeroParallax(event) {
  event.currentTarget.style.setProperty("--hero-pointer-x", "0");
  event.currentTarget.style.setProperty("--hero-pointer-y", "0");
}

export default function Hero() {
  const { data } = useHomeData();
  const setting = data.setting;

  const socialLinks = [
    { icon: FaGithub, href: setting?.socialLinks?.github || "#" },
    { icon: FaLinkedinIn, href: setting?.socialLinks?.linkedin || "#" },
    { icon: FaTwitter, href: setting?.socialLinks?.twitter || "#" },
    { icon: FaInstagram, href: setting?.socialLinks?.instagram || "#" },
    {
      icon: FaEnvelope,
      href: setting?.email ? `mailto:${setting.email}` : "#",
    },
  ];

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden bg-white/70 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div aria-hidden="true" className="hero-galaxy-stars absolute inset-0 z-[1]">
        {heroStars.map(([left, top, size, delay], index) => (
          <span key={index} style={{ "--hero-star-left": `${left}%`, "--hero-star-top": `${top}%`, "--hero-star-size": `${size}px`, "--hero-star-delay": `-${delay}s` }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_75%_35%,rgba(88,28,135,0.45),transparent_35%),radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.18),transparent_30%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),#ffffff)] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),#030712)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-5 pt-20 sm:gap-10 sm:px-6 sm:pt-32 lg:grid-cols-2 lg:pt-24">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <div className="hero-eyebrow mb-4 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/45 px-4 py-2.5 shadow-[0_8px_30px_rgba(76,29,149,0.08)] backdrop-blur-xl dark:border-violet-400/25 dark:bg-white/[0.045] sm:mb-7">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-black/65 dark:text-white/70">
              {setting?.heroEyebrow || "Available for selected work"}
            </span>
          </div>

          <h1 className="max-w-3xl text-[44px] font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl sm:leading-[0.98] sm:tracking-[-0.055em] lg:text-7xl">
            <span className="mb-1 block text-2xl font-extrabold tracking-tight sm:mb-0 sm:inline-block sm:text-6xl lg:text-7xl">
              {setting?.heroGreeting || "Hi, I’m"}
            </span>
            <br className="hidden sm:inline" />
            <span className="hero-name-gradient bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 bg-clip-text text-transparent sm:ml-0">
              {setting?.heroName || "Ahmed Ismail"}
            </span>
          </h1>

          <h2 className="mt-5 text-lg font-bold tracking-[-0.025em] sm:mt-6 sm:text-2xl">
            <span>
              {setting?.heroTitle ? (
                setting.heroTitle.includes("|") ? (
                  <>
                    {setting.heroTitle.split("|")[0].trim()}{" "}
                    <span className="mx-2 inline-block font-black text-2xl sm:text-3xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(217,70,239,0.95)] animate-pulse">
                      |
                    </span>{" "}
                    {setting.heroTitle.split("|").slice(1).join("|").trim()}
                  </>
                ) : (
                  setting.heroTitle
                )
              ) : (
                <>
                  Full Stack Developer{" "}
                  <span className="mx-2 inline-block font-black text-2xl sm:text-3xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(217,70,239,0.95)] animate-pulse">
                    |
                  </span>{" "}
                  Web, Mobile & AI Solutions
                </>
              )}
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-black/65 dark:text-white/65">
            {setting?.heroDescription ||
              "Engineering high-performance web platforms, mobile apps, and AI-driven solutions that turn ideas into scalable digital products."}
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row">
            <a
              href={setting?.resumeUrl || "#contact"}
              {...(setting?.resumeUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-9 py-4 font-bold text-white shadow-[0_16px_40px_rgba(168,85,247,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(168,85,247,0.5)]"
            >
              {setting?.resumeUrl ? "Download CV" : "Request CV"} <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="group flex items-center justify-center gap-3 rounded-2xl border border-black/15 bg-white/50 px-9 py-4 font-bold backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-500/35 hover:bg-white/80 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
            >
              {setting?.heroSecondaryCtaText || "Hire Me"} <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-semibold text-black/60 dark:text-white/60">
            {["Fast by design", "Accessible by default", "Built to scale"].map((item) => (
              <span key={item} className="rounded-full border border-black/10 bg-white/40 px-3.5 py-2 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.035]">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex gap-4">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target={href.startsWith("mailto:") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ y: -7, scale: 1.08 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          onPointerMove={moveHeroParallax}
          onPointerLeave={resetHeroParallax}
          className="hero-visual relative flex min-h-[580px] items-center justify-center xl:min-h-[610px]"
        >
          <HeroConnectionLines />
          <div className="hero-orbit-container">
            <OrbitLines />
          </div>

          <div className="hero-visual-halo pointer-events-none absolute h-[430px] w-[430px] rounded-full" />
          <div className="hero-orbit-ring pointer-events-none absolute h-[450px] w-[450px] rounded-full border border-cyan-400/15" />
          <div className="hero-orbit-ring hero-orbit-ring-offset pointer-events-none absolute h-[520px] w-[520px] rounded-full border border-fuchsia-400/10" />

          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 translate-y-8 sm:translate-y-"
          >
            <div className="hero-portrait">
              <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-[120px] dark:bg-violet-600/30" />

              <Image
                src={setting?.heroImage?.url || setting?.logo?.url || "/hero.png"}
                alt={setting?.heroName || "Portfolio Hero"}
                width={520}
                height={520}
                priority
                sizes="(max-width: 768px) 345px, (max-width: 1280px) 375px, 405px"
                className="relative z-10 w-[345px] object-contain drop-shadow-[0_34px_62px_rgba(76,29,149,0.34)] xl:w-[375px] 2xl:w-[405px]"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -9, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="hero-float-card hero-float-card-left hero-card-top-left absolute -left-10 top-20 z-20 w-44 rounded-2xl border border-cyan-400/70 bg-gradient-to-br from-cyan-50/95 via-white/95 to-sky-100/90 p-4 shadow-[0_12px_35px_rgba(6,182,212,0.22)] backdrop-blur-xl dark:border-cyan-400/40 dark:from-[#081b2e]/95 dark:via-[#081322]/95 dark:to-[#0a2238]/95 dark:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
          >
            <span className="hero-card-corner hero-card-corner-tl" />
            <span className="hero-card-corner hero-card-corner-br" />
            <div className="hero-card-scanline" />
            <div className="mb-2 flex items-center justify-between">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-600 shadow-sm dark:bg-cyan-400/20 dark:text-cyan-300">
                <FiCode className="text-base shrink-0" />
              </div>
              <span className="flex items-center gap-1.5"><span className="hero-status-dot" /><FiArrowUpRight className="text-base shrink-0 text-cyan-600 dark:text-cyan-300" /></span>
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">{setting?.heroCards?.card1Subtitle || "Focus"}</p>
            <p className="mt-0.5 text-xs font-black leading-5 text-slate-900 dark:text-white">{setting?.heroCards?.card1Title || "Thoughtful interfaces"}</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 11, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="hero-float-card hero-float-card-right hero-card-top-right absolute right-0 top-28 z-20 w-48 rounded-2xl border border-violet-400/70 bg-gradient-to-br from-violet-50/95 via-white/95 to-fuchsia-100/90 p-4 shadow-[0_12px_35px_rgba(139,92,246,0.22)] backdrop-blur-xl dark:border-violet-400/40 dark:from-[#140c2a]/95 dark:via-[#081322]/95 dark:to-[#1f0b2e]/95 dark:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
          >
            <span className="hero-card-corner hero-card-corner-tr" />
            <span className="hero-card-corner hero-card-corner-bl" />
            <div className="hero-card-scanline" />
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/30"><FiStar className="text-base shrink-0" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-slate-900 dark:text-white">{setting?.heroCards?.card2Title || "Detail matters"}</p>
                <p className="truncate text-[10px] font-bold text-violet-700 dark:text-violet-300">{setting?.heroCards?.card2Subtitle || "From concept to launch"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="hero-float-card hero-card-bottom-left absolute -left-10 bottom-16 z-20 w-48 items-center gap-3 rounded-2xl border border-blue-400/70 bg-gradient-to-br from-blue-50/95 via-white/95 to-indigo-100/90 p-4 shadow-[0_12px_35px_rgba(37,99,235,0.22)] backdrop-blur-xl dark:border-blue-400/40 dark:from-[#0b162e]/95 dark:via-[#081322]/95 dark:to-[#0f1433]/95 dark:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
          >
            <span className="hero-card-corner hero-card-corner-tl" />
            <span className="hero-card-corner hero-card-corner-br" />
            <div className="hero-card-scanline" />
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30">
              <SiTypescript className="text-base shrink-0" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-black text-slate-900 dark:text-white">{setting?.heroCards?.card3Title || "Clean engineering"}</p>
              <p className="truncate text-[10px] font-bold text-blue-700 dark:text-blue-300">{setting?.heroCards?.card3Subtitle || "Robust Stack"}</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6.1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="hero-float-card hero-card-bottom-right absolute bottom-14 right-0 z-20 w-48 rounded-2xl border border-emerald-400/70 bg-gradient-to-br from-emerald-50/95 via-white/95 to-teal-100/90 p-4 shadow-[0_12px_35px_rgba(16,185,129,0.22)] backdrop-blur-xl dark:border-emerald-400/40 dark:from-[#08221b]/95 dark:via-[#081322]/95 dark:to-[#092922]/95 dark:shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
          >
            <span className="hero-card-corner hero-card-corner-tr" />
            <span className="hero-card-corner hero-card-corner-bl" />
            <div className="hero-card-scanline" />
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-md shadow-emerald-500/30"><FiStar className="text-base shrink-0" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-slate-900 dark:text-white">{setting?.heroCards?.card4Title || "Built for impact"}</p>
                <p className="truncate text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{setting?.heroCards?.card4Subtitle || "Fast, polished, scalable"}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
