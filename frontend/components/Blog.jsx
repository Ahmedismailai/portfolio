"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useHomeData } from "@/contex/HomeDataContext";

export default function Blog() {
  const { data, loading } = useHomeData();
  const blogs = data.blogs;

  return (
    <section
      id="blog"
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

        <div className="relative mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Blog
              </p>
            </div>

            <h2 className="text-3xl font-black text-black dark:text-white sm:text-4xl">
              Latest Articles
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/blog"
              className="hidden items-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-7 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300 md:flex"
            >
              View All Blogs <FiArrowRight />
            </Link>
          </motion.div>
        </div>

        {loading && (
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[360px] animate-pulse rounded-[28px] border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
              />
            ))}
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="relative rounded-[28px] border border-black/10 bg-black/5 p-10 text-center text-black/55 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            No blogs found. Add blogs from dashboard.
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/75 p-4 shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/30 hover:shadow-[0_0_45px_rgba(168,85,247,0.2)] dark:border-white/10 dark:bg-[#081322]/80 dark:hover:border-cyan-400/40"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.13),transparent_40%)] opacity-80" />

                <div className="relative h-52 overflow-hidden rounded-[22px] border border-black/10 dark:border-white/10">
                  <Image
                    src={
                      (typeof blog.coverImage === "string" && blog.coverImage.trim()) ||
                      blog.coverImage?.url ||
                      (typeof blog.image === "string" && blog.image.trim()) ||
                      blog.image?.url ||
                      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {blog.category && (
                    <span className="absolute left-3.5 top-3.5 z-10 rounded-full border border-white/20 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md backdrop-blur-md">
                      {blog.category}
                    </span>
                  )}
                </div>

                <div className="relative p-3">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-white/55">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-violet-500 dark:text-fuchsia-400" />
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "Latest Article"}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiUser className="text-cyan-500 dark:text-cyan-400" />
                      {blog.author || "Ahmed Ismail"}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-lg font-black leading-snug text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-fuchsia-300 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600 dark:text-white/65">
                    {blog.desc || blog.description || blog.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(blog.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-violet-500 dark:text-fuchsia-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${blog.slug || blog._id}`}
                    className="mt-6 flex items-center gap-2 text-sm font-bold text-violet-500 transition hover:text-fuchsia-500 dark:text-fuchsia-300"
                  >
                    Read More <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
