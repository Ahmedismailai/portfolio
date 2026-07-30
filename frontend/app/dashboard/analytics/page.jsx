"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import {
  BarChart3,
  FolderKanban,
  Code2,
  BriefcaseBusiness,
  MessageSquare,
  Star,
  Newspaper,
  Users,
  RefreshCcw,
  Loader2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import toast from "react-hot-toast";

const defaultChartData = [
  { name: "Projects", value: 0 },
  { name: "Skills", value: 0 },
  { name: "Services", value: 0 },
  { name: "Messages", value: 0 },
  { name: "Blogs", value: 0 },
  { name: "Subscribers", value: 0 },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    stats: {},
    recentActivities: [],
    recentNotifications: [],
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/analytics");

      setAnalytics({
        stats: data.stats || {},
        recentActivities: data.recentActivities || [],
        recentNotifications: data.recentNotifications || [],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Analytics load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchAnalytics();
  }, []);

  const stats = analytics.stats || {};

  const cards = [
    {
      title: "Projects",
      value: stats.projects || 0,
      icon: FolderKanban,
      color: "from-sky-500 to-cyan-500",
    },
    {
      title: "Skills",
      value: stats.skills || 0,
      icon: Code2,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Services",
      value: stats.services || 0,
      icon: BriefcaseBusiness,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Testimonials",
      value: stats.testimonials || 0,
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Messages",
      value: stats.messages || 0,
      icon: MessageSquare,
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "Blogs",
      value: stats.blogs || 0,
      icon: Newspaper,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Subscribers",
      value: stats.subscribers || 0,
      icon: Users,
      color: "from-purple-500 to-violet-500",
    },
  ];

  const chartData =
    stats && Object.keys(stats).length
      ? [
          { name: "Projects", value: stats.projects || 0 },
          { name: "Skills", value: stats.skills || 0 },
          { name: "Services", value: stats.services || 0 },
          { name: "Messages", value: stats.messages || 0 },
          { name: "Blogs", value: stats.blogs || 0 },
          { name: "Subscribers", value: stats.subscribers || 0 },
        ]
      : defaultChartData;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/70 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/25">
            <BarChart3 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">
              Analytics
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
              Overview of your portfolio dashboard activity.
            </p>
          </div>
        </div>

        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <RefreshCcw size={16} />
          )}
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-[26px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-[#07111f]/70"
            >
              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-r ${card.color} opacity-20 blur-2xl`}
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-white/50">
                    {card.title}
                  </p>
                  <h3 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
                    {loading ? "..." : card.value}
                  </h3>
                </div>

                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/70">
          <h2 className="mb-6 text-xl font-black text-slate-950 dark:text-white">
            Content Overview
          </h2>

          <div className="h-[330px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#analyticsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/70">
          <h2 className="mb-6 text-xl font-black text-slate-950 dark:text-white">
            Dashboard Data
          </h2>

          <div className="h-[330px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            )}
          </div>
        </div>
      </div>

      {/* Recent Data */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/70">
          <h2 className="mb-5 text-xl font-black text-slate-950 dark:text-white">
            Recent Activities
          </h2>

          {analytics.recentActivities?.length ? (
            <div className="space-y-3">
              {analytics.recentActivities.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="font-bold text-slate-800 dark:text-white">
                    {item.action}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                    {item.details || item.module || "Activity"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-white/50">
              No activities found.
            </p>
          )}
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/70">
          <h2 className="mb-5 text-xl font-black text-slate-950 dark:text-white">
            Recent Notifications
          </h2>

          {analytics.recentNotifications?.length ? (
            <div className="space-y-3">
              {analytics.recentNotifications.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-black/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="font-bold text-slate-800 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-white/50">
              No notifications found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
