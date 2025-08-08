'use server'

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

// Function to parse address components
function parseAddressComponents(addressComponents: Array<{
    long_name: string;
    short_name: string;
    types: string[];
}>) {
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
}

// Server action for searching places
export async function searchPlaces(query: string): Promise<{
    success: boolean;
    data?: LocationData[];
    error?: string;
}> {
    try {
        // Validate input
        if (!query || query.trim().length < 4) {
            return {
                success: false,
                error: 'Query must be at least 4 characters long'
            };
        }

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
            return {
                success: false,
                error: 'Google Maps API key not configured'
            };
        }

        // Make API request
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&fields=place_id,formatted_address,name,geometry,address_components,types`
        );

        if (!response.ok) {
            throw new Error(`Google Places API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.results) {
            // Limit to maximum 15 results and format them
            const limitedResults = data.results
                .filter((result: any) => result.geometry && result.geometry.location)
            
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

            return {
                success: true,
                data: formattedResults
            };
        } else {
            return {
                success: true,
                data: []
            };
        }
    } catch (error) {
        console.error('Places search error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to search places'
        };
    }
}

// Server action for reverse geocoding
export async function reverseGeocode(lat: number, lng: number): Promise<{
    success: boolean;
    data?: LocationData;
    error?: string;
}> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
            return {
                success: false,
                error: 'Google Maps API key not configured'
            };
        }

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.status === 'OK' && data.results && data.results.length > 0) {
            const result = data.results[0];
            const components = parseAddressComponents(result.address_components);
            
            const locationData: LocationData = {
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

            return {
                success: true,
                data: locationData
            };
        } else {
            return {
                success: false,
                error: 'No results found for the provided coordinates'
            };
        }
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to reverse geocode'
        };
    }
}