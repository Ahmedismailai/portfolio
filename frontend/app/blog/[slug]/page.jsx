import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiUser, FiClock } from "react-icons/fi";
import { getPublicApi } from "@/lib/serverApi";

export const revalidate = 120;

async function getBlog(slug) {
  const response = await getPublicApi(`/blogs/${encodeURIComponent(slug)}`, {
    blog: null,
  });
  return response.blog || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Portfolio`,
    description: blog.excerpt || blog.desc || blog.description,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.desc || blog.description,
      images: blog.coverImage?.url ? [blog.coverImage.url] : [],
      type: "article",
    },
  };
}

function MarkdownRenderer({ content }) {
  if (!content) return null;

  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="mt-8 space-y-6 text-base leading-8 text-slate-700 dark:text-slate-200">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const lang = lines[0].trim();
          const code = (lang && !lang.includes(" ") ? lines.slice(1) : lines).join("\n");
          return (
            <div key={index} className="my-6 overflow-hidden rounded-2xl border border-slate-700/60 bg-[#090d16] text-slate-100 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 bg-[#0d1424] px-4 py-2.5 text-xs font-mono text-cyan-400">
                <span>{lang || "code"}</span>
                <span className="text-slate-500">utf-8</span>
              </div>
              <pre className="overflow-x-auto p-5 text-sm font-mono leading-7 text-cyan-200">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split("\n");
        return (
          <div key={index} className="space-y-4">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (trimmed === "---") {
                return <hr key={lineIdx} className="my-8 border-slate-200 dark:border-slate-800" />;
              }

              if (trimmed.startsWith("# ")) {
                return (
                  <h1 key={lineIdx} className="mt-8 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                    {trimmed.replace("# ", "")}
                  </h1>
                );
              }

              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={lineIdx} className="mt-8 text-xl font-extrabold text-violet-600 dark:text-cyan-400 sm:text-2xl">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={lineIdx} className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                return (
                  <div key={lineIdx} className="ml-4 flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                    <p>{trimmed.replace(/^[-*]\s+/, "")}</p>
                  </div>
                );
              }

              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <div key={lineIdx} className="ml-2 flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-cyan-500">{trimmed.match(/^\d+\./)[0]}</span>
                    <p>{trimmed.replace(/^\d+\.\s+/, "")}</p>
                  </div>
                );
              }

              return (
                <p key={lineIdx} className="text-base leading-8 text-slate-700 dark:text-slate-300">
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const coverUrl =
    (typeof blog.coverImage === "string" && blog.coverImage.trim()) ||
    blog.coverImage?.url ||
    (typeof blog.image === "string" && blog.image.trim()) ||
    blog.image?.url ||
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4 py-28 text-black transition-colors duration-300 dark:bg-[#030712] dark:text-white sm:px-6">
      <div className="absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <article className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_45px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/55 sm:p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />
        <div className="relative">
          <Link
            href="/#blog"
            className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-5 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300"
          >
            <FiArrowLeft /> Back to Blogs
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
              {blog.category || "Engineering Blog"}
            </p>
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold text-slate-500 dark:text-white/60">
            <span className="flex items-center gap-2">
              <FiCalendar className="text-violet-500 dark:text-fuchsia-400" />
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : "Latest Article"}
            </span>
            <span className="flex items-center gap-2">
              <FiUser className="text-cyan-500 dark:text-cyan-400" />
              {blog.author || "Ahmed Ismail"}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="text-emerald-500 dark:text-emerald-400" />
              {blog.readTime || "7 min read"}
            </span>
          </div>

          <div className="relative mt-8 h-[300px] overflow-hidden rounded-[28px] border border-black/10 shadow-[0_0_35px_rgba(168,85,247,0.12)] dark:border-white/10 sm:h-[450px]">
            <Image
              src={coverUrl}
              alt={blog.title}
              fill
              unoptimized
              sizes="(max-width:1024px) 100vw, 960px"
              className="object-cover"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {(blog.tags || []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 text-xs font-bold text-violet-500 dark:text-fuchsia-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-8 text-lg font-semibold leading-9 text-slate-800 dark:text-white/80">
            {blog.excerpt || blog.desc || blog.description}
          </p>

          <MarkdownRenderer content={blog.content} />
        </div>
      </article>
    </section>
  );
}
