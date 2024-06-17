import React, { useEffect, useState } from "react";
import Link from "next/link";
import { poppins } from "@/styles/fonts";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle menu toggle
  const [hasScrolled, setHasScrolled] = useState(false); // State to handle scroll
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { href: "/", label: "" },
    { href: "/about", label: "About" },
    { href: "/project", label: "Projects" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav
      className={`${
        poppins.className
      } backdrop-blur-xl fixed top-0 left-0 right-0 z-50 w-full h-[10vh] flex flex-row justify-between items-center px-10 text-slate-200 ${
        hasScrolled ? "border-b-[0.1px] border-gray-500" : ""
      }`}
    >
      <Link href="/">
        <span
          className={`w-[140px] text-lg hover:text-orange-500 hover:underline hover:underline-offset-8 ${
            router.pathname === "/" ? "text-orange-500" : ""
          }`}
        >
          nav
        </span>
      </Link>
      <button className="md:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`absolute top-full left-0 w-full bg-black md:bg-transparent md:static md:flex justify-end ${
          isOpen ? "flex justify-end" : "hidden"
        } flex-col md:flex-row items-center gap-16 px-10 py-5 md:p-0  bg-black/80 backdrop-blur-xl`}
      >
        {links.map(({ href, label }) => (
          <Link href={href} key={href} passHref>
            <span
              className={`text-slate-200 text-lg hover:text-orange-800 hover:underline hover:underline-offset-8 ${
                router.pathname === href ? "text-orange-500" : ""
              }`}
              onClick={(e) => {
                setIsOpen(false);
                if (router.pathname === href) {
                  e.preventDefault();
                }
              }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
