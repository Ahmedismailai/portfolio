"use client";

import { useEffect, useRef, useState } from "react";
import API from "@/lib/axios";

import {
  AlertTriangle,
  Code2,
  FileText,
  FolderKanban,
  Loader2,
  Mail,
  MessageSquare,
  RefreshCcw,
  Star,
  Wrench,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

const chartData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 80 },
  { month: "Mar", value: 60 },
  { month: "Apr", value: 140 },
  { month: "May", value: 120 },
  { month: "Jun", value: 200 },
];

const emptyAnalytics = {
  stats: {
    projects: 0,
    skills: 0,
    services: 0,
    messages: 0,
    testimonials: 0,
    blogs: 0,
    subscribers: 0,
  },
  recentActivities: [],
  recentNotifications: [],
};

function GrowthChart() {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setSize({
        width: Math.max(1, Math.floor(rect.width)),
        height: Math.max(1, Math.floor(rect.height)),
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const ready = size.width > 1 && size.height > 1;

  return (
    <div ref={containerRef} className="h-[350px] min-w-0">
      {ready ? (
        <AreaChart width={size.width} height={size.height} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.35}
            isAnimationActive={false}
          />
        </AreaChart>
      ) : (
        <div className="h-full rounded-2xl bg-black/5 dark:bg-white/5" />
      )}
    </div>
  );
}

export default function DashboardHome() {
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/analytics");

      setAnalytics({
        stats: { ...emptyAnalytics.stats, ...(data.stats || {}) },
        recentActivities: data.recentActivities || [],
        recentNotifications: data.recentNotifications || [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Dashboard data load failed");
      setAnalytics(emptyAnalytics);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  const stats = analytics.stats || emptyAnalytics.stats;

  const cards = [
    { title: "Projects", value: stats.projects, icon: FolderKanban },
    { title: "Skills", value: stats.skills, icon: Code2 },
    { title: "Services", value: stats.services, icon: Wrench },
    { title: "Messages", value: stats.messages, icon: MessageSquare },
    { title: "Testimonials", value: stats.testimonials, icon: Star },
    { title: "Blogs", value: stats.blogs, icon: FileText },
    { title: "Subscribers", value: stats.subscribers, icon: Mail },
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-black">Dashboard Overview</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-white/50">
            Quick summary of your portfolio content and activity.
          </p>
        </div>

        <button
          type="button"
          onClick={getAnalytics}
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

      {error && (
        <div className="flex items-start gap-3 rounded-[24px] border border-amber-500/25 bg-amber-500/10 p-5 text-amber-700 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 shrink-0" size={20} />
          <div>
            <p className="font-bold">Dashboard data could not be loaded.</p>
            <p className="mt-1 text-sm opacity-80">{error}</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-[28px] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#07111f]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-600 dark:text-white/65">
                  {card.title}
                </h3>

                <Icon size={22} />
              </div>

              <h2 className="mt-5 text-4xl font-black">
                {loading ? "..." : card.value || 0}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="rounded-[30px] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#07111f]">
        <h2 className="mb-6 text-2xl font-black">Growth Analytics</h2>

        <GrowthChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#07111f]">
          <h3 className="mb-4 text-xl font-black">Recent Activities</h3>

          {analytics.recentActivities.length ? (
            analytics.recentActivities.map((item) => (
              <div
                key={item._id}
                className="mb-3 rounded-2xl border border-black/10 bg-black/5 p-4 last:mb-0 dark:border-white/10 dark:bg-white/5"
              >
                <p className="font-bold">{item.action}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                  {item.details || item.module || "Activity"}
                </p>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-black/5 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-white/50">
              No recent activities yet.
            </p>
          )}
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#07111f]">
          <h3 className="mb-4 text-xl font-black">Notifications</h3>

          {analytics.recentNotifications.length ? (
            analytics.recentNotifications.map((item) => (
              <div
                key={item._id}
                className="mb-3 rounded-2xl border border-black/10 bg-black/5 p-4 last:mb-0 dark:border-white/10 dark:bg-white/5"
              >
                <p className="font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
                  {item.message}
                </p>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-black/5 p-5 text-sm text-slate-500 dark:bg-white/5 dark:text-white/50">
              No notifications yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
