"use client";
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const pathName = usePathname();
  const { isSignedIn } = useUser();
  const navRef = useRef<HTMLElement | null>(null);

  // mobile drawer state and refs
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // hide/show navbar on scroll (existing behavior)
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: 0, opacity: 1 });

    let lastY = window.scrollY;
    const threshold = () => window.innerHeight * 0.1;
    let hidden = false;

    const hide = () => {
      if (hidden) return;
      hidden = true;
      gsap.to(nav, {
        yPercent: -150,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const show = () => {
      if (!hidden) return;
      hidden = false;
      gsap.to(nav, {
        yPercent: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > threshold()) {
        hide();
      } else {
        show();
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // open/close animations for drawer
  useEffect(() => {
    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    if (!overlay || !drawer) return;

    const ctx = gsap.context(() => {
      if (open) {
        // lock scroll
        document.body.style.overflow = "hidden";
        gsap.set(overlay, { display: "block" });
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" }
        );
        // ensure starting position then animate in
        gsap.set(drawer, { display: "block", xPercent: 100 });
        gsap.to(drawer, { xPercent: 0, duration: 0.45, ease: "power3.out" });
        // animate links inside drawer
        gsap.fromTo(
          drawer.querySelectorAll(".mobile-link"),
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, duration: 0.35, delay: 0.08 }
        );
        // focus first link
        setTimeout(
          () =>
            (
              drawer.querySelector(".mobile-link") as HTMLElement | null
            )?.focus(),
          300
        );
      } else {
        // unlock scroll
        document.body.style.overflow = "";
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        });
        gsap.to(drawer, {
          xPercent: 100,
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(drawer, { display: "none" });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [open]);

  // close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // focus trap for drawer and aria-live announcements
  const announceRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let cleanup = () => {};
    const drawer = drawerRef.current;
    if (open && drawer) {
      if (announceRef.current) announceRef.current.textContent = "Menu opened";
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      const handler = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", handler);
      cleanup = () => window.removeEventListener("keydown", handler);
    } else {
      if (announceRef.current) announceRef.current.textContent = "Menu closed";
    }

    return () => {
      cleanup();
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((s) => !s), []);

  return (
    <header>
      <nav
        ref={navRef}
        className="flex items-center justify-center w-full fixed top-3 left-0 overflow-visible z-50"
      >
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow-lg rounded-xl backdrop-blur-lg flex items-center justify-between px-4 py-3 bg-black/40 border border-white/6">
            {/* logo */}
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={52}
                  height={52}
                  style={{ width: "auto", height: "auto" }}
                  className="rounded-lg"
                />
              </Link>
            </div>

            {/* desktop links */}
            <div className="hidden md:flex items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  className={`text-gray-400 text-sm ${
                    pathName === link.href
                      ? "shadow-2xl shadow-white text-white border-2 px-3 py-1 rounded-xl bg-linear-to-r from-transparent via-white/20 to-transparent"
                      : "hover:text-white transition-all duration-300"
                  }`}
                  key={index}
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* right-side: auth + mobile menu */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                {isSignedIn ? (
                  <div className="flex items-center justify-center">
                    <UserButton />
                  </div>
                ) : (
                  <div className="border px-3 py-2 rounded-lg backdrop-blur-sm bg-linear-to-t from-70% from-white/10 to-white/20">
                    <SignUpButton>Sign Up</SignUpButton>
                  </div>
                )}
              </div>

              {/* mobile menu button */}
              <button
                onClick={toggle}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="p-2 rounded-md md:hidden text-gray-200 bg-white/5 hover:bg-white/10"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* overlay (rendered outside transformed nav to avoid fixed-position issues) */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        role="presentation"
        aria-hidden={!open}
        className={`fixed inset-0 bg-black/50 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        } z-60`}
        style={{ display: "none" }}
      />

      {/* drawer for mobile menu */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-label="Mobile menu"
        aria-modal={open}
        aria-hidden={!open}
        tabIndex={-1}
        className="fixed top-0 right-0 h-screen w-[85vw] max-w-xs bg-black/90 p-6 shadow-2xl z-70"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold">Menu</div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-md text-gray-200 bg-white/5 hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-link text-lg text-gray-300 p-2 rounded-md hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* extra site links for mobile */}
          <Link
            href="/privacy"
            className="mobile-link text-sm text-gray-400 p-2 rounded-md hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="mobile-link text-sm text-gray-400 p-2 rounded-md hover:bg-white/5"
            onClick={() => setOpen(false)}
          >
            Terms
          </Link>
        </nav>

        <div className="mt-6 border-t border-white/6 pt-4">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="mt-2">
              <SignUpButton>Sign Up</SignUpButton>
            </div>
          )}
        </div>
      </aside>
      <div ref={announceRef} className="sr-only" aria-live="polite" />
    </header>
  );
};
export default Navbar;
