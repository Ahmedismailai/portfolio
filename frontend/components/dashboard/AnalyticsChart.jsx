"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "May 10", visitors: 120 },
  { name: "May 11", visitors: 360 },
  { name: "May 12", visitors: 290 },
  { name: "May 13", visitors: 560 },
  { name: "May 14", visitors: 784 },
  { name: "May 15", visitors: 700 },
  { name: "May 16", visitors: 860 },
];

export default function AnalyticsChart() {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black">Website Analytics</h2>
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          Last 7 Days
        </button>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#a855f7"
              fillOpacity={1}
              fill="url(#colorVisitors)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
