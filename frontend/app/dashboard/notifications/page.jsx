"use client";

import { useCallback, useEffect, useState } from "react";
import { Bell, CheckCheck, Loader2, Trash2 } from "lucide-react";
import API from "@/lib/axios";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setError("");
      const { data } = await API.get("/notifications");
      setNotifications(data.notifications || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Notifications could not be loaded");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAllRead = async () => {
    await API.put("/notifications/read-all");
    setNotifications((items) => items.map((item) => ({ ...item, isRead: true })));
  };

  const markRead = async (id) => {
    await API.put(`/notifications/${id}/read`);
    setNotifications((items) => items.map((item) => item._id === id ? { ...item, isRead: true } : item));
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    await API.delete(`/notifications/${id}`);
    setNotifications((items) => items.filter((item) => item._id !== id));
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black"><Bell className="text-fuchsia-500" /> Notifications</h1>
          <p className="mt-2 text-gray-500 dark:text-white/50">Review recent portfolio activity.</p>
        </div>
        <button type="button" onClick={markAllRead} disabled={!notifications.some((item) => !item.isRead)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 font-bold disabled:opacity-50 dark:border-white/10 dark:bg-white/5"><CheckCheck size={18} /> Mark all read</button>
      </div>

      {error && <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-red-500">{error}</div>}
      {loading ? (
        <div className="flex items-center gap-3 text-gray-500"><Loader2 className="animate-spin" /> Loading notifications…</div>
      ) : notifications.length === 0 ? (
        <div className="rounded-[24px] border border-black/10 bg-black/5 p-8 text-center text-gray-500 dark:border-white/10 dark:bg-white/5">No notifications yet.</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <article key={item._id} className={`rounded-[24px] border p-5 ${item.isRead ? "border-black/10 bg-white dark:border-white/10 dark:bg-[#07111f]" : "border-fuchsia-500/30 bg-fuchsia-500/5"}`}>
              <div className="flex items-start justify-between gap-4">
                <button type="button" onClick={() => !item.isRead && markRead(item._id)} className="flex-1 text-left">
                  <div className="flex items-center gap-3"><h2 className="font-black">{item.title}</h2>{!item.isRead && <span className="rounded-full bg-fuchsia-500 px-2 py-1 text-[10px] font-bold text-white">NEW</span>}</div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-white/55">{item.message}</p>
                  <time className="mt-3 block text-xs text-gray-400">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</time>
                </button>
                <button type="button" onClick={() => deleteNotification(item._id)} aria-label="Delete notification" className="rounded-xl bg-red-500/10 p-3 text-red-500 hover:bg-red-500/20"><Trash2 size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
