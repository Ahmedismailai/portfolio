"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUp,
  FiFileText,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiX,
} from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useHomeData } from "@/contex/HomeDataContext";

export default function CTAFooter() {
  const { data } = useHomeData();
  const setting = data.setting;
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVal = (val, fallback) => {
    if (!val || typeof val !== "string") return fallback;
    const clean = val.trim();
    if (!clean || clean.toLowerCase().includes("request") || clean.toLowerCase().includes("available")) return fallback;
    return clean;
  };

  const emailVal = getVal(setting?.email, "sobujmd044@gmail.com");
  const phoneVal = getVal(setting?.phone, "+880 1710-566176");
  const locVal = getVal(setting?.location, "Cumilla, Bangladesh");

  return (
    <section className="relative z-20 overflow-hidden bg-white/80 px-4 pb-10 pt-16 text-black transition-colors duration-300 dark:bg-[#030712]/80 dark:text-white sm:px-6">
      <div className="absolute left-0 top-20 h-[320px] w-[320px] rounded-full bg-cyan-500/15 blur-[130px]" />
      <div className="absolute right-0 top-1/2 h-[360px] w-[360px] rounded-full bg-fuchsia-500/15 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/80 p-7 shadow-[0_0_55px_rgba(168,85,247,0.12)] backdrop-blur-xl dark:border-violet-500/30 dark:bg-gradient-to-r dark:from-[#07111f] dark:via-[#11104a]/90 dark:to-[#4c1d95]/90 dark:shadow-[0_25px_90px_rgba(124,58,237,0.35)] md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_35%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr_1fr_180px] lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                Contact
              </p>
            </div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
              Let’s Work Together
            </h2>

            <p className="mt-4 max-w-md text-sm font-medium leading-7 text-slate-700 dark:text-slate-200">
              Have a project in mind? Let’s discuss how I can help you bring
              your ideas to life.
            </p>
          </div>

          {[
            {
              icon: FiMail,
              title: "Email",
              text: emailVal,
              href: `mailto:${emailVal}`,
            },
            {
              icon: FiPhone,
              title: "Phone",
              text: phoneVal,
              href: `tel:${phoneVal.replace(/\s+/g, "")}`,
            },
            {
              icon: FiMapPin,
              title: "Location",
              text: locVal,
              href: "#",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="group flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-500/40 bg-gradient-to-br from-cyan-500/15 via-violet-500/15 to-fuchsia-500/15 text-fuchsia-500 shadow-[0_0_25px_rgba(168,85,247,0.22)] backdrop-blur-xl transition group-hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] dark:text-fuchsia-300">
                <item.icon className="text-xl" />
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                {item.href !== "#" ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-sm font-semibold text-slate-700 transition hover:text-fuchsia-500 dark:text-slate-200 dark:hover:text-cyan-300"
                  >
                    {item.text}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {item.text}
                  </p>
                )}
              </div>
            </motion.div>
          ))}

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-600 px-7 py-4 font-black text-white shadow-[0_0_45px_rgba(168,85,247,0.45)] hover:shadow-[0_0_55px_rgba(168,85,247,0.65)]"
          >
            Get In Touch <FiArrowRight />
          </motion.a>
        </div>
      </motion.div>

      <footer className="relative mx-auto mt-12 grid max-w-7xl gap-8 border-t border-slate-200/80 pt-8 text-center dark:border-white/10 md:grid-cols-3 md:items-center md:text-left">
        <div>
          <div className="flex justify-center md:justify-start">
            <Image
              src="/IMG_20260518_131508.png"
              alt="Logo"
              width={78}
              height={78}
              className="h-auto w-[78px] object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]"
            />
          </div>

          <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} {setting?.heroName || "Ahmed Ismail"} — Full Stack & AI Engineer.
            <br />
            {setting?.footerText && !setting.footerText.includes("reserved")
              ? setting.footerText
              : "Crafted with precision, passion, and modern web technologies. All rights reserved."}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          {[
            { icon: FaGithub, href: setting?.socialLinks?.github || "https://github.com" },
            { icon: FaLinkedinIn, href: setting?.socialLinks?.linkedin || "https://linkedin.com" },
            { icon: FaTwitter, href: setting?.socialLinks?.twitter || "https://twitter.com" },
            { icon: FaInstagram, href: setting?.socialLinks?.instagram || "https://instagram.com" },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.1 }}
              transition={{ duration: 0.25 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-700 shadow-[0_0_25px_rgba(168,85,247,0.08)] backdrop-blur-xl transition hover:border-fuchsia-500 hover:text-fuchsia-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
            >
              <item.icon className="text-lg" />
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300 md:justify-end">
          <button
            onClick={() => setActiveModal("privacy")}
            className="transition hover:text-fuchsia-500 dark:hover:text-cyan-300 cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveModal("terms")}
            className="transition hover:text-fuchsia-500 dark:hover:text-cyan-300 cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </footer>

      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/50 bg-gradient-to-r from-cyan-500/80 via-violet-600/80 to-fuchsia-600/80 text-white shadow-[0_0_35px_rgba(168,85,247,0.5)] backdrop-blur-xl"
      >
        <FiArrowUp className="text-xl" />
      </motion.button>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/90 p-6 text-slate-900 shadow-[0_0_50px_rgba(168,85,247,0.3)] backdrop-blur-2xl dark:bg-slate-900/90 dark:text-white sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  {activeModal === "privacy" ? (
                    <FiShield className="text-2xl text-cyan-500" />
                  ) : (
                    <FiFileText className="text-2xl text-fuchsia-500" />
                  )}
                  <h3 className="text-xl font-bold">
                    {activeModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-white/70 dark:hover:text-white"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="mt-5 max-h-[60vh] overflow-y-auto space-y-4 pr-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {activeModal === "privacy" ? (
                  <>
                    <p className="font-semibold text-black dark:text-white">Effective Date: {currentYear}</p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-cyan-600 dark:text-cyan-400">1. Information Collection</h4>
                      <p>Your privacy is respected. Information submitted via our forms is used solely for professional communication.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-black dark:text-white">Effective Date: {currentYear}</p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-fuchsia-600 dark:text-fuchsia-400">1. Services</h4>
                      <p>Software development services are provided based on agreed project scopes.</p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6 flex justify-end border-t border-black/10 pt-4 dark:border-white/10">
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
