"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import API from "@/lib/axios";

const DashboardAuthContext = createContext({ user: null, refreshUser: async () => {} });

export const useDashboardAuth = () => useContext(DashboardAuthContext);

export default function DashboardGuard({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const { data } = await API.get("/auth/me");
    setUser(data.user);
    return data.user;
  }, []);

  useEffect(() => {
    refreshUser()
      .catch(async () => {
        try {
          await API.post("/auth/logout");
        } catch {
          // The redirect still clears access to protected dashboard data.
        }
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [refreshUser, router]);

  const value = useMemo(() => ({ user, refreshUser }), [refreshUser, user]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-white text-violet-600 dark:bg-[#030712] dark:text-violet-300">
        <div className="flex items-center gap-3 font-bold"><Loader2 className="animate-spin" /> Checking session…</div>
      </div>
    );
  }

  if (!user) return null;
  return <DashboardAuthContext.Provider value={value}>{children}</DashboardAuthContext.Provider>;
}
