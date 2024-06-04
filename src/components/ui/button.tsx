import React, { useState } from "react";
import { motion } from "framer-motion";

export const WobbleButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [wobbleEffect, setWobbleEffect] = useState(0);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setWobbleEffect(1);
  };

  const handleAnimationComplete = () => {
    if (isHovering) {
      setWobbleEffect(wobbleEffect === 1 ? -1 : 1);
    }
  };

  return (
    <motion.button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        setIsHovering(false);
        setWobbleEffect(0);
      }}
      animate={{
        rotate: isHovering ? wobbleEffect * 5 : 0,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{
        type: "tween",
        stiffness: 100,
        damping: 10,
      }}
      onAnimationComplete={handleAnimationComplete}
      className={className}
    >
      {children}
    </motion.button>
  );
};
