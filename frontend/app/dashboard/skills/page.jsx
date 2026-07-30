"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Edit, Plus, Trash2, X } from "lucide-react";

const initialForm = {
  name: "",
  percent: "",
  icon: "",
  category: "",
};

export default function DashboardSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSkills = async () => {
    try {
      const { data } = await API.get("/skills");
      setSkills(data.skills || []);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        percent: Number(form.percent),
        icon: form.icon,
        category: form.category,
      };

      if (editId) {
        await API.put(`/skills/${editId}`, payload);
      } else {
        await API.post("/skills", payload);
      }

      resetForm();
      getSkills();
    } catch (error) {
      alert(error.response?.data?.message || "Skill save failed");
    } finally {
      setLoading(false);
    }
  };

  const editHandler = (skill) => {
    setEditId(skill._id);

    setForm({
      name: skill.name || "",
      percent: skill.percent || "",
      icon: skill.icon || "",
      category: skill.category || "",
    });
  };

  const deleteSkill = async (id) => {
    if (!confirm("Delete this skill?")) return;

    try {
      await API.delete(`/skills/${id}`);
      getSkills();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Skills Management</h1>
        <p className="mt-2 text-white/50">
          Add, update and delete your portfolio skills.
        </p>
      </div>

      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 rounded-[30px] border border-white/10 bg-[#07111f]/80 p-6 shadow-[0_0_35px_rgba(139,92,246,0.12)] backdrop-blur-xl md:grid-cols-2"
      >
        <input
          name="name"
          value={form.name}
          onChange={changeHandler}
          placeholder="Skill Name e.g. React.js"
          className="rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
          required
        />

        <input
          type="number"
          name="percent"
          value={form.percent}
          onChange={changeHandler}
          placeholder="Percent e.g. 90"
          min="0"
          max="100"
          className="rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
          required
        />

        <input
          name="icon"
          value={form.icon}
          onChange={changeHandler}
          placeholder="Icon Name e.g. SiReact"
          className="rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
        />

        <input
          name="category"
          value={form.category}
          onChange={changeHandler}
          placeholder="Category e.g. Frontend"
          className="rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
        />

        <div className="flex gap-4 md:col-span-2">
          <button
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-[0_0_35px_rgba(168,85,247,0.35)] disabled:opacity-60"
          >
            {editId ? <Edit size={20} /> : <Plus size={20} />}
            {loading ? "Saving..." : editId ? "Update Skill" : "Add Skill"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white/80 hover:bg-white/10"
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </motion.form>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -7, scale: 1.01 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[26px] border border-white/10 bg-[#07111f]/80 p-6 shadow-[0_0_35px_rgba(139,92,246,0.1)]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">{skill.name}</h2>
                <p className="mt-1 text-sm text-violet-300">
                  {skill.category || "General"}
                </p>
                {skill.icon && (
                  <p className="mt-1 text-xs text-white/40">{skill.icon}</p>
                )}
              </div>

              <span className="text-2xl font-black text-white">
                {skill.percent}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => editHandler(skill)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => deleteSkill(skill._id)}
                className="flex items-center justify-center rounded-xl bg-red-500/15 px-4 py-3 text-red-300 hover:bg-red-500/25"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
