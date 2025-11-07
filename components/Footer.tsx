"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import ShinyText from "./ShinyText";
import { Highlighter } from "./ui/highlighter";
import { ShinyButton } from "./ui/shiny-button";

// Contract / expectations
// Inputs: none (reads current route to highlight nav links)
// Outputs: renders a responsive footer with brand, nav, social, newsletter, legal.
// Error modes: newsletter submit is client-side only; gracefully no-op.

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    // Placeholder integration point: connect to your email provider/API here.
    // For now, just notify.
    if (email) {
      alert(`Thanks! We'll keep you posted at ${email}`);
    }
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="mt-24 border-t border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden">
      {/* subtle animated shine border */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-12 md:gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Da-Blogs Logo"
                width={56}
                height={56}
                className="rounded-xl shadow-lg"
                priority
              />
              <span className="text-xl font-semibold tracking-wide">
                <Highlighter action="underline">Da-Blogs</Highlighter>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Crafting insights, stories & code. Built with Next.js 16,
              TypeScript and a sprinkle of animation.
            </p>
            <ShinyText text="Stay curious." className="text-sm" />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider text-gray-300">
              Navigate
            </h2>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm px-2 py-1 rounded-md transition-colors duration-300 ${
                      pathname === link.href
                        ? "bg-white/10 text-white shadow"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider text-gray-300">
              Newsletter
            </h2>
            <p className="text-sm text-gray-400">
              Get occasional updates on new posts & experiments. No spam.
            </p>
            <form
              onSubmit={handleSubmit}
              className="space-y-3"
              aria-label="Subscribe to newsletter"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  className="w-full rounded-md bg-black/50 border border-white/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/30"
                />
                <ShinyButton className="text-xs px-4 py-2">Join</ShinyButton>
              </div>
              <p className="text-[10px] text-gray-500">
                By subscribing you agree to receive emails from Da-Blogs.
              </p>
            </form>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider text-gray-300">
              Connect
            </h2>
            <ul className="flex flex-wrap gap-3" aria-label="Social links">
              <li>
                <Link
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
                >
                  <Github className="size-4 group-hover:scale-110 transition-transform" />{" "}
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
                >
                  <Twitter className="size-4 group-hover:scale-110 transition-transform" />{" "}
                  X / Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
                >
                  <Linkedin className="size-4 group-hover:scale-110 transition-transform" />{" "}
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contact@example.com"
                  className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
                >
                  <Mail className="size-4 group-hover:scale-110 transition-transform" />{" "}
                  Email
                </Link>
              </li>
            </ul>
            <div className="text-sm text-gray-400 space-y-1">
              <p>
                <span className="font-medium text-white">Reach out:</span>{" "}
                contact@example.com
              </p>
              <p>Based somewhere on Earth 🌍</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Da-Blogs. All rights reserved. Built
            with <span className="text-white">Next.js</span>.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white"
              aria-label="Back to top"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
