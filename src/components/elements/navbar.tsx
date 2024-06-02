import React from "react";
import Link from "next/link";
import { poppins } from "@/styles/fonts";

const Navbar = () => {
  return (
    <nav
      className={`${poppins.className} fixed top-0 left-0 right-0 z-50 w-full h-[10dvh] flex flex-row justify-between items-center px-10 text-white`}
      style={{ boxShadow: "0 2px 10px rgba(255, 255, 255, 0.5)" }} // Adding a white shadow
    >
      <Link href="/">
        <div className="w-[140px] text-lg">aws</div>
      </Link>
      <div className="w-3/7 flex gap-16 text-xl">
        <Link href={"/about"}>About</Link>
        <Link href={"/project"}>Projects</Link>
        <Link href={"/contact"}>Contact Me</Link>
      </div>
    </nav>
  );
};

export default Navbar;
