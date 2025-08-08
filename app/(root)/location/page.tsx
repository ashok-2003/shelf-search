"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Navigation, ArrowLeft, CheckCircle, Loader2, AlertCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import MapComponent from '@/components/MapComponent';
import { useLocationStore } from '@/store/locationStore';

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

interface SearchResult {
    place_id: string;
    formatted_address: string;
    name?: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    address_components: Array<{
        long_name: string;
        short_name: string;
        types: string[];
    }>;
    types: string[];
}

export default function LocationPage() {
    const router = useRouter();
    
    // Get location data and methods from Zustand store
    const { 
        location: currentLocation, 
        isLocationSet, 
        setLocation, 
        getLocationString 
    } = useLocationStore();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<LocationData[]>([]);
    const [isDetecting, setIsDetecting] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Function to parse address components from Google Places API
    const parseAddressComponents = (addressComponents: Array<{
        long_name: string;
        short_name: string;
        types: string[];
    }>) => {
        const components = {
            area: '',
            city: '',
            state: '',
            country: '',
            pincode: ''
        };

        addressComponents.forEach(component => {
            if (component.types.includes('sublocality_level_1') || component.types.includes('neighborhood')) {
                components.area = component.long_name;
            } else if (component.types.includes('locality')) {
                components.city = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
                components.state = component.long_name;
            } else if (component.types.includes('country')) {
                components.country = component.long_name;
            } else if (component.types.includes('postal_code')) {
                components.pincode = component.short_name;
            }
        });

        if (!components.area) {
            addressComponents.forEach(component => {
                if (component.types.includes('sublocality') || component.types.includes('route')) {
                    components.area = component.long_name;
                }
            });
        }

        return components;
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            const trimmedQuery = query.trim();
            
            if (!trimmedQuery || trimmedQuery.length < 2) {
                setSearchResults([]);
                setIsSearching(false);
                setShowSearchDropdown(false);
                return;
            }

            try {
                const response = await fetch(
                    `/api/places/search?query=${encodeURIComponent(trimmedQuery)}`
                );

                if (!response.ok) {
                    throw new Error('Search failed');
                }

                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    // Limit to maximum 15 results
                    const limitedResults = data.results.slice(0, 15);
                    
                    const formattedResults: LocationData[] = limitedResults.map((result: SearchResult) => {
                        const components = parseAddressComponents(result.address_components || []);
                        const areaName = result.name || components.area || 'Unknown Area';
                        
                        return {
                            latitude: result.geometry.location.lat,
                            longitude: result.geometry.location.lng,
                            city: components.city || 'Unknown City',
                            area: areaName,
                            state: components.state || 'Unknown State',
                            country: components.country || 'Unknown Country',
                            pincode: components.pincode || 'Unknown PIN',
                            fullAddress: result.formatted_address,
                            placeId: result.place_id
                        };
                    });

                    setSearchResults(formattedResults);
                    setShowSearchDropdown(true);
                } else {
                    setSearchResults([]);
                    setShowSearchDropdown(false);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
                setShowSearchDropdown(false);
            } finally {
                setIsSearching(false);
            }
        }, 500),
        []
    );

    // Handle search input change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        
        if (value.trim().length >= 2) {
            setIsSearching(true);
            debouncedSearch(value);
        } else {
            setSearchResults([]);
            setIsSearching(false);
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

    // Reverse geocode coordinates to get address
    const reverseGeocode = async (lat: number, lng: number): Promise<LocationData | null> => {
        try {
            const response = await fetch(
                `/api/places/reverse-geocode?lat=${lat}&lng=${lng}`
            );

            if (!response.ok) {
                throw new Error('Reverse geocoding failed');
            }

            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                const components = parseAddressComponents(result.address_components);
                
                return {
                    latitude: lat,
                    longitude: lng,
                    city: components.city || 'Unknown City',
                    area: components.area || 'Current Location',
                    state: components.state || 'Unknown State',
                    country: components.country || 'Unknown Country',
                    pincode: components.pincode || 'Unknown PIN',
                    fullAddress: result.formatted_address,
                    placeId: result.place_id
                };
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        }
        
        return null;
    };

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
            console.log("Permission API not supported, proceeding with geolocation request");
        }

        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 300000
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                console.log(latitude, longitude);
                
                try {
                    const locationData = await reverseGeocode(latitude, longitude);
                    
                    if (locationData) {
                        // Update the store with detected location
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
        // Update the store with selected location
        setLocation(location);
        setSearchQuery("");
        setSearchResults([]);
        setLocationError("");
        setShowSearchDropdown(false);
    };

    const handleConfirmLocation = () => {
        // Location is already saved in the store via setLocation
        // Just navigate back
        router.back();
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setShowSearchDropdown(false);
        searchInputRef.current?.focus();
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
                        <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for area, street name..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-10 pr-10 bg-white dark:bg-gray-800"
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
                                className="absolute left-0 right-0 z-20 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full dark:bg-gray-800 dark:border-gray-700 max-h-96"
                            >
                                <div className="p-2 text-xs text-gray-500 border-b border-gray-100 dark:border-gray-600">
                                    {searchResults.length} location{searchResults.length !== 1 ? 's' : ''} found
                                </div>
                                {searchResults.map((location, index) => (
                                    <button
                                        key={`${location.placeId}-${index}`}
                                        onClick={() => handleLocationSelect(location)}
                                        className="w-full p-3 text-left transition-colors border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 last:border-b-0"
                                    >
                                        <div className="flex items-start gap-3">
                                            <MapPin className="flex-shrink-0 w-4 h-4 mt-1 text-gray-400" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate dark:text-gray-100">
                                                    {location.area}
                                                </h4>
                                                <p className="text-sm text-gray-600 truncate dark:text-gray-400">
                                                    {location.fullAddress}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Detect Location Button */}
                    <Button
                        onClick={detectCurrentLocation}
                        disabled={isDetecting}
                        variant="outline"
                        className="flex items-center justify-center w-full gap-2 text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
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
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {isLocationSet ? 'Selected Location' : 'Default Location (Delhi)'}
                    </h2>
                    <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                        <MapComponent 
                            lat={currentLocation.latitude} 
                            lng={currentLocation.longitude}
                        />
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-1 text-green-500" />
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                    {currentLocation.area}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {currentLocation.fullAddress}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                    {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
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

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}