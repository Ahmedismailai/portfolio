import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { getPublicApi } from "@/lib/serverApi";

export const revalidate = 120;
export const metadata = { title: "Testimonials | Portfolio" };

export default async function TestimonialsPage() {
  const response = await getPublicApi("/testimonials", { testimonials: [] });
  const testimonials = response.testimonials || [];

  return (
    <main className="min-h-screen bg-white px-4 py-24 text-black dark:bg-[#030712] dark:text-white sm:px-6">
      <section className="mx-auto max-w-7xl">
        <Link href="/#testimonials" className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 px-5 py-3 text-sm font-bold text-violet-500 dark:text-fuchsia-300"><FiArrowLeft /> Back Home</Link>
        <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">Testimonials</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">All Testimonials</h1></div>
        {testimonials.length === 0 ? (
          <div className="rounded-[28px] border border-black/10 bg-black/5 p-10 text-center text-black/55 dark:border-white/10 dark:bg-white/5 dark:text-white/50">No testimonials found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => <article key={item._id} className="rounded-[24px] border border-black/10 bg-white/80 p-6 dark:border-white/10 dark:bg-[#081322]/85"><FaQuoteLeft className="text-3xl text-fuchsia-500" /><p className="mt-4 min-h-[90px] text-sm leading-7 text-black/65 dark:text-white/70">{item.text}</p><div className="mt-6 flex items-center justify-between gap-4"><div className="flex items-center gap-4"><Image src={item.image?.url || "/logo.jpeg"} alt={item.name} width={48} height={48} unoptimized={String(item.image?.url || "/logo.jpeg").startsWith("/")} className="h-12 w-12 rounded-full border-2 border-violet-500/50 object-cover" /><div><h2 className="font-bold">{item.name}</h2><p className="text-sm text-black/55 dark:text-white/55">{item.role}</p></div></div><div className="flex gap-1 text-yellow-400">{[...Array(Math.min(5, Math.max(0, item.rating || 5)))].map((_, index) => <FaStar key={index} />)}</div></div></article>)}
          </div>
        )}
      </section>
    </main>
  );
}
