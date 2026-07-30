import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import { getPublicApi } from "@/lib/serverApi";

export const revalidate = 120;
export const metadata = {
  title: "Blog | Portfolio",
  description: "Articles and publications.",
};

export default async function BlogPage() {
  const response = await getPublicApi("/blogs/published", { blogs: [] });
  const blogs = response.blogs || [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-4 py-24 text-black transition-colors duration-300 dark:bg-[#030712] dark:text-white sm:px-6">
      <div className="absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <section className="relative mx-auto max-w-7xl">
        <Link href="/#blog" className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-5 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300"><FiArrowLeft /> Back Home</Link>
        <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">Blog</p><h1 className="mt-3 text-4xl font-black leading-tight text-black dark:text-white sm:text-6xl">Latest Articles</h1></div>

        {blogs.length === 0 ? (
          <div className="rounded-[28px] border border-black/10 bg-white/70 p-10 text-center text-black/60 shadow-[0_0_35px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/70 dark:text-white/60">No published blogs found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog._id} className="group overflow-hidden rounded-[28px] border border-black/10 bg-white/75 p-4 shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-500/30 hover:shadow-[0_0_45px_rgba(168,85,247,0.2)] dark:border-white/10 dark:bg-[#081322]/80 dark:hover:border-cyan-400/40">
                <div className="relative h-52 overflow-hidden rounded-[22px] border border-black/10 dark:border-white/10">
                  <Image src={blog.coverImage?.url || blog.image?.url || "/laptop-code-3d.png"} alt={blog.title} fill unoptimized={String(blog.coverImage?.url || blog.image?.url || "/laptop-code-3d.png").startsWith("/")} sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="p-3">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-black/55 dark:text-white/55"><span className="flex items-center gap-1"><FiCalendar />{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Latest"}</span><span className="flex items-center gap-1"><FiUser />{blog.author || "Admin"}</span></div>
                  <h2 className="line-clamp-2 text-xl font-black text-black dark:text-white">{blog.title}</h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-black/60 dark:text-white/60">{blog.excerpt || blog.desc || blog.description}</p>
                  <Link href={`/blog/${blog.slug || blog._id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-500 transition hover:text-fuchsia-500 dark:text-fuchsia-300">Read More <FiArrowRight /></Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
