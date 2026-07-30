import Link from "next/link";
import { FiArrowLeft, FiBarChart2, FiCloud, FiCode, FiDatabase, FiMonitor, FiPenTool, FiSearch, FiServer, FiSettings, FiShield, FiShoppingBag, FiSmartphone } from "react-icons/fi";
import { getPublicApi } from "@/lib/serverApi";

export const revalidate = 120;
export const metadata = { title: "Services | Portfolio" };

const iconMap = { FiCode, FiServer, FiShoppingBag, FiPenTool, FiSearch, FiDatabase, FiSmartphone, FiMonitor, FiCloud, FiShield, FiSettings, FiBarChart2 };

export default async function ServicesPage() {
  const response = await getPublicApi("/services", { services: [] });
  const services = response.services || [];

  return (
    <main className="min-h-screen bg-white px-4 py-24 text-black dark:bg-[#030712] dark:text-white sm:px-6">
      <section className="mx-auto max-w-7xl">
        <Link href="/#services" className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-500/30 px-5 py-3 text-sm font-bold text-violet-500 dark:text-fuchsia-300"><FiArrowLeft /> Back Home</Link>
        <div className="mb-10"><p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">Services</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">All Services</h1></div>
        {services.length === 0 ? (
          <div className="rounded-[28px] border border-black/10 bg-black/5 p-10 text-center text-black/55 dark:border-white/10 dark:bg-white/5 dark:text-white/50">No services found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || FiCode;
              return <article key={service._id} className="min-h-[270px] rounded-[26px] border border-black/10 bg-white/80 p-7 dark:border-white/10 dark:bg-[#0b1424]/80"><div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color || "from-cyan-400 via-violet-500 to-fuchsia-500"}`}><Icon className="text-3xl text-white" /></div><h2 className="mb-5 text-2xl font-black">{service.title}</h2><p className="text-base leading-8 text-black/65 dark:text-white/65">{service.desc}</p></article>;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
