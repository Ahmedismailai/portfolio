"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ManagedImage from "@/components/ManagedImage";

const initialForm = {
  name: "",
  role: "",
  text: "",
  rating: 5,
};

export default function DashboardTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);

  const getTestimonials = async () => {
    const { data } = await API.get("/testimonials");
    setTestimonials(data.testimonials || []);
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("text", form.text);
    formData.append("rating", form.rating);

    if (image) {
      formData.append("image", image);
    }

    if (editId) {
      await API.put(`/testimonials/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await API.post("/testimonials", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    setForm(initialForm);
    setImage(null);
    setPreview("");
    setEditId(null);
    getTestimonials();
  };

  const editHandler = (item) => {
    setEditId(item._id);

    setForm({
      name: item.name,
      role: item.role,
      text: item.text,
      rating: item.rating || 5,
    });

    setPreview(item.image?.url || "");
    setImage(null);
  };

  const deleteHandler = async (id) => {
    if (!confirm("Delete this testimonial?")) return;

    await API.delete(`/testimonials/${id}`);
    getTestimonials();
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Testimonials Management</h1>
        <p className="mt-2 text-white/55">
          Add and manage your client testimonials.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid gap-4 rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6 md:grid-cols-2"
      >
        <input
          name="name"
          value={form.name}
          onChange={changeHandler}
          placeholder="Client Name"
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <input
          name="role"
          value={form.role}
          onChange={changeHandler}
          placeholder="Role / Company"
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <textarea
          name="text"
          value={form.text}
          onChange={changeHandler}
          placeholder="Client feedback"
          rows={4}
          className="rounded-2xl bg-white/5 p-4 outline-none md:col-span-2"
          required
        />

        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={changeHandler}
          min="1"
          max="5"
          placeholder="Rating"
          className="rounded-2xl bg-white/5 p-4 outline-none"
        />

        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          className="rounded-2xl bg-white/5 p-4 outline-none"
        />

        {preview && (
          <ManagedImage
            src={preview}
            alt="Preview"
            width={800}
            height={480}
            className="h-48 w-full rounded-2xl object-cover md:col-span-2"
          />
        )}

        <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold md:col-span-2">
          {editId ? (
            <>
              <Pencil size={18} /> Update Testimonial
            </>
          ) : (
            <>
              <Plus size={18} /> Add Testimonial
            </>
          )}
        </button>
      </form>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[24px] border border-white/10 bg-[#07111f]/70 p-5"
          >
            <div className="flex items-center gap-4">
              <ManagedImage
                src={item.image?.url}
                alt={item.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-violet-500/50 object-cover"
              />

              <div>
                <h2 className="text-lg font-black">{item.name}</h2>
                <p className="text-sm text-white/50">{item.role}</p>
              </div>
            </div>

            <p className="mt-5 line-clamp-4 text-sm leading-6 text-white/60">
              {item.text}
            </p>

            <p className="mt-4 font-bold text-yellow-400">
              {"★".repeat(item.rating || 5)}
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
