"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pageVariants = {
    initial: { y: -50, opacity: 1, backgroundColor: "#000" },
    animate: { y: 0, opacity: 1, backgroundColor: "#000" },
    exit: { y: -50, opacity: 1, backgroundColor: "#000" },
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeInOut", duration: 0.75 }}
      key={router.route}
    >
      {children}
    </motion.div>
  );
}
