import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Default Delhi location
const defaultDelhiLocation: LocationData = {
    latitude: 28.6139,
    longitude: 77.2090,
    city: "Delhi",
    area: "Connaught Place",
    state: "Delhi",
    country: "India",
    pincode: "110001",
    fullAddress: "Connaught Place, New Delhi, Delhi 110001, India"
};

interface LocationStore {
    location: LocationData;
    isLocationSet: boolean;
    setLocation: (location: LocationData) => void;
    clearLocation: () => void;
    getLocationString: () => string;
    resetToDefault: () => void;
}

export const useLocationStore = create<LocationStore>()(
    persist(  // help to store the data locally 
        (set, get) => ({
            location: defaultDelhiLocation, 
            isLocationSet: false,
            
            setLocation: (location: LocationData) => {
                set({ 
                    location, 
                    isLocationSet: true 
                });
            },
            
            clearLocation: () => {
                set({ 
                    location: defaultDelhiLocation,
                    isLocationSet: false 
                });
            },

            resetToDefault: () => {
                set({ 
                    location: defaultDelhiLocation,
                    isLocationSet: false 
                });
            },
            
            getLocationString: () => {
                const { location } = get();
                return `${location.area}, ${location.city}`;
            }
        }),
        {
            name: 'location-storage', // localStorage key
            partialize: (state) => ({ 
                location: state.location,
                isLocationSet: state.isLocationSet 
            }),
        }
    )
);