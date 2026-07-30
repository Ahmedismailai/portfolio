import { Code2, FolderPlus, MessageSquare, Star } from "lucide-react";

const actions = [
  ["Add New Project", FolderPlus, "from-violet-500 to-fuchsia-500"],
  ["Add New Skill", Code2, "from-blue-500 to-cyan-500"],
  ["Add Testimonial", Star, "from-yellow-500 to-orange-500"],
  ["View Messages", MessageSquare, "from-purple-500 to-violet-600"],
];

export default function QuickActions() {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6">
      <h2 className="mb-6 text-xl font-black">Quick Actions</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map(([label, Icon, color]) => (
          <button
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left hover:bg-white/10"
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${color}`}
            >
              <Icon />
            </span>
            <span className="font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
