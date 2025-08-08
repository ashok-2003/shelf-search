'use client'
import { useState, useCallback } from 'react';
import { searchPlaces, reverseGeocode } from '@/lib/actions/location-action';

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

export function useLocationSearch() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string>('');

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (query: string, callback: (results: LocationData[]) => void) => {
            if (!query || query.trim().length < 2) {
                callback([]);
                setIsSearching(false);
                return;
            }

            setSearchError('');
            
            try {
                const result = await searchPlaces(query);
                
                if (result.success) {
                    callback(result.data || []);
                } else {
                    setSearchError(result.error || 'Search failed');
                    callback([]);
                }
            } catch (error) {
                setSearchError('Search failed. Please try again.');
                callback([]);
            } finally {
                setIsSearching(false);
            }
        }, 800),
        []
    );

    const search = useCallback((query: string, callback: (results: LocationData[]) => void) => {
        setIsSearching(true);
        debouncedSearch(query, callback);
    }, [debouncedSearch]);

    const geocode = useCallback(async (lat: number, lng: number): Promise<LocationData | null> => {
        try {
            const result = await reverseGeocode(lat, lng);
            
            if (result.success && result.data) {
                return result.data;
            } else {
                setSearchError(result.error || 'Geocoding failed');
                return null;
            }
        } catch (error) {
            setSearchError('Geocoding failed. Please try again.');
            return null;
        }
    }, []);

    return {
        search,
        geocode,
        isSearching,
        searchError,
        clearError: () => setSearchError('')
    };
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