"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useHomeData } from "@/contex/HomeDataContext";
import { FiDownload, FiSend, FiZap, FiShield, FiCpu, FiSmartphone } from "react-icons/fi";

function Counter({ value, suffix = "" }) {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, {
    once: true,
    amount: 0.7,
  });

  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    stiffness: 70,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (counterRef.current) {
        counterRef.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });

    return unsubscribe;
  }, [springValue, suffix]);

  return (
    <span ref={counterRef} aria-label={`${value}${suffix}`}>
      0{suffix}
    </span>
  );
}

function LaptopShowcase() {
  return (
    <div className="relative mx-auto h-[290px] w-full max-w-[390px] sm:h-[400px] sm:max-w-[520px] lg:h-[500px] lg:max-w-[590px] xl:h-[535px] xl:max-w-[640px]">
      <div className="pointer-events-none absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.22)_0%,rgba(124,58,237,0.2)_42%,transparent_74%)] blur-[75px] sm:inset-[-5%] sm:blur-[95px]" />

      <motion.div
        whileHover={{
          y: -8,
          scale: 1.01,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 24,
        }}
        className="relative z-10 h-full w-full"
      >
        <img
          src="/laptop-code-3d.png"
          alt="Realistic 3D laptop displaying programming code"
          width="1536"
          height="1024"
          decoding="async"
          className="absolute inset-0 h-full w-full select-none object-contain drop-shadow-[0_28px_55px_rgba(6,182,212,0.24)] sm:drop-shadow-[0_34px_70px_rgba(6,182,212,0.28)]"
          style={{ imageRendering: "auto" }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

function StatCard({ item, index }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="group relative min-h-[142px] overflow-hidden rounded-[22px] border border-cyan-400/30 bg-gradient-to-br from-white/90 via-sky-50/70 to-purple-50/60 p-5 shadow-[0_10px_30px_rgba(6,182,212,0.12)] backdrop-blur-md transition-all duration-300 hover:border-fuchsia-500/50 dark:border-cyan-400/20 dark:from-[#0b172a]/90 dark:via-[#091120]/90 dark:to-[#120e24]/90 dark:shadow-[0_14px_40px_rgba(0,0,0,0.5)] sm:min-h-[160px] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.09] via-transparent to-fuchsia-500/[0.12] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl transition-all duration-300 group-hover:bg-fuchsia-500/25" />

      <div className="relative flex h-full flex-col justify-between">
        <h3 className="bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 bg-clip-text text-4xl font-black leading-none text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.25)] dark:from-cyan-400 dark:via-violet-400 dark:to-fuchsia-400 sm:text-[42px]">
          <Counter value={item.value} suffix={item.suffix} />
        </h3>

        <p className="mt-4 whitespace-pre-line text-sm font-bold leading-5 text-slate-800 dark:text-white/70 sm:text-[15px] sm:leading-6">
          {item.label}
        </p>
      </div>
    </motion.article>
  );
}

export default function AboutMe() {
  const { setting } = useHomeData();

  const stats = [
    {
      value: Number(setting?.aboutExpYears) || 5,
      suffix: "+",
      label: "Years\nExperience",
    },
    {
      value: Number(setting?.aboutProjectsCount) || 20,
      suffix: "+",
      label: "Projects\nCompleted",
    },
    {
      value: Number(setting?.aboutClientsCount) || 15,
      suffix: "+",
      label: "Happy\nClients",
    },
    {
      value: Number(setting?.aboutTechCount) || 15,
      suffix: "+",
      label: "Technologies\nMastered",
    },
  ];

  const highlights = [
    { icon: FiZap, label: "High-Performance Apps", color: "text-amber-500 border-amber-500/30 bg-amber-500/10" },
    { icon: FiShield, label: "Clean Architecture", color: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" },
    { icon: FiCpu, label: "AI & Cloud Integration", color: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10" },
    { icon: FiSmartphone, label: "Mobile & Web Solutions", color: "text-violet-500 border-violet-500/30 bg-violet-500/10" },
  ];

  return (
    <section
      id="about"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-14 text-slate-900 transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[125px] sm:h-[360px] sm:w-[360px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[320px] w-[320px] rounded-full bg-fuchsia-500/10 blur-[135px] sm:h-[400px] sm:w-[400px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-violet-500/20 bg-white/80 p-5 shadow-[0_15px_50px_rgba(168,85,247,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/60 sm:rounded-[32px] sm:p-7 md:p-9 lg:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.1),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.14),transparent_38%)]" />

        <div className="relative mb-6 flex items-center justify-between gap-4 sm:mb-7 lg:mb-6">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-fuchsia-600 dark:text-fuchsia-300 sm:text-sm sm:tracking-[0.25em]">
                {setting?.aboutBadge || "About Me"}
              </p>
            </div>

            <h2 className="text-2xl font-black leading-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
              {setting?.aboutTitle || "Full Stack & AI Engineer"}
            </h2>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/15 via-violet-500/15 to-fuchsia-500/15 px-4 py-2.5 text-sm font-bold text-violet-700 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-xl transition duration-300 hover:border-fuchsia-500/60 dark:text-fuchsia-300 sm:rounded-2xl sm:px-5 sm:py-3 md:px-7"
          >
            <FiSend className="text-base shrink-0" />
            <span className="md:hidden">Contact</span>
            <span className="hidden md:inline">Let’s Connect</span>
          </motion.a>
        </div>

        <div className="relative grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(430px,1.1fr)] lg:gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(520px,1.12fr)] xl:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative z-10"
          >
            <p className="max-w-xl text-[15px] font-medium leading-7 text-slate-700 dark:text-white/70 sm:text-base sm:leading-8 lg:max-w-lg">
              {setting?.aboutBio ||
                "I’m Ahmed Ismail, a Full-Stack & AI Engineer with over 5 years of experience architecting high-performance web platforms, mobile applications, and intelligent digital solutions. I specialize in the modern JavaScript/TypeScript ecosystem—mastering Next.js, MERN stack, cloud infrastructure, and AI integrations to transform complex ideas into scalable, production-ready products."}
            </p>

            {/* Specialization Highlights Pills */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {highlights.map((pill, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm ${pill.color}`}
                >
                  <pill.icon className="text-xs shrink-0" />
                  {pill.label}
                </span>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {setting?.resumeUrl && (
                <a
                  href={setting.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <FiDownload className="text-sm" />
                  Download Resume
                </a>
              )}
            </div>

            {/* Animated Stat Counters */}
            <div className="mt-7 grid grid-cols-2 gap-4 sm:mt-8 sm:gap-5 lg:mt-9">
              {stats.map((item, index) => (
                <StatCard key={item.label} item={item} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative mt-4 w-full lg:mt-6 lg:justify-self-end xl:mt-8"
          >
            <LaptopShowcase />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
