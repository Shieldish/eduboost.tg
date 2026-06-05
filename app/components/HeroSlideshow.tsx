"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SLIDES = [
  { src: "/adds.webp",       alt: "EduBoost - Étudiants YAS TOGO La Grande Tombola Solidaire" },
 /*  { src: "/adds2.webp",      alt: "EduBoost - Jouons aujourd'hui, construisons l'avenir" }, */
 { src: "/human-adds.webp", alt: "EduBoost - Ensemble pour l'éducation au Togo" }, 
];

const INTERVAL_MS = 5000;
const FADE_MS     = 700;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: "4 / 3" }}
      aria-live="polite"
      aria-label="Visuels EduBoost"
    >
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          aria-hidden={i !== active}
          style={{
            opacity:    i === active ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            willChange: "opacity",
            transform:  "translateZ(0)",  // force GPU layer — fix mobile Safari/Android
          }}
        />
      ))}

    </div>
  );
}
