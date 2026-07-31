"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/axios";
import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import Link from "next/link";
import ManagedImage from "@/components/ManagedImage";

const initialForm = {
  title: "",
  desc: "",
  tags: "",
  live: "",
  github: "",
};

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await API.get("/projects");
        const project = data.projects.find((item) => item._id === id);

        if (!project) {
          alert("Project not found");
          router.push("/dashboard/projects");
          return;
        }

        setForm({
          title: project.title || "",
          desc: project.desc || "",
          tags: project.tags?.join(", ") || "",
          live: project.live || "",
          github: project.github || "",
        });

        setPreview(project.image?.url || project.image || "");
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load project");
      }
    };

    getProject();
  }, [id, router]);

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
            .filter(Boolean),
        ),
      );
      formData.append("live", form.live);
      formData.append("github", form.github);

      if (image) {
        formData.append("image", image);
      }

      await API.put(`/projects/${id}`, formData);

      router.push("/dashboard/projects");
    } catch (error) {
      alert(error.response?.data?.message || "Project update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Edit Project</h1>
          <p className="mt-2 text-white/50">
            Update project information, links, tags and image.
          </p>
        </div>

        <Link
          href="/dashboard/projects"
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
        className="rounded-[30px] border border-white/10 bg-[#07111f]/80 p-6 shadow-[0_0_35px_rgba(139,92,246,0.12)] backdrop-blur-xl md:p-8"
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
            <span className="font-bold text-white">Change Project Image</span>
            <span className="mt-1 text-sm text-white/50">
              Leave empty to keep old image
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
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

          <button
            disabled={loading}
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-[0_0_35px_rgba(168,85,247,0.35)] disabled:opacity-60"
          >
            <Save size={20} />
            {loading ? "Updating..." : "Update Project"}
          </button>
        </div>
      </motion.form>
    </section>
  );
}
