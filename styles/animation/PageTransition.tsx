"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SlideUpWrapper: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInWrapper: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};