"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, Laptop2, Sparkles } from "lucide-react";
import { useHomeData } from "@/contex/HomeDataContext";

const iconMap = {
  BriefcaseBusiness,
  Code2,
  Laptop2,
  Sparkles,
};

const gradientPresets = [
  "from-cyan-400 via-blue-500 to-indigo-600",
  "from-fuchsia-500 via-violet-500 to-purple-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
];

export default function Experience() {
  const { data } = useHomeData();
  const experiences = data.experiences;

  return (
    <section
      id="experience"
      className="relative z-20 overflow-hidden bg-white/80 px-4 py-16 text-black transition-colors duration-300 dark:bg-[#030712]/80 dark:text-white sm:px-6"
    >
      <div className="absolute left-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-violet-500/15 blur-[150px]" />
      <div className="absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-cyan-500/15 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/80 p-5 shadow-[0_0_50px_rgba(168,85,247,0.12)] backdrop-blur-xl dark:border-white/15 dark:bg-[#091528]/80 sm:p-8 md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.15),transparent_40%)]" />

        <div className="relative mb-14 flex items-center justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Timeline
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
              Work Experience
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-8 hidden h-[3px] w-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 opacity-80 shadow-[0_0_22px_rgba(168,85,247,0.6)] lg:block" />
          <div className="absolute left-7 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-500 opacity-80 shadow-[0_0_22px_rgba(168,85,247,0.6)] lg:hidden" />

          <div className="relative grid gap-8 lg:grid-cols-3">
            {experiences.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-black/10 bg-white/60 p-6 text-center text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
                No experience added yet.
              </div>
            ) : (
              experiences.map((item, index) => {
                const Icon = iconMap[item.icon] || BriefcaseBusiness;
                const isPresent = (item.year || "").toLowerCase().includes("present");
                const cardColor = gradientPresets[index % gradientPresets.length];

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 45, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="relative flex flex-col h-full"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      className={`absolute left-[18px] top-7 z-20 h-5 w-5 rounded-full bg-gradient-to-r ${cardColor} shadow-[0_0_35px_rgba(217,70,239,0.7)] lg:left-1/2 lg:-translate-x-1/2`}
                    />

                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="group ml-14 flex flex-col justify-between h-full overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/30 to-violet-50/30 p-6 shadow-[0_10px_35px_rgba(168,85,247,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-fuchsia-500/40 hover:shadow-[0_15px_45px_rgba(168,85,247,0.25)] dark:border-white/15 dark:bg-gradient-to-br dark:from-[#0d1c33]/90 dark:via-[#14102d]/90 dark:to-[#1a0c2e]/90 dark:hover:border-cyan-400/40 lg:ml-0 lg:mt-16"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                      <div className="relative flex flex-col flex-1">
                        <div className="relative mb-5 flex items-center justify-between gap-3">
                          <motion.div
                            animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.15,
                            }}
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cardColor} shadow-[0_0_35px_rgba(139,92,246,0.45)]`}
                          >
                            <Icon className="text-2xl text-white" />
                          </motion.div>

                          {isPresent ? (
                            <span className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300 shadow-sm backdrop-blur-md">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                              </span>
                              Active Role
                            </span>
                          ) : (
                            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-bold text-violet-600 dark:text-fuchsia-300 backdrop-blur-md">
                              Full-Time
                            </span>
                          )}
                        </div>

                        <p className="relative text-xs font-black uppercase tracking-widest text-violet-600 dark:text-fuchsia-400">
                          {item.year}
                        </p>

                        <h3 className="relative mt-2 text-xl font-black leading-snug text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-cyan-300 transition-colors">
                          {item.role}
                        </h3>

                        <p className="relative mt-1 text-sm font-black text-cyan-600 dark:text-cyan-300">
                          {item.company}
                        </p>

                        {item.description && (
                          <p className="relative mt-4 flex-1 text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div
                        className={`relative mt-6 h-[2px] w-full rounded-full bg-gradient-to-r ${cardColor} shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all duration-500 ease-out opacity-100 lg:w-0 lg:opacity-0 lg:group-hover:w-full lg:group-hover:opacity-100`}
                      />
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
