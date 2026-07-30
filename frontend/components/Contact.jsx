"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";
import toast from "react-hot-toast";
import API from "@/lib/axios";
import { useHomeData } from "@/contex/HomeDataContext";

export default function Contact() {
  const { data } = useHomeData();
  const setting = data.setting;
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required");
      return;
    }

    try {
      setSending(true);
      toast.loading("Sending message...", { id: "contact" });

      await API.post("/contact", form);

      toast.success("Message sent successfully", { id: "contact" });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Message send failed", {
        id: "contact",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-14 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6"
    >
      <div className="absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_45px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/55 sm:p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Get In Touch
              </p>
            </div>

            <h2 className="text-3xl font-black text-black dark:text-white sm:text-4xl">
              Let’s Work Together
            </h2>

            <p className="mt-5 text-base leading-8 text-black/60 dark:text-white/60">
              Let’s work together to bring your ideas to life. Send me a message
              through the form or connect with me on any of the platforms below.
            </p>

            <div className="mt-10 space-y-6">
              {(() => {
                const getVal = (val, fallback) => {
                  if (!val || typeof val !== "string") return fallback;
                  const clean = val.trim();
                  if (!clean || clean.toLowerCase().includes("request") || clean.toLowerCase().includes("available")) return fallback;
                  return clean;
                };

                const emailVal = getVal(setting?.email, "sobujmd044@gmail.com");
                const phoneVal = getVal(setting?.phone, "+880 1710-566176");
                const locVal = getVal(setting?.location, "Cumilla, Bangladesh");

                return [
                  {
                    icon: FiMail,
                    title: "Email Address",
                    value: emailVal,
                    href: `mailto:${emailVal}`,
                  },
                  {
                    icon: FiPhone,
                    title: "Phone & WhatsApp",
                    value: phoneVal,
                    href: `tel:${phoneVal.replace(/\s+/g, "")}`,
                  },
                  {
                    icon: FiMapPin,
                    title: "Location",
                    value: locVal,
                    href: "#",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-500/40 bg-gradient-to-br from-cyan-500/15 via-violet-500/15 to-fuchsia-500/15 text-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.25)] dark:text-fuchsia-300">
                      <item.icon className="text-2xl" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-violet-600 dark:text-fuchsia-400">
                        {item.title}
                      </p>
                      {item.href !== "#" ? (
                        <a
                          href={item.href}
                          className="text-base font-extrabold text-slate-900 transition hover:text-fuchsia-500 dark:text-white dark:hover:text-cyan-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-extrabold text-slate-900 dark:text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ));
              })()}
            </div>

            <motion.div
              animate={{ y: [0, -14, 0], rotateY: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-0 right-8 hidden h-36 w-36 items-center justify-center rounded-[30px] bg-gradient-to-br from-cyan-500 via-violet-600 to-fuchsia-600 shadow-[0_0_60px_rgba(168,85,247,0.5)] lg:flex"
            >
              <FiSend className="text-6xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={submitHandler}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative space-y-5 rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/20 p-6 shadow-[0_10px_40px_rgba(168,85,247,0.08)] backdrop-blur-xl dark:border-white/15 dark:bg-gradient-to-br dark:from-[#0d1c33]/90 dark:via-[#14102d]/90 dark:to-[#1a0c2e]/90 md:p-8"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={changeHandler}
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="w-full rounded-2xl border border-slate-300/80 bg-white px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30 dark:border-white/15 dark:bg-[#0a1628]/90 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={changeHandler}
                  required
                  maxLength={254}
                  autoComplete="email"
                  className="w-full rounded-2xl border border-slate-300/80 bg-white px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30 dark:border-white/15 dark:bg-[#0a1628]/90 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Project Inquiry / Job Opportunity"
                value={form.subject}
                onChange={changeHandler}
                maxLength={150}
                className="w-full rounded-2xl border border-slate-300/80 bg-white px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30 dark:border-white/15 dark:bg-[#0a1628]/90 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Your Message *
              </label>
              <textarea
                rows="5"
                name="message"
                placeholder="Tell me about your project requirements..."
                value={form.message}
                onChange={changeHandler}
                required
                maxLength={5000}
                className="w-full resize-none rounded-2xl border border-slate-300/80 bg-white px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30 dark:border-white/15 dark:bg-[#0a1628]/90 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/30"
              />
            </div>

            <motion.button
              whileHover={{ scale: sending ? 1 : 1.02 }}
              whileTap={{ scale: sending ? 1 : 0.96 }}
              disabled={sending}
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-8 py-5 font-black text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] transition hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending Message..." : "Send Message"} <FiArrowRight />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
