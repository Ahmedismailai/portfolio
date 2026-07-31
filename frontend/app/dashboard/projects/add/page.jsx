"use client";

import { useState } from "react";
import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import ManagedImage from "@/components/ManagedImage";

export default function AddProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    tags: "",
    live: "",
    github: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("desc", form.desc);
    formData.append(
      "tags",
      JSON.stringify(form.tags.split(",").map((t) => t.trim())),
    );
    formData.append("live", form.live);
    formData.append("github", form.github);
    formData.append("image", image);

    await API.post("/projects", formData);

    router.push("/dashboard/projects");
  };

  return (
    <section className="mx-auto max-w-4xl rounded-[30px] border border-white/10 bg-[#07111f]/70 p-6">
      <h1 className="mb-8 text-3xl font-black">Add New Project</h1>

      <form onSubmit={submitHandler} className="space-y-5">
        <input
          name="title"
          placeholder="Project Title"
          onChange={changeHandler}
          className="w-full rounded-2xl bg-white/5 p-4 outline-none"
        />

        <textarea
          name="desc"
          placeholder="Description"
          onChange={changeHandler}
          className="w-full rounded-2xl bg-white/5 p-4 outline-none"
        />

        <input
          name="tags"
          placeholder="Tags: Next.js, MongoDB, Stripe"
          onChange={changeHandler}
          className="w-full rounded-2xl bg-white/5 p-4 outline-none"
        />

        <input
          name="live"
          placeholder="Live Demo URL"
          onChange={changeHandler}
          className="w-full rounded-2xl bg-white/5 p-4 outline-none"
        />

        <input
          name="github"
          placeholder="Github URL"
          onChange={changeHandler}
          className="w-full rounded-2xl bg-white/5 p-4 outline-none"
        />

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={imageHandler}
          className="w-full rounded-2xl bg-white/5 p-4"
        />

        {preview && (
          <ManagedImage
            src={preview}
            alt="Preview"
            width={1200}
            height={675}
            className="h-56 w-full rounded-2xl object-cover"
          />
        )}

        <button className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 py-4 font-bold">
          Save Project
        </button>
      </form>
    </section>
  );
}
