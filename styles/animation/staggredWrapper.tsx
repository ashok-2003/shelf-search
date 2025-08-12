"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredWrapperProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredWrapper: React.FC<StaggeredWrapperProps> = ({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut"
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};