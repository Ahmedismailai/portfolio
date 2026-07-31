"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ManagedImage from "@/components/ManagedImage";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Web Development",
  tags: "",
  featured: false,
  status: "published",
};

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    try {
      const { data } = await API.get("/blogs");
      setBlogs(data.blogs || []);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load blogs");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const imageHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append(
            "tags",
            JSON.stringify(
              value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            ),
          );
        } else {
          formData.append(key, value);
        }
      });

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      if (editId) {
        await API.put(`/blogs/${editId}`, formData);
      } else {
        await API.post("/blogs", formData);
      }

      setForm(initialForm);
      setCoverImage(null);
      setPreview("");
      setEditId(null);
      getBlogs();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editHandler = (blog) => {
    setEditId(blog._id);

    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "Web Development",
      tags: blog.tags?.join(", ") || "",
      featured: blog.featured || false,
      status: blog.status || "published",
    });

    setPreview(blog.coverImage?.url || "");
    setCoverImage(null);
  };

  const deleteHandler = async (id) => {
    if (!confirm("Delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      getBlogs();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Blog Management</h1>
        <p className="mt-2 text-white/55">
          Create, update and manage portfolio blog posts.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid gap-4 rounded-[26px] border border-white/10 bg-[#07111f]/70 p-6"
      >
        <input
          name="title"
          value={form.title}
          onChange={changeHandler}
          placeholder="Blog Title"
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={changeHandler}
          placeholder="Short excerpt"
          rows={3}
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <textarea
          name="content"
          value={form.content}
          onChange={changeHandler}
          placeholder="Full blog content"
          rows={8}
          className="rounded-2xl bg-white/5 p-4 outline-none"
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="category"
            value={form.category}
            onChange={changeHandler}
            placeholder="Category"
            className="rounded-2xl bg-white/5 p-4 outline-none"
          />

          <input
            name="tags"
            value={form.tags}
            onChange={changeHandler}
            placeholder="Tags: Next.js, React, MongoDB"
            className="rounded-2xl bg-white/5 p-4 outline-none"
          />
        </div>

        <select
          name="status"
          value={form.status}
          onChange={changeHandler}
          className="rounded-2xl bg-white/5 p-4 outline-none"
        >
          <option value="published" className="bg-[#07111f]">
            Published
          </option>
          <option value="draft" className="bg-[#07111f]">
            Draft
          </option>
        </select>

        <label className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={changeHandler}
          />
          Featured Blog
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          className="rounded-2xl bg-white/5 p-4"
        />

        {preview && (
          <ManagedImage
            src={preview}
            alt="Preview"
            width={1200}
            height={630}
            className="h-64 w-full rounded-2xl object-cover"
          />
        )}

        <button
          disabled={loading}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold disabled:opacity-60"
        >
          {editId ? (
            <>
              <Pencil size={18} /> {loading ? "Updating..." : "Update Blog"}
            </>
          ) : (
            <>
              <Plus size={18} /> {loading ? "Adding..." : "Add Blog"}
            </>
          )}
        </button>
      </form>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07111f]/70"
          >
            <ManagedImage
              src={blog.coverImage?.url}
              alt={blog.title}
              width={600}
              height={400}
              className="h-44 w-full object-cover"
            />

            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-violet-300">{blog.category}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white/60">
                  {blog.status || "published"}
                </span>
              </div>

              <h2 className="mt-2 text-xl font-black">{blog.title}</h2>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
                {blog.excerpt}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => editHandler(blog)}
                  className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteHandler(blog._id)}
                  className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
