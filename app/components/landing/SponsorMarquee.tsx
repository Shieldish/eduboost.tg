"use client";

import Image from "next/image";

interface SponsorItem {
  src: string;
  alt: string;
}

interface Props {
  items: SponsorItem[];
  reverse?: boolean;
  duration?: number;
}

export default function SponsorMarquee({ items, reverse = false, duration = 30 }: Props) {
  // 4 copies — `-50%` de 4x reste seamless même sur très grand écran / dezoom
  const quad = [...items, ...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {quad.map(({ src, alt }, i) => (
          <div
            key={`${alt}-${i}`}
            style={{
              margin: "0 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
              width: 176,
              flexShrink: 0,
              borderRadius: 12,
              border: "1px solid #f0f0f0",
              backgroundColor: "#ffffff",
              padding: 12,
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={140}
              height={56}
              style={{ maxHeight: 56, width: "auto", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
