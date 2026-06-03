"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SLIDES = [
  { src: "/adds.png",  alt: "Étudiants YAS TOGO — EduBoost La Grande Tombola Solidaire" },
  { src: "/adds2.png", alt: "EduBoost — Jouons aujourd'hui, construisons l'avenir de nos enfants" },
];

const SLIDE_INTERVAL_MS = 10000;
const FADE_DURATION_MS  = 800;  // fondu plus long = plus smooth

export default function HeroSlideshow() {
  // active = index de l'image visible (opacity 1)
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(a => (a + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    /* .slideshow-container → aspect-ratio 4/3, position:relative, overflow:hidden (globals.css) */
    <div className="slideshow-container" aria-live="polite" aria-label="Visuels EduBoost">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className="object-contain object-bottom"
          style={{
            /* Toutes les images sont empilées (position:absolute via fill).
               Celle dont l'index = active passe à opacity 1, les autres à 0.
               La transition CSS fait le fondu entre elles automatiquement. */
            opacity:    i === active ? 1 : 0,
            transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          aria-hidden={i !== active}
        />
      ))}
    </div>
  );
}
