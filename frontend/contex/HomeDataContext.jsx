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
    items: [
      { name: "React", icon: "FaReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "React Native", icon: "TbBrandReactNative" },
      { name: "Node.js", icon: "FaNodeJs" },
      { name: "Python", icon: "FaPython" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "Docker", icon: "SiDocker" },
      { name: "GitHub", icon: "FaGithub" },
      { name: "OpenAI", icon: "SiOpenai" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "AWS", icon: "FaAws" },
      { name: "Redis", icon: "SiRedis" },
      { name: "Prisma", icon: "SiPrisma" },
    ],
  },
  projects: [
    {
      _id: "6a64c47d2b10e6bc70322193",
      title: "PayPulse — Fintech & Crypto Gateway",
      desc: "Engineered a PCI-DSS compliant financial micro-service architecture handling cross-border payments, sub-second ledger settlements, multi-currency processing, and real-time fraud alerts.",
      image: { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
      tags: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Express.js"],
      live: "https://paypulse.demo.app",
      github: "https://github.com/sobujmd044/paypulse-fintech",
      featured: true,
    },
    {
      _id: "6a64c47d2b10e6bc70322192",
      title: "NexusAI — Enterprise AI Platform & SaaS",
      desc: "Architected an end-to-end enterprise AI workflow engine with RAG, vector embeddings, multi-LLM orchestration (OpenAI & Anthropic), dynamic prompts, and real-time WebSocket streaming.",
      image: { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" },
      tags: ["Next.js 14", "OpenAI API", "TypeScript", "Tailwind CSS", "Pinecone", "Node.js"],
      live: "https://nexusai.demo.app",
      github: "https://github.com/sobujmd044/nexus-ai-platform",
      featured: true,
    },
    {
      _id: "6a64c47d2b10e6bc70322195",
      title: "CloudOps Sentinel — Infrastructure Suite",
      desc: "Production monitoring dashboard analyzing Kubernetes node telemetry, auto-scaling metrics, server health logs, and streaming real-time alerts to Slack/Discord webhooks.",
      image: { url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80" },
      tags: ["Python", "FastAPI", "React", "Docker", "AWS", "Prometheus"],
      live: "https://cloudops.demo.app",
      github: "https://github.com/sobujmd044/cloudops-sentinel",
      featured: true,
    },
    {
      _id: "6a64c47d2b10e6bc70322194",
      title: "CareSync — Telemedicine & EHR Suite",
      desc: "Full-scale digital healthcare platform enabling HIPAA-compliant WebRTC video consultations, automated prescription generation, electronic health records (EHR), and patient scheduling.",
      image: { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" },
      tags: ["React Native", "Next.js", "MongoDB", "WebRTC", "Redux Toolkit"],
      live: "https://caresync.demo.app",
      github: "https://github.com/sobujmd044/caresync-healthtech",
      featured: true,
    },
  ],
  blogs: [
    {
      _id: "6a64c6e64a7874f8f0ec586d",
      title: "How I Built an Enterprise RAG Engine Handling 50K Daily Queries with Next.js 14 & OpenAI",
      slug: "enterprise-rag-engine-nextjs-openai",
      excerpt: "An in-depth architectural guide on building a production-grade Retrieval-Augmented Generation (RAG) platform using Next.js 14 App Router, OpenAI embeddings, Pinecone vector indexing, and Vercel AI SDK streaming.",
      category: "AI & System Architecture",
      tags: ["AI", "Next.js 14", "OpenAI", "Vector DB", "System Architecture"],
      coverImage: { url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80" },
      featured: true,
    },
    {
      _id: "6a64c6e64a7874f8f0ec586f",
      title: "Achieving Rock-Solid 60 FPS in Complex React Native & Expo Mobile Applications",
      slug: "rock-solid-60fps-react-native-expo",
      excerpt: "A masterclass in mobile UI performance: replacing FlatList with FlashList, leveraging React Native New Architecture (Fabric & TurboModules), C++ JSI bridges, and Reanimated 3 UI-thread animations.",
      category: "Mobile Software Engineering",
      tags: ["React Native", "Expo", "Mobile", "Performance", "TypeScript"],
      coverImage: { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80" },
      featured: true,
    },
    {
      _id: "6a64c6e64a7874f8f0ec586e",
      title: "Zero-Downtime Microservices: Scaling Node.js & Redis to 10 Million Requests Per Day",
      slug: "zero-downtime-microservices-nodejs-redis",
      excerpt: "Step-by-step technical breakdown of scaling a Node.js microservices ecosystem: event loop non-blocking strategies, Redis pub/sub queuing with BullMQ, PostgreSQL connection pooling, and Docker deployments.",
      category: "Backend & Cloud Engineering",
      tags: ["Node.js", "Redis", "Docker", "Microservices", "Backend"],
      coverImage: { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" },
      featured: true,
    },
  ],
  experiences: [
    {
      _id: "6a64df7459845a09793ccba7",
      year: "2023 - Present",
      role: "Senior Full-Stack & AI Engineer",
      company: "Brain Station 23 (Dhaka, BD)",
      description: "Architecting enterprise AI & microservices platforms for global clients across Fintech and Telecom. Driving Next.js 14, OpenAI RAG pipeline integration, Node.js backend scalability, and AWS cloud orchestration.",
      icon: "Sparkles",
      color: "from-cyan-400 via-blue-500 to-indigo-600",
    },
    {
      _id: "6a64df7459845a09793ccba8",
      year: "2021 - 2023",
      role: "Lead Mobile & Web Engineer",
      company: "Pathao (Dhaka, BD)",
      description: "Led engineering for high-concurrency ride-sharing, food delivery, and digital payments modules. Improved React Native mobile app FPS by 40% and optimized API response latencies.",
      icon: "Code2",
      color: "from-fuchsia-500 via-violet-500 to-purple-600",
    },
    {
      _id: "6a64df7459845a09793ccba9",
      year: "2019 - 2021",
      role: "Software Engineer",
      company: "Chaldal (Dhaka, BD)",
      description: "Developed real-time inventory management dashboards, automated warehouse routing algorithms, and customer checkout flows using TypeScript, React, and MongoDB.",
      icon: "Laptop2",
      color: "from-emerald-400 via-teal-500 to-cyan-600",
    },
  ],
  testimonials: [
    {
      _id: "6a64e33fcfdde29456858de9",
      name: "Tanvir Hossain",
      role: "Chief Product Officer at Pathao (Bangladesh)",
      text: "Working with Ahmed was a game changer for our mobile engineering team. He optimized our React Native rendering pipeline to solid 60 FPS, reducing app crash rates to near zero under heavy peak traffic.",
      rating: 5,
      image: { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
    },
    {
      _id: "6a64e33fcfdde29456858de8",
      name: "Sarah Jenkins",
      role: "VP of Engineering at FinovaTech (USA)",
      text: "Ahmed Ismail transformed our legacy monolith into a resilient Next.js 14 & Node.js microservices architecture. His OpenAI RAG integration cut document query processing time by 75%. Exceptional technical leadership!",
      rating: 5,
      image: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    },
    {
      _id: "6a64e33fcfdde29456858dea",
      name: "Michael Vance",
      role: "Founder & CEO at CloudPulse AI (UK)",
      text: "Ahmed delivered our enterprise SaaS platform ahead of schedule with flawless code quality. His deep mastery of Docker containerization, AWS cloud infra, and real-time WebSockets is unmatched!",
      rating: 5,
      image: { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    },
  ],
  services: [
    {
      _id: "6a64c994e72cb78993e456ca",
      title: "Scalable Backend & Microservices",
      desc: "Engineering high-throughput Node.js, Express, and Python FastAPI microservices, Redis caching layers, PostgreSQL/MongoDB database optimization, and high-concurrency event queues.",
      icon: "FiServer",
      color: "from-emerald-400 via-teal-500 to-cyan-600",
    },
    {
      _id: "6a64c994e72cb78993e456c9",
      title: "Cross-Platform Mobile Apps",
      desc: "Building native-feel, high-FPS iOS and Android mobile applications using React Native and Expo with offline caching, push notifications, WebSockets, and smooth UI-thread animations.",
      icon: "FiSmartphone",
      color: "from-sky-400 via-cyan-500 to-teal-500",
    },
    {
      _id: "6a64c994e72cb78993e456c8",
      title: "Custom AI & LLM Integration",
      desc: "Integrating OpenAI GPT-4o models, Retrieval-Augmented Generation (RAG) pipelines, Pinecone vector search, and automated AI agents directly into enterprise web and mobile workflows.",
      icon: "FiCpu",
      color: "from-purple-500 via-fuchsia-500 to-pink-600",
    },
    {
      _id: "6a64c994e72cb78993e456cc",
      title: "API Engineering & Security",
      desc: "Developing robust RESTful & GraphQL APIs, payment gateway integrations (Stripe, SSLCommerz), real-time WebSockets, OAuth2/JWT security authentication, and third-party SaaS connections.",
      icon: "FiLayers",
      color: "from-violet-500 via-purple-600 to-indigo-700",
    },
  ],
  skills: [],
};

export function mergePortfolioData(remoteData) {
  if (!remoteData || typeof remoteData !== "object") return defaultPortfolioData;

  return {
    setting: remoteData.setting ? { ...defaultPortfolioData.setting, ...remoteData.setting } : defaultPortfolioData.setting,
    workWith: remoteData.workWith ? { ...defaultPortfolioData.workWith, ...remoteData.workWith } : defaultPortfolioData.workWith,
    projects: Array.isArray(remoteData.projects) && remoteData.projects.length > 0 ? remoteData.projects : defaultPortfolioData.projects,
    blogs: Array.isArray(remoteData.blogs) && remoteData.blogs.length > 0 ? remoteData.blogs : defaultPortfolioData.blogs,
    experiences: Array.isArray(remoteData.experiences) && remoteData.experiences.length > 0 ? remoteData.experiences : defaultPortfolioData.experiences,
    testimonials: Array.isArray(remoteData.testimonials) && remoteData.testimonials.length > 0 ? remoteData.testimonials : defaultPortfolioData.testimonials,
    services: Array.isArray(remoteData.services) && remoteData.services.length > 0 ? remoteData.services : defaultPortfolioData.services,
    skills: Array.isArray(remoteData.skills) && remoteData.skills.length > 0 ? remoteData.skills : defaultPortfolioData.skills,
  };
}

const HomeDataContext = createContext({ data: defaultPortfolioData, loading: false, error: "" });

export function HomeDataProvider({ children }) {
  const [data, setData] = useState(defaultPortfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    // Load from localStorage cache immediately for 0ms instant rendering
    try {
      const cached = localStorage.getItem("portfolio_data_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === "object") {
          setData(mergePortfolioData(parsed));
        }
      }
    } catch {}

    const fetchData = (attempt = 1) => {
      API.get("/home")
        .then(({ data: response }) => {
          if (!active) return;
          if (response?.data) {
            const merged = mergePortfolioData(response.data);
            setData(merged);
            try {
              localStorage.setItem("portfolio_data_cache", JSON.stringify(response.data));
            } catch {}
          }
        })
        .catch((requestError) => {
          if (!active) return;
          if (attempt <= 3) {
            setTimeout(() => fetchData(attempt + 1), 3000);
          } else {
            setError(requestError.response?.data?.message || "Portfolio data could not be loaded");
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ data, loading, error }), [data, loading, error]);
  return <HomeDataContext.Provider value={value}>{children}</HomeDataContext.Provider>;
}

export const useHomeData = () => useContext(HomeDataContext);
