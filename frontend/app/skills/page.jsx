import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getPublicApi } from "@/lib/serverApi";

export const revalidate = 120;
export const metadata = { title: "Skills | Portfolio" };

export default async function SkillsPage() {
  const response = await getPublicApi("/skills", { skills: [] });
  const skills = response.skills || [];

  return (
    <main className="min-h-screen bg-white px-4 py-24 text-black dark:bg-[#030712] dark:text-white sm:px-6">
      <section className="mx-auto max-w-5xl">
        <Link href="/#skills" className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 px-5 py-3 text-sm font-bold text-violet-500 dark:text-fuchsia-300"><FiArrowLeft /> Back Home</Link>
        <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">Skills</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">All Skills</h1></div>
        <div className="space-y-5">
          {skills.map((skill) => <article key={skill._id || skill.name} className="rounded-[24px] border border-black/10 bg-white/75 p-5 dark:border-white/10 dark:bg-[#081322]/80"><div className="mb-3 flex items-center justify-between gap-4"><div><h2 className="text-xl font-black">{skill.name}</h2><p className="mt-1 text-sm text-black/50 dark:text-white/50">{skill.category || "Skill"}</p></div><p className="text-xl font-black text-violet-500 dark:text-fuchsia-300">{skill.percent || 0}%</p></div><div className="h-3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" style={{ width: `${Math.min(100, Math.max(0, skill.percent || 0))}%` }} /></div></article>)}
        </div>
      </section>
    </main>
  );
}
