"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Trash2, RefreshCw } from "lucide-react";

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/contact");
      console.log("CONTACT MESSAGES:", data);

      setMessages(data.messages || []);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!confirm("Delete this message?")) return;

    await API.delete(`/contact/${id}`);
    getMessages();
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black">Contact Messages</h1>
          <p className="mt-2 text-white/55">
            Manage all messages from your portfolio contact form.
          </p>
        </div>

        <button
          onClick={getMessages}
          className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-semibold text-violet-300"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="rounded-[24px] border border-white/10 bg-[#07111f]/70 p-6 text-white/60">
          Loading messages...
        </div>
      )}

      {error && (
        <div className="rounded-[24px] border border-red-500/30 bg-red-500/10 p-6 text-red-300">
          Error: {error}
        </div>
      )}

      {!loading && !error && messages.length === 0 && (
        <div className="rounded-[24px] border border-white/10 bg-[#07111f]/70 p-8 text-center">
          <h2 className="text-xl font-black">No messages found</h2>
          <p className="mt-2 text-white/55">
            এখনো contact form থেকে কোনো message আসেনি।
          </p>
        </div>
      )}

      <div className="grid gap-5">
        {messages.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[24px] border border-white/10 bg-[#07111f]/60 p-5"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">
                    {item.name || "Unknown User"}
                  </h2>
                </div>

                <p className="mt-1 text-sm text-violet-300">
                  {item.email || "No email"}
                </p>

                <h3 className="mt-4 font-bold">
                  {item.subject || "Portfolio Contact Message"}
                </h3>

                <p className="mt-3 leading-7 text-white/60">
                  {item.message || "No message"}
                </p>

                <p className="mt-4 text-xs text-white/40">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "No date"}
                </p>
              </div>

              <button
                onClick={() => deleteMessage(item._id)}
                className="rounded-xl bg-red-500/15 p-3 text-red-300"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}