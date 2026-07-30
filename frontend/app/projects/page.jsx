import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { getPublicApi } from "@/lib/serverApi";

export const revalidate = 120;
export const metadata = { title: "Projects | Portfolio" };

const getUrl = (url) => {
  if (!url) return "#";
  return url.startsWith("http") ? url : `https://${url}`;
};

export default async function ProjectsPage() {
  const response = await getPublicApi("/projects", { projects: [] });
  const projects = response.projects || [];

  return (
    <main className="min-h-screen bg-white px-4 py-24 text-black dark:bg-[#030712] dark:text-white sm:px-6">
      <section className="mx-auto max-w-7xl">
        <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 px-5 py-3 text-sm font-bold text-violet-500 dark:text-fuchsia-300">
          <FiArrowLeft /> Back Home
        </Link>

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">Projects</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">All Projects</h1>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-[28px] border border-black/10 bg-black/5 p-10 text-center text-black/55 dark:border-white/10 dark:bg-white/5 dark:text-white/50">No projects found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project._id} className="overflow-hidden rounded-[28px] border border-black/10 bg-white/75 p-4 shadow-[0_0_35px_rgba(168,85,247,0.12)] dark:border-white/10 dark:bg-[#081322]/80">
                <div className="relative h-[220px] overflow-hidden rounded-[22px] border border-black/10 bg-black/5 dark:border-white/10">
                  {project.image?.url ? (
                    <Image src={project.image.url} alt={project.title} fill unoptimized={String(project.image.url).startsWith("/")} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-sm text-black/50 dark:text-white/50">No Image</div>
                  )}
                </div>

                <div className="pt-5">
                  <h2 className="text-xl font-black">{project.title}</h2>
                  <p className="mt-3 min-h-[56px] text-sm leading-7 text-black/60 dark:text-white/60">{project.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags?.map((tag) => <span key={tag} className="rounded-full border border-fuchsia-500/20 px-3 py-1 text-xs font-semibold text-violet-600 dark:text-white/75">{tag}</span>)}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.live && <a href={getUrl(project.live)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 px-4 py-2.5 text-sm font-bold text-violet-600 dark:text-fuchsia-300">Live Demo <FiExternalLink /></a>}
                    {project.github && <a href={getUrl(project.github)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-2.5 text-sm font-bold dark:border-white/10">Code <FiGithub /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
