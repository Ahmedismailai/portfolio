"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus, Save, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import ManagedImage from "@/components/ManagedImage";

const initialForm = {
  title: "",
  desc: "",
  tags: "",
  live: "",
  github: "",
};

export default function AddProjectPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const getProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data.projects || []);
    } catch {}
  };

  useEffect(() => {
    getProjects();
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

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
    setPreview("");
    setEditId(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!editId && !image) {
      alert("Please upload a project image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("desc", form.desc);
      formData.append(
        "tags",
        JSON.stringify(
          form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        )
      );
      formData.append("live", form.live);
      formData.append("github", form.github);

      if (image) {
        formData.append("image", image);
      }

      if (editId) {
        await API.put(`/projects/${editId}`, formData);
        alert("Project updated successfully");
      } else {
        await API.post("/projects", formData);
        alert("Project added successfully");
      }

      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Project save failed");
    } finally {
      setLoading(false);
      getProjects();
    }
  };

  const editProject = (project) => {
    setEditId(project._id);

    setForm({
      title: project.title || "",
      desc: project.desc || "",
      tags: project.tags?.join(", ") || "",
      live: project.live || "",
      github: project.github || "",
    });

    setPreview(project.image?.url || "");
    setImage(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await API.delete(`/projects/${id}`);
      alert("Project deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Project delete failed");
    } finally {
      getProjects();
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">
            {editId ? "Edit Project" : "Add New Project"}
          </h1>
          <p className="mt-2 text-white/50">
            Add, edit and delete portfolio projects.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white/80 hover:bg-white/10"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[30px] border border-white/10 bg-[#07111f]/80 p-6 md:p-8"
      >
        <div className="grid gap-5">
          <input
            name="title"
            value={form.title}
            onChange={changeHandler}
            placeholder="Project Title"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
            required
          />

          <textarea
            name="desc"
            value={form.desc}
            onChange={changeHandler}
            placeholder="Project Description"
            rows={5}
            className="w-full resize-none rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
            required
          />

          <input
            name="tags"
            value={form.tags}
            onChange={changeHandler}
            placeholder="Tags: Next.js, MongoDB, Stripe"
            className="w-full rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <input
              name="live"
              value={form.live}
              onChange={changeHandler}
              placeholder="Live Demo URL"
              className="w-full rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
            />

            <input
              name="github"
              value={form.github}
              onChange={changeHandler}
              placeholder="GitHub URL"
              className="w-full rounded-2xl border border-white/10 bg-[#0b1424] px-5 py-4 text-white outline-none focus:border-fuchsia-500"
            />
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-fuchsia-500/40 bg-white/5 p-8 text-center hover:bg-white/10">
            <ImagePlus className="mb-3 text-fuchsia-400" size={40} />
            <span className="font-bold text-white">
              {editId ? "Change Project Image" : "Upload Project Image"}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={imageHandler}
              className="hidden"
            />
          </label>

          {preview && (
            <ManagedImage
              src={preview}
              alt="Preview"
              width={1200}
              height={675}
              className="h-64 w-full rounded-2xl border border-white/10 object-cover"
            />
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <button
              disabled={loading}
              className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold text-white disabled:opacity-60"
            >
              {editId ? <Pencil size={20} /> : <Save size={20} />}
              {loading
                ? "Saving..."
                : editId
                  ? "Update Project"
                  : "Save Project"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 px-6 py-4 font-bold text-white"
              >
                <Plus size={20} />
                Add New Instead
              </button>
            )}
          </div>
        </div>
      </motion.form>

      <div>
        <h2 className="mb-5 text-2xl font-black text-white">All Projects</h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-[#07111f]/70"
            >
              <ManagedImage
                src={project.image?.url}
                alt={project.title}
                width={600}
                height={400}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-black text-white">
                  {project.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">
                  {project.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => editProject(project)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className="rounded-xl bg-red-500/15 px-4 py-3 text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="rounded-[24px] border border-white/10 bg-[#07111f]/70 p-8 text-center text-white/55">
            No projects found.
          </div>
        )}
      </div>
    </section>
  );
}
