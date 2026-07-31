"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useHomeData } from "@/contex/HomeDataContext";
import {
  FiArrowRight,
  FiCode,
  FiServer,
  FiShoppingBag,
  FiPenTool,
  FiSearch,
  FiDatabase,
  FiSmartphone,
  FiMonitor,
  FiCloud,
  FiShield,
  FiSettings,
  FiBarChart2,
  FiGlobe,
  FiCpu,
  FiLayers,
} from "react-icons/fi";

const iconMap = {
  FiCode,
  FiServer,
  FiShoppingBag,
  FiPenTool,
  FiSearch,
  FiDatabase,
  FiSmartphone,
  FiMonitor,
  FiCloud,
  FiShield,
  FiSettings,
  FiBarChart2,
  FiGlobe,
  FiCpu,
  FiLayers,
};

const gradientPresets = [
  "from-cyan-400 via-violet-500 to-fuchsia-500",
  "from-fuchsia-500 via-purple-500 to-cyan-400",
  "from-cyan-400 via-teal-400 to-emerald-500",
  "from-emerald-400 via-cyan-500 to-blue-600",
  "from-amber-400 via-rose-500 to-fuchsia-600",
  "from-violet-500 via-fuchsia-500 to-cyan-400",
];

export default function Services() {
  const { data } = useHomeData();
  const services = data.services;

  return (
    <section
      id="services"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-16 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6"
    >
      <div className="absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_50px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/55 sm:p-8 md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />

        <div className="relative mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Services
              </p>
            </div>

            <h2 className="text-3xl font-black text-black dark:text-white md:text-4xl">
              My Services
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/services"
              className="hidden items-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-6 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl transition dark:text-fuchsia-300 md:flex"
            >
              View All Services <FiArrowRight />
            </Link>
          </motion.div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-black/10 bg-white/60 p-6 text-center text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              No services added yet.
            </div>
          ) : (
            services.map((service, index) => {
              const Icon = iconMap[service.icon] || FiCode;
              const cardColor = gradientPresets[index % gradientPresets.length];

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 45, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-[26px] border border-black/10 bg-white/80 p-7 shadow-[0_0_30px_rgba(168,85,247,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1424]/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-fuchsia-500/10 opacity-0" />

                  <div
                    className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${cardColor} opacity-20 blur-3xl`}
                  />

                  <div className="relative flex flex-1 flex-col">
                    <motion.div
                      animate={{ y: [0, -7, 0], rotate: [0, 2, -2, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                      className={`relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${cardColor} shadow-[0_0_35px_rgba(168,85,247,0.35)]`}
                    >
                      <Icon className="text-3xl text-white" />
                    </motion.div>

                    <h3 className="relative mb-5 text-2xl font-black text-black dark:text-white">
                      {service.title}
                    </h3>

                    <p className="relative flex-1 text-base leading-8 text-black/65 dark:text-white/65">
                      {service.desc}
                    </p>
                  </div>

                  <div
                    className={`relative mt-6 h-[2px] w-full rounded-full bg-gradient-to-r ${cardColor} shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all duration-500 ease-out opacity-100 lg:w-0 lg:opacity-0 lg:group-hover:w-full lg:group-hover:opacity-100`}
                  />
                </motion.div>
              );
            })
          )}
        </div>

        <Link
          href="/services"
          className="relative mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-6 py-4 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.16)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300 md:hidden"
        >
          View All Services <FiArrowRight />
        </Link>
      </motion.div>
    </section>
  );
}
