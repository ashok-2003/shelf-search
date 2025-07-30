"use client";

import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CommandSearchProps {
  placeholder?: string;
  className?: string;
  showKbd?: boolean;
  width?: string; // Tailwind width class
}

export const SimpleSearchComponent = ({ 
  placeholder = "Search...", 
  className = "",
  showKbd = true,
  width = "w-40" // Default Tailwind width class (384px but responsive)
}: CommandSearchProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/search');
  };

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer ${width} ${className}`}
    >
      <Input
        placeholder={placeholder}
        startContent={
          <SearchIcon className="w-4 h-4 text-default-400" />
        }
        classNames={{
          base: "w-full", // Input takes full width of container
          inputWrapper: "bg-[#F2F5F2] transition-colors cursor-pointer",
          input: "text-sm placeholder:text-default-500 cursor-pointer",
        }}
        radius="sm"
        size="md"
        readOnly
        onClick={handleClick}
      />
    </div>
  );
};