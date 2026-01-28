import React, { useEffect, useState } from "react";
import Link from "next/link";
import { poppins } from "@/styles/fonts";
import { FaHome, FaUser, FaProjectDiagram, FaBlog } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { href: "/", icon: <FaHome />, label: "Home" },
    { href: "/about", icon: <FaUser />, label: "About" },
    { href: "/project", icon: <FaProjectDiagram />, label: "Projects" },
    { href: "/blog", icon: <FaBlog />, label: "Blog" },
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <nav
        className={`${
          poppins.className
        } bg-black/50 w-9/12 rounded-2xl backdrop-blur-2xl fixed top-10 z-50 h-[10vh] flex flex-row justify-between items-center px-10 text-slate-200 ${
          hasScrolled ? "border-b-[0.1px] border-gray-500" : ""
        }`}
      >
        <Link href="/">
          <span
            className={`w-[140px] text-lg flex items-center gap-2 hover:text-orange-800 hover:underline hover:underline-offset-8 ${
              router.pathname === "/" ? "text-orange-500" : ""
            }`}
          >
            nav
          </span>
        </Link>

        <div className="flex gap-6">
          {links.map(({ href, icon, label }) => (
            <Link href={href} key={href} passHref>
              <div className="relative group">
                <span
                  className={`text-lg flex items-center gap-2 hover:text-orange-800 hover:underline hover:underline-offset-8 bg-white/10 p-3 rounded-xl transition-all duration-300 ${
                    router.pathname === href ? "text-orange-500" : ""
                  }`}
                >
                  {icon}
                </span>

                {/* Tooltip */}
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-white bg-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
