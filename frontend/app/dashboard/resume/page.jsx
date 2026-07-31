"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { UploadCloud, Trash2, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("My Resume");
  const [loading, setLoading] = useState(false);

  const getResume = async () => {
    try {
      const { data } = await API.get("/resume");
      setResume(data.resume);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResume();
  }, []);

  const uploadResume = async (e) => {
    e.preventDefault();

    if (!file) {
      return alert("Select resume file");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("resume", file);

      await API.post("/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getResume();
      setFile(null);

      alert("Resume uploaded successfully");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async () => {
    if (!resume?._id) return;

    if (!confirm("Delete resume?")) return;

    try {
      await API.delete(`/resume/${resume._id}`);
      setResume(null);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-black dark:text-white">
          Resume Manager
        </h1>

        <p className="mt-2 text-gray-500 dark:text-white/50">
          Upload and manage your CV / Resume.
        </p>
      </div>

      <motion.form
        onSubmit={uploadResume}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[30px] border border-black/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/80"
      >
        <div className="grid gap-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resume Title"
            className="rounded-2xl border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="rounded-2xl border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0b1424] dark:text-white"
          />

          <button
            disabled={loading}
            className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-4 font-bold text-white"
          >
            <UploadCloud size={20} />
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </motion.form>

      {resume && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[30px] border border-black/10 bg-white/80 p-6 dark:border-white/10 dark:bg-[#07111f]/80"
        >
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            Current Resume
          </h3>

          <p className="mb-6 text-gray-600 dark:text-white/60">
            {resume.title}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={resume.file?.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-white"
            >
              <Download size={18} />
              Download
            </a>

            <button
              onClick={deleteResume}
              className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
