"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "@/lib/axios";

export const defaultPortfolioData = {
  setting: {
    siteName: "Ahmed Ismail — Portfolio",
    siteDescription: "Full Stack Developer | Web, Mobile & AI Solutions",
    heroEyebrow: "Available for selected work",
    heroGreeting: "Hi, I’m",
    heroName: "Ahmed Ismail",
    heroTitle: "Full Stack Developer | Web, Mobile & AI Solutions",
    heroDescription: "Engineering high-performance web platforms, mobile apps, and AI-driven solutions that turn ideas into scalable digital products.",
    resumeUrl: "",
    aboutBadge: "About Me",
    aboutTitle: "Full Stack & AI Engineer",
    aboutBio: "I’m Ahmed Ismail, a Full-Stack & AI Engineer with over 5 years of experience architecting high-performance web platforms, mobile applications, and intelligent digital solutions. I specialize in the modern JavaScript/TypeScript ecosystem—mastering Next.js, MERN stack, cloud infrastructure, and AI integrations to transform complex ideas into scalable, production-ready products.",
    aboutExpYears: 5,
    aboutProjectsCount: 20,
    aboutClientsCount: 15,
    aboutTechCount: 15,
    email: "sobujmd044@gmail.com",
    phone: "+8801710566176",
    location: "Cumilla, Bangladesh",
    footerText: "Crafted with precision, passion, and modern web technologies. All rights reserved.",
    theme: "dark",
    socialLinks: { github: "", linkedin: "", twitter: "", instagram: "" },
  },
  workWith: {
    title: "Core Tech Stack & Tools",
    badge: "POWERING MODERN PRODUCTS",
    items: [],
  },
  projects: [],
  blogs: [],
  experiences: [],
  testimonials: [],
  services: [],
  skills: [],
};

export function mergePortfolioData(remoteData) {
  if (!remoteData || typeof remoteData !== "object") return defaultPortfolioData;

  return {
    setting: remoteData.setting ? { ...defaultPortfolioData.setting, ...remoteData.setting } : defaultPortfolioData.setting,
    workWith: remoteData.workWith ? { ...defaultPortfolioData.workWith, ...remoteData.workWith } : defaultPortfolioData.workWith,
    projects: Array.isArray(remoteData.projects) ? remoteData.projects : defaultPortfolioData.projects,
    blogs: Array.isArray(remoteData.blogs) ? remoteData.blogs : defaultPortfolioData.blogs,
    experiences: Array.isArray(remoteData.experiences) ? remoteData.experiences : defaultPortfolioData.experiences,
    testimonials: Array.isArray(remoteData.testimonials) ? remoteData.testimonials : defaultPortfolioData.testimonials,
    services: Array.isArray(remoteData.services) ? remoteData.services : defaultPortfolioData.services,
    skills: Array.isArray(remoteData.skills) ? remoteData.skills : defaultPortfolioData.skills,
  };
}

const HomeDataContext = createContext({ data: defaultPortfolioData, loading: false, error: "", refetch: () => {} });

export function HomeDataProvider({ children }) {
  const [data, setData] = useState(defaultPortfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (bypassCache = false) => {
    try {
      if (!bypassCache) {
        const cached = localStorage.getItem("portfolio_data_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object") {
            setData(mergePortfolioData(parsed));
          }
        }
      }
    } catch {}

    try {
      const { data: response } = await API.get("/home");
      if (response?.data) {
        const merged = mergePortfolioData(response.data);
        setData(merged);
        try {
          localStorage.setItem("portfolio_data_cache", JSON.stringify(response.data));
        } catch {}
      }
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Portfolio data could not be loaded");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    try {
      localStorage.removeItem("portfolio_data_cache");
    } catch {}
    fetchData(true);
  };

  const value = useMemo(() => ({ data, loading, error, refetch }), [data, loading, error]);
  return <HomeDataContext.Provider value={value}>{children}</HomeDataContext.Provider>;
}

export const useHomeData = () => useContext(HomeDataContext);
