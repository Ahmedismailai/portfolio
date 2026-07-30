"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Trash2, Pencil, Plus } from "lucide-react";

const initialForm = {
  year: "",
  role: "",
  company: "",
  description: "",
  icon: "BriefcaseBusiness",
  color: "from-fuchsia-500 to-violet-600",
};

export default function DashboardExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const getExperiences = async () => {
    const { data } = await API.get("/experience");
    setExperiences(data.experiences || []);
  };

  useEffect(() => {
    getExperiences();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/experience/${editId}`, form);
    } else {
      await API.post("/experience", form);
    }

    setForm(initialForm);
    setEditId(null);
    getExperiences();
  };

  const editHandler = (item) => {
    setEditId(item._id);
    setForm({
      year: item.year,
      role: item.role,
      company: item.company,
      description: item.description || "",
      icon: item.icon || "BriefcaseBusiness",
      color: item.color || "from-fuchsia-500 to-violet-600",
    });
  };

  const deleteHandler = async (id) => {
    if (!confirm("Delete this experience?")) return;

    await API.delete(`/experience/${id}`);
    getExperiences();
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Experience Management</h1>
        <p className="mt-2 text-white/55">
          Add and manage your work experience timeline.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid gap-4 rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6 md:grid-cols-2"
      >
        <input
          name="year"
          value={form.year}
          onChange={changeHandler}
          placeholder="Year: 2024 - Present"
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <input
          name="role"
          value={form.role}
          onChange={changeHandler}
          placeholder="Role: Full Stack Developer"
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <input
          name="company"
          value={form.company}
          onChange={changeHandler}
          placeholder="Company: Tech Solutions Inc."
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <input
          name="icon"
          value={form.icon}
          onChange={changeHandler}
          placeholder="Icon: BriefcaseBusiness"
          className="rounded-2xl bg-white/5 p-4 outline-none"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={changeHandler}
          placeholder="Experience description"
          className="rounded-2xl bg-white/5 p-4 outline-none md:col-span-2"
          rows={4}
        />

        <select
          name="color"
          value={form.color}
          onChange={changeHandler}
          className="rounded-2xl bg-[#111827] p-4 outline-none md:col-span-2"
        >
          <option value="from-fuchsia-500 to-violet-600">
            Purple / Fuchsia
          </option>
          <option value="from-violet-500 to-purple-700">Violet / Purple</option>
          <option value="from-cyan-400 to-blue-600">Cyan / Blue</option>
          <option value="from-pink-500 to-fuchsia-600">Pink / Fuchsia</option>
        </select>

        <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold md:col-span-2">
          {editId ? (
            <>
              <Pencil size={18} /> Update Experience
            </>
          ) : (
            <>
              <Plus size={18} /> Add Experience
            </>
          )}
        </button>
      </form>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {experiences.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[24px] border border-white/10 bg-[#07111f]/70 p-5"
          >
            <div
              className={`mb-5 h-[3px] rounded-full bg-gradient-to-r ${item.color}`}
            />

            <p className="text-sm font-semibold text-violet-300">{item.year}</p>

            <h2 className="mt-2 text-xl font-black">{item.role}</h2>

            <p className="mt-1 text-white/60">{item.company}</p>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/50">
              {item.description}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => editHandler(item)}
                className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => deleteHandler(item._id)}
                className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300"
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
