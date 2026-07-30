"use client";

import { useEffect, useRef } from "react";
import { useMobile } from "@/lib/useMobile";

import { useTheme } from "@/components/providers/ThemeProvider";

export default function MouseGlow() {
  const { theme } = useTheme();
  const auraRef = useRef(null);
  const particlesRef = useRef([]);
  const isMobile = useMobile();

  useEffect(() => {
    const aura = auraRef.current;
    if (isMobile) return;
    if (!aura) return;

    const target = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const current = {
      x: target.x,
      y: target.y,
    };

    const lastPoint = {
      x: target.x,
      y: target.y,
    };

    const velocity = {
      x: 1,
      y: 0,
    };

    let animationFrame = 0;
    let lastSpawn = 0;
    let particleIndex = 0;

    const spawnParticle = (event, deltaX, deltaY) => {
      const now = window.performance.now();

      if (now - lastSpawn < 18 || particlesRef.current.length === 0) return;

      lastSpawn = now;

      const particle =
        particlesRef.current[particleIndex % particlesRef.current.length];

      particleIndex += 1;

      const speed = Math.hypot(deltaX, deltaY);
      const distance = 34 + Math.min(speed * 4.2, 72) + Math.random() * 24;

      let trailX = 0;
      let trailY = 0;

      if (speed > 0.4) {
        const unitX = deltaX / speed;
        const unitY = deltaY / speed;
        const sideDrift = (Math.random() - 0.5) * distance * 0.22;

        trailX = unitX * distance - unitY * sideDrift;
        trailY = unitY * distance + unitX * sideDrift;
      } else {
        const drift = Math.random() * Math.PI * 2;

        trailX = Math.cos(drift) * distance;
        trailY = Math.sin(drift) * distance;
      }

      const colors =
        theme === "light"
          ? ["#c026d3", "#0891b2", "#7c3aed", "#db2777", "#2563eb"]
          : ["#f0abfc", "#67e8f9", "#a855f7", "#f472b6", "#38bdf8"];

      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;

      particle.style.setProperty(
        "--trail-color",
        colors[particleIndex % colors.length],
      );

      particle.style.setProperty(
        "--trail-size",
        `${3 + Math.random() * 4.5}px`,
      );
      particle.style.setProperty("--trail-x", `${trailX}px`);
      particle.style.setProperty("--trail-y", `${trailY}px`);

      particle.style.animation = "none";
      void particle.offsetHeight;

      particle.style.animation =
        "agency-cursor-particle 980ms cubic-bezier(0.16, 1, 0.3, 1) forwards";
    };

    const handlePointerMove = (event) => {
      const rawDeltaX = event.clientX - lastPoint.x || event.movementX || 0;
      const rawDeltaY = event.clientY - lastPoint.y || event.movementY || 0;
      const rawSpeed = Math.hypot(rawDeltaX, rawDeltaY);

      if (rawSpeed > 0.3) {
        velocity.x = velocity.x * 0.45 + rawDeltaX * 0.55;
        velocity.y = velocity.y * 0.45 + rawDeltaY * 0.55;
      }

      lastPoint.x = event.clientX;
      lastPoint.y = event.clientY;

      target.x = event.clientX;
      target.y = event.clientY;

      aura.dataset.active = "true";

      spawnParticle(event, velocity.x, velocity.y);
    };

    const handlePointerLeave = () => {
      aura.dataset.active = "false";
    };

    const animate = () => {
      current.x += (target.x - current.x) * 0.24;
      current.y += (target.y - current.y) * 0.24;

      aura.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("pointerleave", handlePointerLeave);

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [theme, isMobile]);


  return (
    <>
      <div
        ref={auraRef}
        className="agency-cursor-galaxy"
        data-theme={theme}
        data-active="false"
        aria-hidden="true"
      >
        <span className="agency-cursor-aura" />
        <span className="agency-cursor-core" />
      </div>

      <div
        className="agency-cursor-particle-layer"
        data-theme={theme}
        aria-hidden="true"
      >
        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={index}
            ref={(node) => {
              if (node) particlesRef.current[index] = node;
            }}
            className="agency-cursor-particle"
          />
        ))}
      </div>
    </>
  );
}
