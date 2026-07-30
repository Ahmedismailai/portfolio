"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useHomeData } from "@/contex/HomeDataContext";

const gradientPresets = [
  "from-cyan-400 via-violet-500 to-fuchsia-500",
  "from-fuchsia-500 via-purple-500 to-cyan-400",
  "from-emerald-400 via-teal-500 to-cyan-600",
];

export default function Testimonials() {
  const { data } = useHomeData();
  const testimonials = data.testimonials;

  return (
    <section
      id="testimonials"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-16 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6"
    >
      <div className="absolute left-0 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-fuchsia-500/10 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_45px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/15 dark:bg-[#07111f]/55 sm:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />

        <div className="relative mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Testimonials
              </p>
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              What Clients Say
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/testimonials"
              className="hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-6 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl dark:text-fuchsia-300 sm:block"
            >
              View All Testimonials
            </Link>
          </motion.div>

          <Link
            href="/testimonials"
            className="text-sm font-bold text-violet-500 dark:text-violet-300 sm:hidden"
          >
            View All
          </Link>
        </div>

        <div className="relative grid gap-6 md:grid-cols-3">
          {testimonials.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-black/10 bg-white/60 p-6 text-center text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              No testimonials yet.
            </div>
          ) : (
            testimonials.map((item, index) => {
              const cardColor = gradientPresets[index % gradientPresets.length];
              const avatarUrl =
                (typeof item.image === "string" && item.image.trim()) ||
                item.image?.url ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/20 p-6 shadow-[0_10px_35px_rgba(168,85,247,0.08)] backdrop-blur-xl transition-all duration-500 hover:border-fuchsia-500/40 hover:shadow-[0_15px_45px_rgba(168,85,247,0.25)] dark:border-white/15 dark:bg-gradient-to-br dark:from-[#0d1c33]/90 dark:via-[#14102d]/90 dark:to-[#1a0c2e]/90"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${cardColor} opacity-20 blur-3xl`} />

                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <FaQuoteLeft className="text-3xl text-fuchsia-500 drop-shadow-[0_0_18px_rgba(168,85,247,0.6)]" />

                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ scale: 0, rotate: -20 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.45,
                              ease: "easeOut",
                              delay: index * 0.12 + i * 0.08,
                            }}
                          >
                            <FaStar className="text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <p className="relative mt-4 flex-1 text-sm font-medium leading-7 text-slate-700 dark:text-slate-200">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                  <div className="relative mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-4">
                    <Image
                      src={avatarUrl}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border-2 border-violet-500/60 object-cover shadow-[0_0_22px_rgba(168,85,247,0.3)]"
                    />

                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-violet-600 dark:text-fuchsia-300">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`relative mt-4 h-[2px] w-full rounded-full bg-gradient-to-r ${cardColor} shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all duration-500 ease-out opacity-100 lg:w-0 lg:opacity-0 lg:group-hover:w-full lg:group-hover:opacity-100`}
                  />
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </section>
  );
}
