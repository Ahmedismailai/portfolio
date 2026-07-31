"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useHomeData } from "@/contex/HomeDataContext";

import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiPostgresql,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { RiOpenaiFill } from "react-icons/ri";
import { FiServer, FiCpu, FiCode } from "react-icons/fi";

const fallbackSkills = [
  { name: "JavaScript", category: "Programming", percent: 98, icon: SiJavascript, bg: "from-yellow-300 to-yellow-500", iconColor: "text-black" },
  { name: "TypeScript", category: "Programming", percent: 95, icon: SiTypescript, bg: "from-blue-400 to-blue-600", iconColor: "text-white" },
  { name: "React", category: "Frontend", percent: 98, icon: SiReact, bg: "from-cyan-300 to-cyan-500", iconColor: "text-black" },
  { name: "Next.js", category: "Full-Stack", percent: 96, icon: SiNextdotjs, bg: "from-slate-700 to-slate-950", iconColor: "text-white" },
  { name: "React Native", category: "Mobile", percent: 94, icon: TbBrandReactNative, bg: "from-cyan-400 to-sky-600", iconColor: "text-white" },
  { name: "Node.js", category: "Backend", percent: 95, icon: SiNodedotjs, bg: "from-green-300 to-green-500", iconColor: "text-black" },
  { name: "Express.js", category: "Backend", percent: 94, icon: SiExpress, bg: "from-gray-400 to-gray-700", iconColor: "text-white" },
  { name: "Python", category: "Backend / AI", percent: 92, icon: SiPython, bg: "from-yellow-400 to-amber-600", iconColor: "text-white" },
  { name: "MongoDB", category: "Database", percent: 95, icon: SiMongodb, bg: "from-green-400 to-emerald-700", iconColor: "text-white" },
  { name: "PostgreSQL", category: "Database", percent: 91, icon: SiPostgresql, bg: "from-sky-400 to-blue-700", iconColor: "text-white" },
  { name: "Tailwind CSS", category: "UI Framework", percent: 97, icon: SiTailwindcss, bg: "from-cyan-300 to-sky-600", iconColor: "text-white" },
  { name: "Redux Toolkit", category: "State Management", percent: 93, icon: SiRedux, bg: "from-violet-400 to-violet-700", iconColor: "text-white" },
  { name: "Docker", category: "DevOps", percent: 91, icon: SiDocker, bg: "from-blue-500 to-cyan-600", iconColor: "text-white" },
  { name: "Git & GitHub", category: "Version Control", percent: 96, icon: SiGithub, bg: "from-slate-800 to-black", iconColor: "text-white" },
  { name: "REST API", category: "API Development", percent: 97, icon: FiServer, bg: "from-emerald-500 to-teal-700", iconColor: "text-white" },
  { name: "AI Integration", category: "Artificial Intelligence", percent: 92, icon: RiOpenaiFill, bg: "from-purple-500 to-fuchsia-600", iconColor: "text-white" },
];

const iconByName = {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiPostgresql,
  SiTailwindcss,
  SiPython,
  SiDocker,
  SiGithub,
  SiPostman,
  TbBrandReactNative,
  RiOpenaiFill,
  FiServer,
  FiCpu,
  FiCode,
};

const palettes = [
  ["from-yellow-300 to-yellow-500", "text-black"],
  ["from-cyan-300 to-cyan-500", "text-black"],
  ["from-green-300 to-green-500", "text-black"],
  ["from-blue-400 to-blue-600", "text-white"],
  ["from-violet-500 to-fuchsia-600", "text-white"],
];

export default function Skills() {
  const { data } = useHomeData();
  const skills = Array.isArray(data.skills) && data.skills.length
    ? data.skills.map((skill, index) => {
        const [bg, iconColor] = palettes[index % palettes.length];
        return { ...skill, icon: iconByName[skill.icon] || SiJavascript, bg, iconColor };
      })
    : fallbackSkills;
  return (
    <section
      id="skills"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-14 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_45px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/55 sm:p-8 md:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />

        <div className="relative mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Skills
              </p>
            </div>

            <h2 className="text-3xl font-black text-black dark:text-white sm:text-4xl">
              My Skills
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/skills"
              className="inline-flex items-center justify-center rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-4 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.12)] backdrop-blur-xl transition duration-300 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] dark:text-fuchsia-300 sm:px-5"
            >
              <span className="sm:hidden">View All</span>
              <span className="hidden sm:inline">View All Skills</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative grid gap-5 md:grid-cols-2">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const percent = Math.min(
              100,
              Math.max(0, Number(skill.percent) || 0),
            );

            return (
              <motion.article
                key={skill.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/65 p-5 shadow-sm transition-all duration-300 hover:border-fuchsia-500/25 hover:shadow-[0_18px_50px_rgba(168,85,247,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-fuchsia-400/25"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-fuchsia-500/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: index * 0.12,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${skill.bg} shadow-[0_0_25px_rgba(168,85,247,0.2)]`}
                  >
                    <Icon className={`text-2xl ${skill.iconColor}`} />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate text-base font-bold text-black dark:text-white sm:text-lg">
                        {skill.name}
                      </h3>

                      <span className="shrink-0 text-sm font-black text-violet-500 dark:text-fuchsia-300">
                        {percent}%
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs font-semibold uppercase tracking-[0.18em] text-black/45 dark:text-white/40">
                      {skill.category}
                    </p>
                  </div>
                </div>

                <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_16px_rgba(168,85,247,0.65)]"
                  >
                    <motion.span
                      animate={{ x: ["-100%", "350%"] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 left-0 w-10 rounded-full bg-white/50 blur-sm"
                    />
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
