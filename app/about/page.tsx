"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Highlighter } from "@/components/ui/highlighter";
import Link from "next/link";
import ShinyText from "@/components/ShinyText";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".about-hero", { y: 20, opacity: 0, duration: 0.6 });
      tl.from(
        ".about-card",
        { y: 18, opacity: 0, stagger: 0.12, duration: 0.5 },
        "-=.3"
      );
      tl.from(
        ".about-timeline > li",
        { x: -20, opacity: 0, stagger: 0.08, duration: 0.4 },
        "-=.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-6xl mt-12 mx-auto px-6 lg:px-8 py-16"
    >
      <header className="about-hero text-center mb-12">
        <p className="text-sm text-gray-400 mb-2">About Da-Blogs</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Welcome to <Highlighter action="underline">Da-Blogs</Highlighter>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300 mt-4">
          Da-Blogs is a technical blog publishing articles about modern web
          development, experiments, and practical guides. The site showcases
          subtle motion, performance-minded patterns, and a playful aesthetic.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3 mb-12">
        <article className="about-card rounded-2xl p-6 bg-black/40 backdrop-blur-md border border-white/6">
          <h3 className="text-lg font-semibold">Mission</h3>
          <p className="mt-2 text-sm text-gray-400">
            Share practical guides and experiments that help others ship
            projects faster and learn modern frontend patterns.
          </p>
        </article>

        <article className="about-card rounded-2xl p-6 bg-black/40 backdrop-blur-md border border-white/6">
          <h3 className="text-lg font-semibold">Stack</h3>
          <p className="mt-2 text-sm text-gray-400">
            Next.js 16, TypeScript, Tailwind CSS, GSAP, and tiny focused
            libraries for animations.
          </p>
        </article>

        <article className="about-card rounded-2xl p-6 bg-black/40 backdrop-blur-md border border-white/6">
          <h3 className="text-lg font-semibold">Fun</h3>
          <p className="mt-2 text-sm text-gray-400">
            Exploring subtle micro-interactions, glare effects, and playful
            copy. The blog enjoys experimenting and sharing findings.
          </p>
        </article>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Journey</h2>
        <ul className="about-timeline space-y-4 text-gray-300">
          <li className="p-4 rounded-lg bg-black/30 border border-white/6">
            <strong className="block">2021 — Origins</strong>
            <span className="text-sm text-gray-400">
              Started as a collection of notes and small experiments around
              frontend development.
            </span>
          </li>
          <li className="p-4 rounded-lg bg-black/30 border border-white/6">
            <strong className="block">2023 — Modern rebuild</strong>
            <span className="text-sm text-gray-400">
              Rebuilt on modern tools (Next.js, TypeScript) with a focus on
              performance and readable content.
            </span>
          </li>
          <li className="p-4 rounded-lg bg-black/30 border border-white/6">
            <strong className="block">2025 — Da-Blogs</strong>
            <span className="text-sm text-gray-400">
              Launched as a curated space for practical guides, experiments, and
              learnings.
            </span>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl p-8 bg-linear-to-r from-primary/10 to-transparent border border-white/6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Want to collaborate?</h3>
          <p className="text-sm text-gray-300 mt-2">
            I&apos;m open to short collaborations: articles, experiments, or
            small frontend projects.
          </p>
        </div>
        <div>
          <Link href="/contact" aria-label="Contact page">
            <ShinyButton>Contact</ShinyButton>
          </Link>
        </div>
      </section>

      <div className="mt-12 flex items-center gap-6">
        <Image
          src="/Surreal Glass Forms.png"
          alt="art"
          width={120}
          height={80}
          className="rounded-lg shadow-lg"
        />
        <div>
          <ShinyText text="Curiosity first." className="text-sm" />
          <p className="text-xs text-gray-400">
            Thanks for stopping by — keep exploring.
          </p>
        </div>
      </div>
    </div>
  );
}
