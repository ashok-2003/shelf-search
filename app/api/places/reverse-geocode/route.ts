import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return NextResponse.json({ error: 'Latitude and longitude parameters are required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
        return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`Google Geocoding API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return NextResponse.json(
            { error: 'Failed to reverse geocode location' },
            { status: 500 }
        );
    }
}