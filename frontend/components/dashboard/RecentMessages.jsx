"use client";

export default function RecentMessages({ messages = [] }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black text-white">Recent Messages</h2>

        <a
          href="/dashboard/messages"
          className="font-semibold text-violet-300 transition hover:text-fuchsia-400"
        >
          View All
        </a>
      </div>

      <div className="space-y-5">
        {messages.length === 0 ? (
          <p className="text-white/50">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m._id}
              className="flex items-center gap-4 border-b border-white/5 pb-4 last:border-0"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold text-white">
                {m.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white">{m.name}</h3>

                <p className="truncate text-sm text-white/55">{m.message}</p>
              </div>

              {!m.isRead && (
                <span className="rounded-full bg-fuchsia-500 px-2 py-1 text-xs font-semibold text-white">
                  New
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
