"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  const pathName = usePathname();
  return (
    <header>
      <nav className="flex items-center justify-center w-full fixed top-3 left-0 overflow-hidden z-50">
        <div className="w-3/5 px-8 py-3 rounded-xl backdrop-blur-lg flex items-center justify-between">
          {/* logo */}
          <div>
            <Image src="/Logo.png" alt="Logo" width={60} height={60} />
          </div>
          {/* nav links */}
          <div className="flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                className={`text-gray-400 ${
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
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
