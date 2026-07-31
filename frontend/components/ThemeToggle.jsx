"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-500/25 text-violet-500 transition hover:bg-fuchsia-500/10 dark:text-white"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
