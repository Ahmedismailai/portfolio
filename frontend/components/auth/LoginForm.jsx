"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import API from "@/lib/axios";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      toast.loading("Logging in...", {
        id: "login",
      });

      await API.post("/auth/login", {
        email,
        password,
      });

      toast.success("Login successful", {
        id: "login",
      });

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        id: "login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#030712]">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#07111f]/70 p-8 backdrop-blur-xl"
      >
        <h2 className="mb-8 text-center text-4xl font-black">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </section>
  );
}
