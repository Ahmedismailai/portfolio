"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      setLoading(true);
      toast.loading("Authenticating...", { id: "login" });

      const res = await fetch("/api/backend/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        toast.success("Login successful! Redirecting...", { id: "login" });
        window.location.href = "/dashboard";
        return;
      }

      toast.error(data?.message || "Invalid email or password", { id: "login" });
    } catch (err) {
      toast.error(err.message || "Network error. Please try again.", { id: "login" });
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
