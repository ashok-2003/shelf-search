"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Navigation, ArrowLeft, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  area: string;
  state: string;
  country: string;
  pincode: string;
  fullAddress: string;
}

export const LocationPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // Default Delhi location
  const defaultLocation: LocationData = {
    latitude: 28.6139,
    longitude: 77.2090,
    city: "Delhi",
    area: "Connaught Place",
    state: "Delhi",
    country: "India",
    pincode: "110001",
    fullAddress: "Connaught Place, New Delhi, Delhi 110001, India"
  };

  // Sample nearby locations for demonstration
  const nearbyLocations: LocationData[] = [
    {
      latitude: 28.7041,
      longitude: 77.1025,
      city: "Delhi",
      area: "Rohini",
      state: "Delhi",
      country: "India",
      pincode: "110085",
      fullAddress: "Rohini, Delhi 110085, India"
    },
    {
      latitude: 28.5355,
      longitude: 77.3910,
      city: "Noida",
      area: "Sector 62",
      state: "Uttar Pradesh",
      country: "India",
      pincode: "201309",
      fullAddress: "Sector 62, Noida, Uttar Pradesh 201309, India"
    },
    {
      latitude: 28.4595,
      longitude: 77.0266,
      city: "Gurugram",
      area: "Cyber City",
      state: "Haryana",
      country: "India",
      pincode: "122002",
      fullAddress: "Cyber City, Gurugram, Haryana 122002, India"
    }
  ];

  useEffect(() => {
    // Try to get location from context (placeholder for now)
    // const locationFromContext = getLocationFromContext();
    // if (!locationFromContext) {
      setCurrentLocation(defaultLocation);
    // }
  }, []);

  const detectCurrentLocation = () => {
    setIsDetecting(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          const detectedLocation: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: "Delhi", // This would come from reverse geocoding
            area: "Current Location",
            state: "Delhi",
            country: "India",
            pincode: "110001",
            fullAddress: "Current Location, Delhi, India"
          };
          setCurrentLocation(detectedLocation);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          setCurrentLocation(defaultLocation);
          setIsDetecting(false);
        }
      );
    } else {
      setCurrentLocation(defaultLocation);
      setIsDetecting(false);
    }
  };

  const handleLocationSelect = (location: LocationData) => {
    setCurrentLocation(location);
    // Here you would save to context
    // saveLocationToContext(location);
  };

  const handleConfirmLocation = () => {
    if (currentLocation) {
      // Save location to context and navigate back
      // saveLocationToContext(currentLocation);
      router.back();
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate search API call
    setTimeout(() => {
      setIsLoading(false);
      // In real implementation, you'd search for locations based on searchQuery
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Select Location</h1>
          <div className="w-5"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search Section */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <Input
                type="text"
                placeholder="Search for area, street name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="text-white bg-green-500 hover:bg-green-600"
            >
              {isLoading ? "..." : "Search"}
            </Button>
          </div>

          {/* Detect Location Button */}
          <Button
            onClick={detectCurrentLocation}
            disabled={isDetecting}
            variant="outline"
            className="flex items-center justify-center w-full gap-2 text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
          >
            <Navigation className="w-4 h-4" />
            {isDetecting ? "Detecting..." : "Use Current Location"}
          </Button>
        </div>

        {/* Current Selected Location */}
        {currentLocation && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-green-500" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Selected Location
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {currentLocation.fullAddress}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">
                    Delivery available in this area
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nearby Locations */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Nearby Locations
          </h2>
          <div className="space-y-2">
            {nearbyLocations.map((location, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(location)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  currentLocation?.fullAddress === location.fullAddress
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {location.area}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {location.city}, {location.state} {location.pincode}
                    </p>
                  </div>
                  {currentLocation?.fullAddress === location.fullAddress && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        {currentLocation && (
          <div className="sticky bottom-0 pt-4 pb-safe">
            <Button
              onClick={handleConfirmLocation}
              className="w-full py-3 text-white bg-green-500 hover:bg-green-600"
            >
              Confirm Location & Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};