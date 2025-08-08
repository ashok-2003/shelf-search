"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocationStore } from '@/store/locationStore';

export const LocationButton: React.FC = () => {
  const router = useRouter();
  const { location, isLocationSet, getLocationString } = useLocationStore();

  const handleLocationClick = () => {
    router.push('/location');
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLocationClick}
      className="flex items-center gap-2 p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-green-500" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900">
              Delivering to
              {!isLocationSet && (
                <span className="ml-1 text-xs text-gray-500">(Default)</span>
              )}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
            {location.area}, {location.city}, {location.state}, {location.country}
          </span>
        </div>
      </div>
    </Button>
  );
};