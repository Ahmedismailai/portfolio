"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Search, UserCircle } from "lucide-react";

import ThemeToggle from "@/components/dashboard/ThemeToggle";
import API from "@/lib/axios";
import { useDashboardAuth } from "@/components/dashboard/DashboardGuard";
import ManagedImage from "@/components/ManagedImage";

export default function DashboardTopbar() {
  const router = useRouter();
  const { user } = useDashboardAuth();
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const unread = analytics?.unread || 0;
  const recentMessages = analytics?.notifications || [];

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const { data } = await API.get("/notifications");
        setAnalytics(data);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

    getAnalytics();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") getAnalytics();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleNotifications = async () => {
    const shouldOpen = !open;
    setOpen(shouldOpen);

    if (shouldOpen && unread > 0) {
      try {
        await API.put("/notifications/read-all");
        setAnalytics((current) => ({
          ...current,
          unread: 0,
          notifications:
            current?.notifications?.map((notification) => ({
              ...notification,
              isRead: true,
            })) || [],
        }));
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    }
  };

  const logoutHandler = async () => {
    try {
      await API.post("/auth/logout");
    } finally {
      router.push("/login");
    }
  };

  return (
    <header className="fixed right-0 top-0 z-40 w-full border-b border-black/10 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-[#030712]/75 lg:left-[280px] lg:w-[calc(100%-280px)]">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="pl-14 lg:pl-0">
          <h1 className="text-2xl font-black text-black dark:text-white">
            Dashboard
          </h1>
          <p className="hidden text-sm text-gray-500 dark:text-white/55 sm:block">
            Welcome back, {user?.name || "Admin"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-2xl border border-black/10 bg-black/5 px-4 py-3 dark:border-white/10 dark:bg-white/5 md:flex">
            <Search size={20} className="text-gray-500 dark:text-white/50" />
            <input
              placeholder="Search anything..."
              className="w-[240px] bg-transparent text-sm text-black outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-white/40"
            />
          </div>

          <ThemeToggle />

          <div className="relative">
            <motion.button
              type="button"
              aria-label="Open notifications"
              title="Open notifications"
              onClick={toggleNotifications}
              whileHover={{ scale: 1.06 }}
              className="relative grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-black/5 text-black dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <Bell />

              {unread > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-fuchsia-500 px-1 text-xs font-bold text-white">
                  {unread}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-[320px] overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_0_50px_rgba(168,85,247,0.18)] dark:border-white/10 dark:bg-[#07111f]"
                >
                  <div className="border-b border-black/10 p-5 dark:border-white/10">
                    <h3 className="font-black text-black dark:text-white">
                      Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-white/50">
                      {unread} unread notifications
                    </p>
                  </div>

                  <div className="max-h-[320px] overflow-y-auto p-4">
                    {recentMessages.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-white/50">
                        No notifications yet.
                      </p>
                    ) : (
                      recentMessages.map((msg) => (
                        <Link
                          key={msg._id}
                          href="/dashboard/notifications"
                          onClick={() => setOpen(false)}
                          className="mb-3 block rounded-2xl border border-black/10 bg-black/5 p-4 last:mb-0 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-black dark:text-white">
                              {msg.title || msg.name || "Notification"}
                            </h4>

                            {!msg.isRead && (
                              <span className="rounded-full bg-fuchsia-500 px-2 py-1 text-[10px] font-bold text-white">
                                NEW
                              </span>
                            )}
                          </div>

                          <p className="mt-2 truncate text-sm text-gray-500 dark:text-white/55">
                            {msg.message}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>

                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setOpen(false)}
                    className="block border-t border-black/10 p-4 text-center font-semibold text-violet-500 hover:bg-black/5 dark:border-white/10 dark:text-violet-300 dark:hover:bg-white/5"
                  >
                    View all notifications
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/dashboard/profile"
            aria-label="Open profile"
            title="Open profile"
            className="hidden h-12 w-12 overflow-hidden place-items-center rounded-2xl border border-black/10 bg-black/5 text-black transition hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:grid"
          >
            {user?.avatar?.url ? (
              <ManagedImage
                src={user.avatar.url}
                alt={user.name || "Admin"}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle />
            )}
          </Link>

          <button
            type="button"
            onClick={logoutHandler}
            className="flex h-12 items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 text-red-500 transition hover:bg-red-500/20"
          >
            <LogOut size={18} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
