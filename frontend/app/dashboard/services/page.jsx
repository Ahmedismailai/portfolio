"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  FiCode,
  FiServer,
  FiShoppingBag,
  FiPenTool,
  FiSearch,
  FiDatabase,
  FiSmartphone,
  FiMonitor,
  FiCloud,
  FiShield,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

const serviceCategories = {
  frontend: {
    label: "Frontend Development",
    icon: "FiCode",
    IconComponent: FiCode,
  },
  backend: {
    label: "Backend Development",
    icon: "FiServer",
    IconComponent: FiServer,
  },
  api: {
    label: "API Development",
    icon: "FiPenTool",
    IconComponent: FiPenTool,
  },
  seo: {
    label: "SEO Optimization",
    icon: "FiSearch",
    IconComponent: FiSearch,
  },
  database: {
    label: "Database Design",
    icon: "FiDatabase",
    IconComponent: FiDatabase,
  },
  ecommerce: {
    label: "E-commerce Website",
    icon: "FiShoppingBag",
    IconComponent: FiShoppingBag,
  },
  responsive: {
    label: "Mobile Responsive",
    icon: "FiSmartphone",
    IconComponent: FiSmartphone,
  },
  design: {
    label: "Web Design",
    icon: "FiMonitor",
    IconComponent: FiMonitor,
  },
  cloud: {
    label: "Cloud Deployment",
    icon: "FiCloud",
    IconComponent: FiCloud,
  },
  security: {
    label: "Website Security",
    icon: "FiShield",
    IconComponent: FiShield,
  },
  maintenance: {
    label: "Website Maintenance",
    icon: "FiSettings",
    IconComponent: FiSettings,
  },
  data: {
    label: "Data Analytics",
    icon: "FiBarChart2",
    IconComponent: FiBarChart2,
  },
};

const initialForm = {
  title: "Frontend Development",
  desc: "",
  category: "frontend",
  icon: "FiCode",
  color: "from-violet-500 to-fuchsia-500",
};

export default function DashboardServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const SelectedIcon =
    serviceCategories[form.category]?.IconComponent || FiCode;

  const getServices = async () => {
    const { data } = await API.get("/services");
    setServices(data.services || []);
  };

  useEffect(() => {
    getServices();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setForm({
        ...form,
        category: value,
        title: serviceCategories[value].label,
        icon: serviceCategories[value].icon,
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const submitData = {
      title: form.title,
      desc: form.desc,
      icon: form.icon,
      color: form.color,
    };

    if (editId) {
      await API.put(`/services/${editId}`, submitData);
    } else {
      await API.post("/services", submitData);
    }

    setForm(initialForm);
    setEditId(null);
    getServices();
  };

  const editHandler = (item) => {
    setEditId(item._id);

    const matchedCategory =
      Object.entries(serviceCategories).find(
        ([, category]) => category.icon === item.icon,
      )?.[0] || "frontend";

    setForm({
      title: item.title,
      desc: item.desc,
      category: matchedCategory,
      icon: item.icon || "FiCode",
      color: item.color || "from-violet-500 to-fuchsia-500",
    });
  };

  const deleteHandler = async (id) => {
    if (!confirm("Delete this service?")) return;

    await API.delete(`/services/${id}`);
    getServices();
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Services Management</h1>
        <p className="mt-2 text-white/55">
          Add and manage your portfolio services.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid gap-4 rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6 md:grid-cols-2"
      >
        <div className="rounded-2xl bg-white/5 p-4">
          <label className="mb-2 block text-sm font-semibold text-white/60">
            Service Logo / Icon
          </label>

          <select
            name="category"
            value={form.category}
            onChange={changeHandler}
            className="w-full rounded-xl bg-[#111827] p-3 outline-none"
          >
            {Object.entries(serviceCategories).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${form.color}`}
          >
            <SelectedIcon className="text-3xl text-white" />
          </div>

          <div>
            <p className="text-sm text-white/50">Selected Icon</p>
            <p className="font-bold text-violet-300">{form.icon}</p>
          </div>
        </div>

        <input
          name="title"
          value={form.title}
          onChange={changeHandler}
          placeholder="Service Title"
          className="rounded-2xl bg-white/5 p-4 outline-none md:col-span-2"
          required
        />

        <textarea
          name="desc"
          value={form.desc}
          onChange={changeHandler}
          placeholder="Service description"
          rows={4}
          className="rounded-2xl bg-white/5 p-4 outline-none md:col-span-2"
          required
        />

        <select
          name="color"
          value={form.color}
          onChange={changeHandler}
          className="rounded-2xl bg-[#111827] p-4 outline-none md:col-span-2"
        >
          <option value="from-violet-500 to-fuchsia-500">
            Violet / Fuchsia
          </option>
          <option value="from-blue-500 to-cyan-400">Blue / Cyan</option>
          <option value="from-emerald-500 to-green-400">Emerald / Green</option>
          <option value="from-pink-500 to-rose-400">Pink / Rose</option>
        </select>

        <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold md:col-span-2">
          {editId ? (
            <>
              <Pencil size={18} /> Update Service
            </>
          ) : (
            <>
              <Plus size={18} /> Add Service
            </>
          )}
        </button>
      </form>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((item, index) => (
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

            <p className="text-sm font-semibold text-violet-300">{item.icon}</p>

            <h2 className="mt-2 text-xl font-black">{item.title}</h2>

            <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/55">
              {item.desc}
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
