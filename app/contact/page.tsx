"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ShinyText from "@/components/ShinyText";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-hero", { y: 18, opacity: 0, duration: 0.6 });
      gsap.from(".contact-card", {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
      });
      gsap.from("form .field", {
        x: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const name = fd.get("name");
    const email = fd.get("email");
    const message = fd.get("message");
    // TODO: replace with real submission server action
    alert(
      `Thanks ${name || "friend"}! We'll respond to ${
        email || "your email"
      } soon.`
    );
    // keep message visible for integration/debug
    // (replace with a server submission or API call)
    console.log("contact message:", { name, email, message });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div
      ref={rootRef}
      className="max-w-4xl h-[75vh] flex flex-col items-center justify-center mx-auto px-6 lg:px-8 py-16"
    >
      <header className="contact-hero text-center mb-10">
        <h1 className="text-4xl font-extrabold">Get in touch</h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
          Whether you have a question, collaboration, or feedback — send a
          message and I&apos;ll reply.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <aside className="contact-card rounded-2xl p-6 bg-black/40 border border-white/6">
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <ul className="mt-4 space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="mt-1" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-gray-400 text-xs">Remote / Wherever</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-400 text-xs">contact@example.com</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-1" />
              <div>
                <div className="font-medium">Response time</div>
                <div className="text-gray-400 text-xs">
                  Usually within a few days
                </div>
              </div>
            </li>
          </ul>

          <div className="mt-6">
            <ShinyText text="Let's build something." />
          </div>
        </aside>

        <main className="contact-card rounded-2xl p-6 bg-black/40 border border-white/6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label="Contact form"
          >
            <div className="field">
              <label htmlFor="name" className="sr-only">
                Your name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full rounded-md bg-black/50 border border-white/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className="field">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@domain.com"
                className="w-full rounded-md bg-black/50 border border-white/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className="field">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can I help?"
                className="w-full rounded-md bg-black/50 border border-white/15 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="rounded-md px-4 py-2 bg-white/5 hover:bg-white/10 transition"
              >
                Send message
              </button>
              <button
                type="button"
                onClick={() =>
                  (
                    document.getElementById(
                      "message"
                    ) as HTMLTextAreaElement | null
                  )?.focus()
                }
                className="text-sm text-gray-400 hover:text-white"
              >
                Need help writing?
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
