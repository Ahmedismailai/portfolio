"use client";

import Image from "next/image";

export default function ManagedImage({ src, alt, width = 800, height = 600, ...props }) {
  const safeSrc = src || "/logo.jpeg";
  const unoptimized = typeof safeSrc === "string" && /^(blob:|data:)/.test(safeSrc);

  return (
    <Image
      src={safeSrc}
      alt={alt || ""}
      width={width}
      height={height}
      unoptimized={unoptimized}
      {...props}
    />
  );
}
