"use client";

import { useEffect, useState } from "react";
import API, { API_BASE_URL } from "@/lib/axios";
import { Download, Mail, Trash2 } from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);

  const getSubscribers = async () => {
    const { data } = await API.get("/subscribers");
    setSubscribers(data.subscribers || []);
  };

  useEffect(() => {
    getSubscribers();
  }, []);

  const deleteSubscriber = async (id) => {
    if (!confirm("Delete subscriber?")) return;

    await API.delete(`/subscribers/${id}`);
    getSubscribers();
  };

  const exportCSV = () => {
    window.open(`${API_BASE_URL}/subscribers/export/csv`, "_blank");
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black text-black dark:text-white">
            <Mail className="text-fuchsia-500" />
            Subscribers
          </h1>

          <p className="mt-2 text-gray-500 dark:text-white/50">
            Manage your newsletter email list.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-3 font-bold text-white"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-black/10 bg-white/80 dark:border-white/10 dark:bg-[#07111f]/80">
        {subscribers.length === 0 ? (
          <p className="p-6 text-gray-500 dark:text-white/50">
            No subscribers yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                <tr>
                  <th className="p-4 text-left text-sm text-gray-500 dark:text-white/50">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm text-gray-500 dark:text-white/50">
                    Email
                  </th>
                  <th className="p-4 text-left text-sm text-gray-500 dark:text-white/50">
                    Source
                  </th>
                  <th className="p-4 text-left text-sm text-gray-500 dark:text-white/50">
                    Date
                  </th>
                  <th className="p-4 text-right text-sm text-gray-500 dark:text-white/50">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {subscribers.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-black/5 last:border-0 dark:border-white/5"
                  >
                    <td className="p-4 font-semibold text-black dark:text-white">
                      {item.name || "Unknown"}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-white/60">
                      {item.email}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-white/60">
                      {item.source}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-white/60">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteSubscriber(item._id)}
                        className="rounded-xl bg-red-500/15 p-3 text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
