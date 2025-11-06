"use client";
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const pathName = usePathname();
  const User = useUser();
  const navRef = useRef<HTMLElement | null>(null);

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

  return (
    <header>
      <nav ref={navRef} className="flex  items-center justify-center w-full fixed top-3 left-0 overflow-hidden z-50">
        <div className="w-3/5 px-8 py-3 shadow-lg rounded-xl backdrop-blur-lg flex items-center justify-between">
          {/* logo */}
          <div>
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />
          </div>
          {/* nav links */}
          <div className="flex items-center justify-center gap-8">
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
          {/* user auth links */}
          <div>
            {User ? (
              <div className="flex items-center justify-center">
                <UserButton />
              </div>
            ) : (
              <div className="border px-3 py-2 rounded-lg backdrop-blur-sm bg-linear-to-t from-70% from-white/10 to-white/20">
                <SignUpButton>Sign Up</SignUpButton>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
