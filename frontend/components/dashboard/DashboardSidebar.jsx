"use client";

import API from "@/lib/axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  FileText,
  User,
  Wrench,
  BarChart3,
  Bell,
  Activity,
  UploadCloud,
  Mail,
    Boxes
  
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
  { label: "Skills", icon: Code2, href: "/dashboard/skills" },
  { label: "Experience", icon: Briefcase, href: "/dashboard/experience" },
  { label: "Services", icon: Wrench, href: "/dashboard/services" },
  { label: "Testimonials", icon: Star, href: "/dashboard/testimonials" },
  { label: "Messages", icon: MessageSquare, href: "/dashboard/messages" },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { label: "Work With", icon: Boxes, href: "/dashboard/work-with" },
  { label: "Blog", icon: FileText, href: "/dashboard/blog" },
  { label: "SEO", icon: Search, href: "/dashboard/seo" },
  { label: "Resume", icon: UploadCloud, href: "/dashboard/resume" },
  { label: "Activity", icon: Activity, href: "/dashboard/activity" },
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { label: "Profile", icon: User, href: "/dashboard/profile" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
{ label: "Subscribers", icon: Mail, href: "/dashboard/subscribers" }
];

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await API.post("/auth/logout");
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_0_35px_rgba(168,85,247,0.45)]">
          <LayoutDashboard />
        </div>

        <div>
          <h2 className="text-xl font-black text-black dark:text-white">
            Ismail Portfolio
          </h2>
          <p className="text-sm text-violet-500 dark:text-violet-300">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="space-y-2 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 rounded-2xl px-5 py-3.5 transition ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                  : "text-gray-600 hover:bg-black/5 hover:text-black dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              <Icon size={21} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logoutHandler}
        className="mt-6 flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-500 hover:bg-red-500/20"
      >
        <LogOut size={22} />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-[1000] grid h-12 w-12 place-items-center rounded-xl border border-black/10 bg-white/90 text-black backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/90 dark:text-white lg:hidden"
      >
        <Menu />
      </button>

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[280px] border-r border-black/10 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/85 lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-[88%] max-w-[330px] border-r border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#07111f]"
            >
              <button
                onClick={() => setOpen(false)}
                className="mb-6 ml-auto grid h-11 w-11 place-items-center rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
              >
                <X />
              </button>

              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
