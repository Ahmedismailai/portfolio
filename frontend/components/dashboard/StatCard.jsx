"use client";

import { motion } from "framer-motion";
import { FolderKanban, Code2, MessageSquare, Star } from "lucide-react";

const iconMap = {
  FolderKanban,
  Code2,
  MessageSquare,
  Star,
};

export default function StatCard({ title, value, icon, color, percent }) {
  const Icon = iconMap[icon] || FolderKanban;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="rounded-[26px] border border-white/10 bg-[#07111f]/80 p-6 shadow-[0_0_35px_rgba(139,92,246,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-5">
        <div
          className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${color} shadow-[0_0_35px_rgba(168,85,247,0.35)]`}
        >
          <Icon size={30} className="text-white" />
        </div>

        <div>
          <p className="text-white/60">{title}</p>

          <h3 className="mt-1 text-3xl font-black text-white">{value}</h3>

          <p className="mt-2 text-sm text-emerald-400">
            ↑ {percent}% from last month
          </p>
        </div>
      </div>
    </motion.div>
  );
}
