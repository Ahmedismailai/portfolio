"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";

export default function SEOPage() {
  const [form, setForm] = useState({});

  useEffect(() => {
    const loadSEO = async () => {
      const { data } = await API.get("/seo");
      setForm(data.seo);
    };

    loadSEO();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.put("/seo", form);

    alert("SEO Updated");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-5 rounded-[30px] border border-white/10 bg-[#07111f]/70 p-6"
    >
      <h1 className="text-3xl font-black">SEO Settings</h1>

      <input
        value={form.metaTitle || ""}
        onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
        placeholder="Meta Title"
        className="w-full rounded-2xl bg-white/5 p-4"
      />

      <textarea
        value={form.metaDescription || ""}
        onChange={(e) =>
          setForm({
            ...form,
            metaDescription: e.target.value,
          })
        }
        rows={4}
        placeholder="Meta Description"
        className="w-full rounded-2xl bg-white/5 p-4"
      />

      <input
        value={form.metaKeywords || ""}
        onChange={(e) =>
          setForm({
            ...form,
            metaKeywords: e.target.value,
          })
        }
        placeholder="Keywords"
        className="w-full rounded-2xl bg-white/5 p-4"
      />

      <input
        value={form.siteUrl || ""}
        onChange={(e) =>
          setForm({
            ...form,
            siteUrl: e.target.value,
          })
        }
        placeholder="Site URL"
        className="w-full rounded-2xl bg-white/5 p-4"
      />

      <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 font-bold">
        Save SEO
      </button>
    </form>
  );
}
