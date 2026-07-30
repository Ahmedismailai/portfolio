"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Plus, Save, Trash2, RefreshCw } from "lucide-react";

const icons = [
  "FaReact",
  "SiNextdotjs",
  "SiJavascript",
  "SiTypescript",
  "SiRedux",
  "SiReactquery",
  "SiTailwindcss",
  "SiBootstrap",
  "SiSass",
  "SiVuedotjs",
  "SiNuxtdotjs",
  "SiAngular",
  "SiSvelte",
  "SiFramer",
  "SiThreedotjs",

  "FaNodeJs",
  "SiExpress",
  "SiNestjs",
  "SiFastapi",
  "SiLaravel",
  "SiPhp",
  "SiSocketdotio",
  "SiJsonwebtokens",

  "SiMongodb",
  "SiMongoose",
  "SiMysql",
  "SiPostgresql",
  "SiRedis",
  "SiFirebase",
  "SiSupabase",
  "SiPrisma",

  "SiDocker",
  "SiKubernetes",
  "SiVercel",
  "SiNetlify",
  "SiCloudflare",
  "SiAmazon",
  "SiGooglecloud",

  "SiGraphql",
  "SiAxios",
  "SiPostman",
  "SiSwagger",

  "TbBrandReactNative",
  "SiAndroid",
  "SiIos",
  "SiFlutter",
  "SiDart",

  "FaPython",
  "SiC",
  "SiCplusplus",
  "SiCsharp",
  "SiJava",

  "FaGithub",
  "FaGitAlt",
  "SiGithubactions",

  "SiFigma",
  "SiCanva",
  "SiAdobephotoshop",

  "FaHtml5",
  "FaCss3Alt",

  "SiWordpress",
  "SiShopify",

  "SiGoogleanalytics",
  "SiGooglesearchconsole",

  "SiJest",
  "SiCypress",

  "SiElectron",

  "SiNpm",
  "SiYarn",

  "SiLinux",
  "SiWindows",
];

const colors = [
  "text-cyan-400",
  "text-sky-400",
  "text-blue-400",
  "text-violet-400",
  "text-fuchsia-400",
  "text-green-400",
  "text-emerald-400",
  "text-yellow-400",
  "text-orange-400",
  "text-red-400",
  "text-white",
  "text-slate-300",
];

const initialForm = {
  name: "",
  icon: "FaReact",
  color: "text-cyan-400",
};

export default function WorkWithDashboard() {
  const [data, setData] = useState({
    title: "I work with",
    badge: "Modern Stack",
    items: [],
  });

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/work-with");

      setData({
        title: data.title || "I work with",
        badge: data.badge || "Modern Stack",
        items: data.items || [],
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load work with data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateTitleBadge = async () => {
    try {
      setSaving(true);

      const { data: resData } = await API.put("/work-with", {
        title: data.title,
        badge: data.badge,
        items: data.items,
      });

      setData({
        title: resData.title || data.title,
        badge: resData.badge || data.badge,
        items: resData.items || [],
      });

      alert("Section text updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const { data: resData } = await API.post("/work-with/item", form);

      setData({
        title: resData.title || data.title,
        badge: resData.badge || data.badge,
        items: resData.items || [],
      });

      setForm(initialForm);
    } catch (error) {
      alert(error.response?.data?.message || "Icon add failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this icon?")) return;

    try {
      const { data: resData } = await API.delete(`/work-with/item/${id}`);

      setData({
        title: resData.title || resData.data?.title || data.title,
        badge: resData.badge || resData.data?.badge || data.badge,
        items: resData.items || resData.data?.items || [],
      });
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <p className="text-white/60">Loading work with section...</p>;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black">Work With Management</h1>
          <p className="mt-2 text-white/55">
            Manage your technology stack icons and section text.
          </p>
        </div>

        <button
          onClick={getData}
          className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-semibold text-violet-300"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6">
          <h2 className="mb-5 text-2xl font-black">Section Text</h2>

          <div className="grid gap-4">
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Section Title"
              className="rounded-2xl bg-white/5 p-4 outline-none"
            />

            <input
              value={data.badge}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              placeholder="Section Badge"
              className="rounded-2xl bg-white/5 p-4 outline-none"
            />

            <button
              onClick={updateTitleBadge}
              disabled={saving}
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Section Text"}
            </button>
          </div>
        </div>

        <form
          onSubmit={addItem}
          className="rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6"
        >
          <h2 className="mb-5 text-2xl font-black">Add New Stack Icon</h2>

          <div className="grid gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name, e.g. Three.js"
              className="rounded-2xl bg-white/5 p-4 outline-none"
              required
            />

            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="rounded-2xl bg-[#111827] p-4 outline-none"
            >
              {icons.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>

            <select
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="rounded-2xl bg-[#111827] p-4 outline-none"
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/50">Preview</p>

              <motion.div
                key={`${form.icon}-${form.color}-${form.name}`}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1424]/80 p-4"
              >
                <h3 className="font-black">{form.name || "Icon Name"}</h3>

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 4, -4, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative grid h-12 w-12 place-items-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.35, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute h-8 w-8 rounded-full bg-fuchsia-500/30 blur-md"
                  />

                  <p className={`relative text-xs font-black ${form.color}`}>
                    {form.icon}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <button
              disabled={saving}
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 font-bold disabled:opacity-60"
            >
              <Plus size={18} />
              {saving ? "Adding..." : "Add Icon"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">All Stack Icons</h2>
            <p className="mt-1 text-sm text-white/45">
              Total {data.items?.length || 0} icons
            </p>
          </div>
        </div>

        {data.items?.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/55">
            No icons added yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.items?.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group rounded-[22px] border border-white/10 bg-[#0b1424]/80 p-5 transition-all duration-300 hover:border-fuchsia-500/35 hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black">{item.name}</h3>
                    <p className={`mt-2 text-sm font-bold ${item.color}`}>
                      {item.icon}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteItem(item._id)}
                    className="rounded-xl bg-red-500/15 p-3 text-red-300 transition hover:bg-red-500/25"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
