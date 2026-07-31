import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardGuard from "@/components/dashboard/DashboardGuard";

export default function DashboardLayout({ children }) {
  return (
    <DashboardGuard>
      <section className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-[#030712] dark:text-white">
        <DashboardSidebar />

        <div className="lg:pl-[280px]">
          <DashboardTopbar />
          <main className="px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-24 lg:px-8 lg:pb-8 lg:pt-28">
            {children}
          </main>
        </div>
      </section>
    </DashboardGuard>
  );
}
