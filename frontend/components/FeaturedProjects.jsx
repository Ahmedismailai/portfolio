"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useHomeData } from "@/contex/HomeDataContext";

export default function FeaturedProjects() {
  const { data, loading } = useHomeData();
  const projects = data.projects;

  const getUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <section
      id="projects"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-14 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6"
    >
    
      <div className="absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_45px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/55 sm:p-8 md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />

        {/* Header same as Skills */}
        <div className="relative mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Projects
              </p>
            </div>

            <h2 className="text-3xl font-black text-black dark:text-white sm:text-4xl">
               Projects
            </h2>

          
          </div>

          <Link
            href="/projects"
            className="text-base font-bold text-violet-500 dark:text-violet-300 md:hidden"
          >
            View All
          </Link>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/projects"
              className="hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-7 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300 md:block"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-[28px] border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
              />
            ))}
          </div>
        )}

     
        {!loading && projects.length === 0 && (
          <div className="relative rounded-[28px] border border-black/10 bg-black/5 p-10 text-center text-black/55 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            No projects found. Add projects from dashboard.
          </div>
        )}

   
        {!loading && projects.length > 0 && (
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/75 p-4 shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-[0_0_45px_rgba(168,85,247,0.2)] dark:border-white/10 dark:bg-[#081322]/80 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_0_45px_rgba(56,189,248,0.14)]"
              >
            
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.13),transparent_40%)] opacity-80" />

                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-fuchsia-400/20" />

       
                <div className="relative h-[210px] overflow-hidden rounded-[22px] border border-black/10 bg-black/5 shadow-inner dark:border-white/10 dark:bg-black/30">
                  {project.image?.url ? (
                    <Image
                      src={project.image.url}
                      alt={project.title || "Project image"}
                      fill
                      unoptimized={String(project.image.url).startsWith("/")}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-sm text-black/50 dark:text-white/50">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full border border-fuchsia-500/30 bg-white/80 px-3 py-1 text-xs font-bold text-fuchsia-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-black/35 dark:text-fuchsia-300">
                      Featured
                    </span>
                  )}

                  <div className="absolute right-3 top-3 flex gap-2">
                    {project.github && (
                      <a
                        href={getUrl(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/85 text-black shadow-sm backdrop-blur-xl transition hover:bg-violet-500 hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-cyan-500/20"
                      >
                        <FiGithub />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={getUrl(project.live)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/85 text-black shadow-sm backdrop-blur-xl transition hover:bg-fuchsia-500 hover:text-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-fuchsia-500/25"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

          
                <div className="relative pt-5">
                  <h3 className="truncate text-xl font-black text-black dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 min-h-[56px] text-sm leading-7 text-black/60 dark:text-white/60">
                    {project.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-fuchsia-500/20 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-violet-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    {project.live ? (
                      <motion.a
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        href={getUrl(project.live)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-4 py-2.5 text-sm font-bold text-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.14)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300"
                      >
                        Live Demo <FiExternalLink />
                      </motion.a>
                    ) : (
                      <span className="text-sm text-black/35 dark:text-white/35">
                        No live link
                      </span>
                    )}

                    <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-500/70 dark:text-fuchsia-300/60">
                      Project
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
