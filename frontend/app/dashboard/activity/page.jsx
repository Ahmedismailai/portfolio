"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { Activity } from "lucide-react";

const relativeTime = (date) => {
  const timestamp = new Date(date).getTime();
  if (!Number.isFinite(timestamp)) return "Recently";

  const seconds = Math.round((timestamp - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  const ranges = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Infinity, "year"],
  ];

  let value = seconds;
  for (const [divisor, unit] of ranges) {
    if (Math.abs(value) < divisor) return formatter.format(Math.round(value), unit);
    value /= divisor;
  }

  return "Recently";
};

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const { data } = await API.get("/activity");

      setActivities(data.activities || []);
    };

    getActivities();
  }, []);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black text-black dark:text-white">
          <Activity />
          Activity Logs
        </h1>

        <p className="mt-2 text-gray-500 dark:text-white/50">
          Recent admin actions.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((item) => (
          <div
            key={item._id}
            className="
            rounded-[24px]
            border
            border-black/10
            bg-white/80
            p-5
            dark:border-white/10
            dark:bg-[#07111f]/80
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-black dark:text-white">
                  {item.action}
                </h3>

                <p className="text-sm text-gray-500 dark:text-white/50">
                  {item.module}
                </p>
              </div>

              <span className="text-xs text-gray-500 dark:text-white/40">
                {relativeTime(item.createdAt)}
              </span>
            </div>

            <p className="mt-3 text-gray-600 dark:text-white/60">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
