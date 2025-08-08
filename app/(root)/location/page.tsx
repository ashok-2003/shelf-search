"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Navigation, ArrowLeft, CheckCircle, Loader2, AlertCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import MapComponent from '@/components/MapComponent';
import { useLocationStore } from '@/store/locationStore';
import { useLocationSearch } from '@/hooks/useLocationSearch';

interface LocationData {
    latitude: number;
    longitude: number;
    city: string;
    area: string;
    state: string;
    country: string;
    pincode: string;
    fullAddress: string;
    placeId?: string;
}

export default function LocationPage() {
    const router = useRouter();
    
    // Get location data and methods from Zustand store
    const { 
        location: currentLocation, 
        isLocationSet, 
        setLocation 
    } = useLocationStore();
    
    // Use the custom hook for location search
    const { search, geocode, isSearching, searchError, clearError } = useLocationSearch();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<LocationData[]>([]);
    const [isDetecting, setIsDetecting] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        clearError(); // Clear any previous search errors
        
        if (value.trim().length >= 4) {
            search(value, (results) => {
                setSearchResults(results);
                setShowSearchDropdown(results.length > 0);
            });
        } else {
            setSearchResults([]);
            setShowSearchDropdown(false);
        }
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target as Node)
            ) {
                setShowSearchDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check if geolocation is available and get detailed error messages
    const getLocationErrorMessage = (error: GeolocationPositionError): string => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                return "Location access denied. Please enable location permissions in your browser settings and try again.";
            case error.POSITION_UNAVAILABLE:
                return "Location information is unavailable. Please try again or search for your location manually.";
            case error.TIMEOUT:
                return "Location request timed out. Please try again or search for your location manually.";
            default:
                return "An unknown error occurred while getting your location. Please try searching manually.";
        }
    };

    const detectCurrentLocation = async () => {
        setIsDetecting(true);
        setLocationError("");

        if (!("geolocation" in navigator)) {
            setLocationError("Geolocation is not supported by this browser. Please search for your location manually.");
            setIsDetecting(false);
            return;
        }

        if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            setLocationError("Location access requires a secure connection (HTTPS). Please search for your location manually.");
            setIsDetecting(false);
            return;
        }

        try {
            const permission = await navigator.permissions.query({ name: 'geolocation' });
            
            if (permission.state === 'denied') {
                setLocationError("Location permission is blocked. Please enable location access in your browser settings and refresh the page.");
                setIsDetecting(false);
                return;
            }
        } catch (error) {
            console.error("Permission API not supported, proceeding with geolocation request");
        }

        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    const locationData = await geocode(latitude, longitude);
                    
                    if (locationData) {
                        setLocation(locationData);
                        setLocationError("");
                    } else {
                        // Fallback location data
                        const fallbackLocation: LocationData = {
                            latitude,
                            longitude,
                            city: "Unknown City",
                            area: "Current Location",
                            state: "Unknown State",
                            country: "Unknown Country",
                            pincode: "Unknown PIN",
                            fullAddress: `Current Location (${latitude.toFixed(6)}, ${longitude.toFixed(6)})`
                        };
                        setLocation(fallbackLocation);
                        setLocationError("");
                    }
                } catch (error) {
                    console.error("Error processing location:", error);
                    setLocationError("Error processing your location. Please try searching manually.");
                } finally {
                    setIsDetecting(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                const errorMessage = getLocationErrorMessage(error);
                setLocationError(errorMessage);
                setIsDetecting(false);
            },
            options
        );
    };

    const handleLocationSelect = (location: LocationData) => {
        setLocation(location);
        setSearchQuery("");
        setSearchResults([]);
        setLocationError("");
        setShowSearchDropdown(false);
        clearError();
    };

    const handleConfirmLocation = () => {
        router.back();
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setShowSearchDropdown(false);
        clearError();
        searchInputRef.current?.focus();
    };

    return (
        <div className="min-h-screen bg-default-50">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between pb-2">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold">Select Location</h1>
                    <div className="w-5"></div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Default Location Notice */}
                {!isLocationSet && (
                    <div className="flex items-center gap-2 p-3 text-sm text-blue-700 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
                        <MapPin className="flex-shrink-0 w-4 h-4" />
                        <p>Currently showing Delhi as default location. Search or detect your location to change.</p>
                    </div>
                )}

                {/* Search Section */}
                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for area, street name..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 pr-10 bg-white"
                            onFocus={() => {
                                if (searchResults.length > 0) {
                                    setShowSearchDropdown(true);
                                }
                            }}
                        />
                        {isSearching && (
                            <Loader2 className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 animate-spin right-3 top-1/2" />
                            
                        )}
                        {searchQuery && !isSearching && (
                            <button
                                onClick={clearSearch}
                                className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}

                        {/* Search Dropdown */}
                        {showSearchDropdown && searchResults.length > 0 && (
                            <div 
                                ref={dropdownRef}
                                className="absolute left-0 right-0 z-20 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full max-h-96"
                            >
                                <div className="p-2 text-xs text-gray-500 border-b border-gray-100">
                                    {searchResults.length} location{searchResults.length !== 1 ? 's' : ''} found
                                </div>
                                {searchResults.map((location, index) => (
                                    <button
                                        key={`${location.placeId}-${index}`}
                                        onClick={() => handleLocationSelect(location)}
                                        className="w-full p-3 text-left transition-colors border-b border-gray-100 hover:bg-gray-50 last:border-b-0"
                                    >
                                        <div className="flex items-start gap-3">
                                            <MapPin className="flex-shrink-0 w-4 h-4 mt-1 text-gray-400" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate">
                                                    {location.area}
                                                </h4>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {location.fullAddress}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Error Message */}
                    {searchError && (
                        <div className="flex items-start gap-2 p-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <p>{searchError}</p>
                        </div>
                    )}

                    {/* Detect Location Button */}
                    <Button
                        onClick={detectCurrentLocation}
                        disabled={isDetecting}
                        variant="outline"
                        className="flex items-center justify-center w-full gap-2 text-green-600 bg-green-100 border-green-200 hover:bg-green-200"
                    >
                        {isDetecting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Navigation className="w-4 h-4" />
                        )}
                        {isDetecting ? "Detecting Location..." : "Use Current Location"}
                    </Button>

                    {/* Location Error Message */}
                    {locationError && (
                        <div className="flex items-start gap-2 p-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <p>{locationError}</p>
                        </div>
                    )}
                </div>

                {/* Current Selected Location */}
                <div className="space-y-3">
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                        <MapComponent 
                            lat={currentLocation.latitude} 
                            lng={currentLocation.longitude}
                        />
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-1 text-green-500" />
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                    {currentLocation.area}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {currentLocation.fullAddress}
                                </p>
                            </div>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="sticky bottom-0 pt-4 pb-safe">
                    <Button
                        onClick={handleConfirmLocation}
                        className="w-full py-3 text-white bg-green-500 hover:bg-green-600"
                    >
                        {isLocationSet ? 'Confirm Location & Continue' : 'Continue with Delhi'}
                    </Button>
                </div>
            </div>
        </div>
    );
}