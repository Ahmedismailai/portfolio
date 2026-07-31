"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Save, Settings, LayoutTemplate, Layers } from "lucide-react";

const initialForm = {
  siteName: "",
  siteDescription: "",
  heroEyebrow: "",
  heroGreeting: "",
  heroName: "",
  heroTitle: "",
  heroDescription: "",
  heroImage: "",
  heroSecondaryCtaText: "",
  card1Title: "",
  card1Subtitle: "",
  card2Title: "",
  card2Subtitle: "",
  card3Title: "",
  card3Subtitle: "",
  card4Title: "",
  card4Subtitle: "",
  aboutBadge: "",
  aboutTitle: "",
  aboutBio: "",
  aboutExpYears: 5,
  aboutProjectsCount: 20,
  aboutClientsCount: 15,
  aboutTechCount: 15,
  resumeUrl: "",
  logo: "",
  email: "",
  phone: "",
  location: "",
  footerText: "",
  github: "",
  linkedin: "",
  facebook: "",
  instagram: "",
  twitter: "",
  theme: "dark",
};

export default function DashboardSettingsPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const { data } = await API.get("/settings");
        const setting = data.setting || {};
        setForm({
          ...initialForm,
          ...setting,
          card1Title: setting.heroCards?.card1Title || "Thoughtful interfaces",
          card1Subtitle: setting.heroCards?.card1Subtitle || "Focus",
          card2Title: setting.heroCards?.card2Title || "Detail matters",
          card2Subtitle: setting.heroCards?.card2Subtitle || "From concept to launch",
          card3Title: setting.heroCards?.card3Title || "Clean engineering",
          card3Subtitle: setting.heroCards?.card3Subtitle || "Robust Stack",
          card4Title: setting.heroCards?.card4Title || "Built for impact",
          card4Subtitle: setting.heroCards?.card4Subtitle || "Fast, polished, scalable",
          heroImage: setting.heroImage?.url || "",
          logo: setting.logo?.url || "",
          github: setting.socialLinks?.github || "",
          linkedin: setting.socialLinks?.linkedin || "",
          facebook: setting.socialLinks?.facebook || "",
          instagram: setting.socialLinks?.instagram || "",
          twitter: setting.socialLinks?.twitter || "",
        });
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

    getSettings();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await API.put("/settings", form);
      alert("Settings updated successfully! Check your homepage to see live changes.");
    } catch (error) {
      alert(error.response?.data?.message || "Settings update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black text-black dark:text-white">
          <Settings className="text-fuchsia-500" />
          Settings & Hero Controls
        </h1>

        <p className="mt-2 text-gray-500 dark:text-white/50">
          Update your site information, hero section fields, floating cards, social links, and theme.
        </p>
      </div>

      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 rounded-[30px] border border-black/10 bg-white/80 p-6 shadow-[0_0_35px_rgba(139,92,246,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/80 md:grid-cols-2"
      >
        {/* Section 1: Hero Main Controls */}
        <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-5 md:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-violet-600 dark:text-fuchsia-400">
            <LayoutTemplate size={22} />
            Hero Section Main Controls
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Eyebrow Badge Text</label>
              <input
                name="heroEyebrow"
                value={form.heroEyebrow}
                onChange={changeHandler}
                placeholder="e.g. Available for selected work"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Greeting Text</label>
              <input
                name="heroGreeting"
                value={form.heroGreeting}
                onChange={changeHandler}
                placeholder="e.g. Hi, I’m"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Your Name (Hero Header)</label>
              <input
                name="heroName"
                value={form.heroName}
                onChange={changeHandler}
                placeholder="Hero Name"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Job Title / Role</label>
              <input
                name="heroTitle"
                value={form.heroTitle}
                onChange={changeHandler}
                placeholder="Hero Title (e.g. Full Stack Developer)"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Hero Description / Tagline</label>
              <textarea
                name="heroDescription"
                value={form.heroDescription}
                onChange={changeHandler}
                placeholder="Hero Description"
                rows={3}
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Hero Profile/Avatar Image URL</label>
              <input
                name="heroImage"
                value={form.heroImage}
                onChange={changeHandler}
                placeholder="https://... or /hero.png"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Secondary CTA Button Text</label>
              <input
                name="heroSecondaryCtaText"
                value={form.heroSecondaryCtaText}
                onChange={changeHandler}
                placeholder="e.g. Hire Me"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Resume / CV Download URL</label>
              <input
                name="resumeUrl"
                value={form.resumeUrl}
                onChange={changeHandler}
                placeholder="Resume URL"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 2: 4 Floating Cards Controls */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 md:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-cyan-600 dark:text-cyan-400">
            <Layers size={22} />
            Hero 4 Floating Cards Controls
          </div>
          <p className="mb-5 text-xs text-black/60 dark:text-white/60">
            Customize the 4 animated floating cards positioned around your avatar image in the Hero section.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1 (Top Left) */}
            <div className="space-y-3 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-[#081322]/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-500">Card 1 (Top Left)</h4>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Tagline / Subtitle</label>
                <input
                  name="card1Subtitle"
                  value={form.card1Subtitle}
                  onChange={changeHandler}
                  placeholder="e.g. Focus"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Title / Value</label>
                <input
                  name="card1Title"
                  value={form.card1Title}
                  onChange={changeHandler}
                  placeholder="e.g. Thoughtful interfaces"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
            </div>

            {/* Card 2 (Top Right) */}
            <div className="space-y-3 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-[#081322]/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-500">Card 2 (Top Right)</h4>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Title / Header</label>
                <input
                  name="card2Title"
                  value={form.card2Title}
                  onChange={changeHandler}
                  placeholder="e.g. Detail matters"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Subtitle / Description</label>
                <input
                  name="card2Subtitle"
                  value={form.card2Subtitle}
                  onChange={changeHandler}
                  placeholder="e.g. From concept to launch"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
            </div>

            {/* Card 3 (Bottom Left) */}
            <div className="space-y-3 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-[#081322]/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">Card 3 (Bottom Left)</h4>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Title / Header</label>
                <input
                  name="card3Title"
                  value={form.card3Title}
                  onChange={changeHandler}
                  placeholder="e.g. Clean engineering"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Subtitle / Tech</label>
                <input
                  name="card3Subtitle"
                  value={form.card3Subtitle}
                  onChange={changeHandler}
                  placeholder="e.g. Robust Stack"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
            </div>

            {/* Card 4 (Bottom Right) */}
            <div className="space-y-3 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-[#081322]/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Card 4 (Bottom Right)</h4>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Title / Header</label>
                <input
                  name="card4Title"
                  value={form.card4Title}
                  onChange={changeHandler}
                  placeholder="e.g. Built for impact"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/70 dark:text-white/70">Subtitle / Description</label>
                <input
                  name="card4Subtitle"
                  value={form.card4Subtitle}
                  onChange={changeHandler}
                  placeholder="e.g. Fast, polished, scalable"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: About Me Controls */}
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 md:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-violet-600 dark:text-violet-400">
            <LayoutTemplate size={22} />
            About Me Section Controls
          </div>
          <p className="mb-5 text-xs text-black/60 dark:text-white/60">
            Customize your bio paragraph, experience years, project stats, and counters displayed in the About Me section.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Badge Label</label>
              <input
                name="aboutBadge"
                value={form.aboutBadge}
                onChange={changeHandler}
                placeholder="e.g. About Me"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Section Header Title</label>
              <input
                name="aboutTitle"
                value={form.aboutTitle}
                onChange={changeHandler}
                placeholder="e.g. Full Stack & AI Engineer"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">About Bio Description</label>
              <textarea
                name="aboutBio"
                value={form.aboutBio}
                onChange={changeHandler}
                placeholder="Write a brief overview about yourself, your skills, and experience..."
                rows={4}
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Years Experience Count</label>
              <input
                type="number"
                name="aboutExpYears"
                value={form.aboutExpYears}
                onChange={changeHandler}
                placeholder="e.g. 5"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Projects Completed Count</label>
              <input
                type="number"
                name="aboutProjectsCount"
                value={form.aboutProjectsCount}
                onChange={changeHandler}
                placeholder="e.g. 20"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Happy Clients Count</label>
              <input
                type="number"
                name="aboutClientsCount"
                value={form.aboutClientsCount}
                onChange={changeHandler}
                placeholder="e.g. 15"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-black/70 dark:text-white/70">Technologies Mastered Count</label>
              <input
                type="number"
                name="aboutTechCount"
                value={form.aboutTechCount}
                onChange={changeHandler}
                placeholder="e.g. 15"
                className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 text-black outline-none focus:border-violet-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: General & Social Settings */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-base font-bold text-black dark:text-white">General & Social Info</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="siteName"
              value={form.siteName}
              onChange={changeHandler}
              placeholder="Site Name"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="siteDescription"
              value={form.siteDescription}
              onChange={changeHandler}
              placeholder="Site Description"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="email"
              value={form.email}
              onChange={changeHandler}
              placeholder="Email"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={changeHandler}
              placeholder="Phone"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="location"
              value={form.location}
              onChange={changeHandler}
              placeholder="Address / Location"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white md:col-span-2"
            />

            <input
              name="github"
              value={form.github}
              onChange={changeHandler}
              placeholder="GitHub URL"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="linkedin"
              value={form.linkedin}
              onChange={changeHandler}
              placeholder="LinkedIn URL"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="twitter"
              value={form.twitter}
              onChange={changeHandler}
              placeholder="Twitter URL"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <input
              name="instagram"
              value={form.instagram}
              onChange={changeHandler}
              placeholder="Instagram URL"
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
            />

            <select
              name="theme"
              value={form.theme}
              onChange={changeHandler}
              className="rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white md:col-span-2"
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
              <option value="system">System Theme</option>
            </select>

            <textarea
              name="footerText"
              value={form.footerText}
              onChange={changeHandler}
              placeholder="Footer Text"
              rows={3}
              className="resize-none rounded-2xl border border-black/10 bg-white px-5 py-3.5 text-black outline-none focus:border-fuchsia-500 dark:border-white/10 dark:bg-[#0b1424] dark:text-white md:col-span-2"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-[0_0_35px_rgba(168,85,247,0.35)] disabled:opacity-60 md:col-span-2"
        >
          <Save size={20} />
          {loading ? "Saving Settings..." : "Save All Settings"}
        </button>
      </motion.form>
    </section>
  );
}
