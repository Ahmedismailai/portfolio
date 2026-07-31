"use client";

import { motion } from "framer-motion";
import { useHomeData } from "@/contex/HomeDataContext";

import {
  FaAws,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPalette,
  FaPython,
  FaReact,
  FaWindows,
  FaWordpress,
} from "react-icons/fa";

import {
  SiAndroid,
  SiAngular,
  SiAxios,
  SiBootstrap,
  SiCloudflare,
  SiCplusplus,
  SiCypress,
  SiDart,
  SiDocker,
  SiElectron,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGithubactions,
  SiGoogleanalytics,
  SiGooglecloud,
  SiGooglesearchconsole,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNpm,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiSass,
  SiShopify,
  SiSocketdotio,
  SiSupabase,
  SiSvelte,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  
  SiYarn,
  SiThreedotjs 
} from "react-icons/si";

import { RiOpenaiFill } from "react-icons/ri";
import { TbBrandCSharp, TbBrandReactNative } from "react-icons/tb";

const iconMap = {
  FaAws,
  SiAmazonwebservices: FaAws,
  RiOpenaiFill,
  SiOpenai: RiOpenaiFill,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiRedux,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiVercel,
  SiGraphql,
  SiReactquery,
  SiSocketdotio,
  SiFramer,
  SiJsonwebtokens,
  SiAxios,
  SiPostman,
  TbBrandReactNative,
  SiAndroid,
  SiFlutter,
  SiDart,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiBootstrap,
  SiSass,
  SiNestjs,
  SiFastapi,
  SiLaravel,
  SiPhp,
  SiRedis,
  SiSupabase,
  SiKubernetes,
  SiCloudflare,
  SiNetlify,
  SiGooglecloud,
  SiSwagger,
  SiCplusplus,
  SiCsharp: TbBrandCSharp,
  SiGithubactions,
  SiFigma,
  SiCanva: FaPalette,
  SiShopify,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiJest,
  SiCypress,
  SiElectron,
  SiNpm,
  SiYarn,
  SiLinux,
  SiWindows: FaWindows,
  SiWordpress: FaWordpress,
  SiThreedotjs 
};

const iconColors = {
  FaAws: "text-amber-500",
  SiAmazonwebservices: "text-amber-500",
  RiOpenaiFill: "text-emerald-500 dark:text-emerald-400",
  SiOpenai: "text-emerald-500 dark:text-emerald-400",
  FaReact: "text-cyan-400",
  TbBrandReactNative: "text-cyan-400",
  SiNextdotjs: "text-black dark:text-white",
  SiJavascript: "text-yellow-400",
  SiTypescript: "text-blue-500",
  FaNodeJs: "text-green-500",
  SiExpress: "text-black dark:text-white",
  SiMongodb: "text-green-400",
  SiMongoose: "text-green-400",
  SiRedux: "text-violet-500",
  SiTailwindcss: "text-sky-400",
  SiPostgresql: "text-sky-500",
  SiMysql: "text-blue-400",
  SiFirebase: "text-yellow-500",
  SiPrisma: "text-cyan-300",
  SiDocker: "text-blue-400",
  SiVercel: "text-black dark:text-white",
  SiGraphql: "text-pink-500",
  SiReactquery: "text-red-400",
  SiSocketdotio: "text-black dark:text-white",
  SiFramer: "text-pink-400",
  SiJsonwebtokens: "text-fuchsia-400",
  SiAxios: "text-violet-400",
  SiPostman: "text-orange-500",
  FaGithub: "text-black dark:text-white",
  FaHtml5: "text-orange-500",
  FaCss3Alt: "text-blue-500",
  FaGitAlt: "text-orange-500",
  FaPython: "text-yellow-400",
  SiAndroid: "text-green-400",
  SiFlutter: "text-sky-400",
  SiDart: "text-cyan-400",
  SiVuedotjs: "text-green-400",
  SiAngular: "text-red-500",
  SiSvelte: "text-orange-500",
  SiBootstrap: "text-violet-500",
  SiSass: "text-pink-400",
  SiNestjs: "text-red-500",
  SiFastapi: "text-emerald-400",
  SiLaravel: "text-red-500",
  SiPhp: "text-indigo-400",
  SiRedis: "text-red-500",
  SiSupabase: "text-emerald-400",
  SiKubernetes: "text-blue-500",
  SiCloudflare: "text-orange-500",
  SiNetlify: "text-cyan-400",
  SiGooglecloud: "text-blue-400",
  SiSwagger: "text-lime-400",
  SiCplusplus: "text-blue-500",
  SiCsharp: "text-violet-500",
  SiGithubactions: "text-blue-400",
  SiFigma: "text-fuchsia-400",
  SiCanva: "text-cyan-400",
  SiShopify: "text-green-500",
  SiGoogleanalytics: "text-yellow-500",
  SiGooglesearchconsole: "text-blue-500",
  SiJest: "text-red-400",
  SiCypress: "text-slate-500 dark:text-slate-300",
  SiElectron: "text-cyan-400",
  SiNpm: "text-red-500",
  SiYarn: "text-sky-400",
  SiLinux: "text-yellow-400",
  SiWindows: "text-sky-500",
  SiThreedotjs: "text-black dark:text-white",
};

export default function WorkWith() {
  const { data: homeData } = useHomeData();
  const data = homeData.workWith;

  return (
    <section
      id="work-with"
      className="relative z-20 overflow-hidden bg-white/70 px-4 py-14 text-black transition-colors duration-300 dark:bg-[#030712]/70 dark:text-white sm:px-6"
    >
      <div className="absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_0_45px_rgba(168,85,247,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07111f]/55 sm:p-8 md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_35%)]" />

        <div className="relative mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-500 dark:text-fuchsia-300">
                {data?.badge || "POWERING MODERN PRODUCTS"}
              </p>
            </div>

            <h2 className="text-3xl font-black text-black dark:text-white sm:text-4xl">
              {data?.title || "Core Tech Stack & Tools"}
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 px-7 py-3 text-sm font-bold text-violet-500 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl transition hover:border-fuchsia-500/50 dark:text-fuchsia-300 md:block"
          >
            Modern Stack
          </motion.button>
        </div>

        <div className="relative grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {data.items?.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-black/10 bg-white/60 p-6 text-center text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              No stack icons added yet.
            </div>
          ) : (
            data.items?.map((skill, index) => {
              const Icon = iconMap[skill.icon] || FaReact;
              const iconColor = iconColors[skill.icon] || "text-cyan-400";

              return (
                <motion.div
                  key={skill._id || skill.name}
                  initial={{ opacity: 0, y: 30, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -10, scale: 1.08 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  className="group relative flex min-h-[120px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-black/10 bg-white/60 p-4 shadow-[0_0_20px_rgba(168,85,247,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.28)] dark:border-white/10 dark:bg-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-fuchsia-500/10 opacity-0 transition group-hover:opacity-100" />

                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 shadow-[0_0_25px_rgba(168,85,247,0.18)]"
                  >
                    <div className="absolute inset-0 rounded-full bg-violet-500/20 opacity-0 blur-xl transition group-hover:opacity-100" />

                    <Icon
                      className={`relative text-4xl drop-shadow-[0_0_18px_rgba(168,85,247,0.6)] md:text-5xl ${iconColor}`}
                    />
                  </motion.div>

                  <p className="relative text-center text-sm font-bold text-black/75 dark:text-white/85 md:text-base">
                    {skill.name}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </section>
  );
}
