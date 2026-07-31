"use client";

const galaxyStars = [
  // [left%, top%, duration(s), delay(s), size(px), color, opacity]
  [3, 8, 18, 1, 1.5, "rgba(255,255,255,.95)", 0.85],
  [7, 24, 22, 5, 2.5, "rgba(56,189,248,.92)", 0.8],
  [12, 48, 19, 3, 2, "rgba(168,85,247,.94)", 0.88],
  [18, 72, 25, 9, 1.5, "rgba(255,255,255,.9)", 0.75],
  [23, 15, 21, 2, 2.8, "rgba(217,70,239,.94)", 0.82],
  [28, 38, 26, 8, 2, "rgba(56,189,248,.9)", 0.76],
  [34, 64, 18, 4, 1.5, "rgba(255,255,255,.98)", 0.9],
  [39, 88, 24, 11, 2.2, "rgba(139,92,246,.94)", 0.84],
  [44, 22, 20, 6, 1.5, "rgba(56,189,248,.92)", 0.78],
  [49, 52, 28, 7, 2.6, "rgba(255,255,255,.95)", 0.86],
  [54, 80, 17, 3, 1.5, "rgba(217,70,239,.9)", 0.74],
  [59, 12, 23, 1, 2.2, "rgba(56,189,248,.94)", 0.82],
  [64, 42, 21, 10, 1.5, "rgba(168,85,247,.96)", 0.88],
  [69, 68, 27, 5, 2.5, "rgba(255,255,255,.92)", 0.78],
  [74, 30, 20, 2, 2, "rgba(56,189,248,.94)", 0.84],
  [79, 78, 26, 8, 1.5, "rgba(217,70,239,.92)", 0.76],
  [85, 18, 22, 12, 2.8, "rgba(255,255,255,.96)", 0.9],
  [90, 54, 19, 4, 2, "rgba(139,92,246,.94)", 0.8],
  [95, 84, 25, 9, 1.5, "rgba(56,189,248,.92)", 0.78],
  [4, 92, 21, 6, 2, "rgba(255,255,255,.9)", 0.75],
  [15, 33, 24, 7, 2.4, "rgba(217,70,239,.94)", 0.85],
  [27, 85, 18, 3, 1.5, "rgba(56,189,248,.9)", 0.72],
  [38, 10, 23, 11, 2.6, "rgba(255,255,255,.96)", 0.88],
  [51, 95, 20, 5, 1.5, "rgba(168,85,247,.92)", 0.76],
  [62, 28, 25, 2, 2.2, "rgba(56,189,248,.94)", 0.82],
  [77, 60, 19, 9, 1.5, "rgba(255,255,255,.95)", 0.86],
  [88, 36, 22, 4, 2.5, "rgba(217,70,239,.9)", 0.78],
  [93, 70, 26, 10, 1.5, "rgba(56,189,248,.96)", 0.84],
  [9, 60, 21, 1, 2, "rgba(255,255,255,.92)", 0.76],
  [20, 45, 18, 8, 1.5, "rgba(139,92,246,.94)", 0.8],
  [31, 20, 24, 6, 2.4, "rgba(56,189,248,.92)", 0.82],
  [42, 76, 22, 3, 1.5, "rgba(255,255,255,.96)", 0.88],
  [56, 35, 19, 7, 2.2, "rgba(217,70,239,.94)", 0.8],
  [67, 88, 27, 12, 1.5, "rgba(56,189,248,.9)", 0.74],
  [81, 12, 20, 2, 2.6, "rgba(255,255,255,.95)", 0.86],
  [92, 44, 23, 5, 1.5, "rgba(168,85,247,.92)", 0.78],
];

export default function ParticleBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent"
    >
      {/* Deep Galaxy Base & Cosmic Mesh Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.1),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(217,70,239,0.1),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.22),transparent_65%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(217,70,239,0.18),transparent_60%)]" />

      <div className="hero-grid absolute inset-0 opacity-40 dark:opacity-60" />

      {/* Floating Galaxy Nebulae */}
      <div className="galaxy-nebula galaxy-nebula-left pointer-events-none" />
      <div className="galaxy-nebula galaxy-nebula-right pointer-events-none" />

      {/* Twinkling Galaxy Starfield */}
      <div className="particle-field absolute inset-0">
        {galaxyStars.map(
          ([left, top, duration, delay, size, color, opacity], index) => (
            <span
              key={index}
              style={{
                "--particle-left": `${left}%`,
                "--particle-top": `${top}%`,
                "--particle-duration": `${duration}s`,
                "--particle-delay": `-${delay}s`,
                "--particle-size": `${size}px`,
                "--particle-color": color,
                "--particle-opacity": opacity,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
