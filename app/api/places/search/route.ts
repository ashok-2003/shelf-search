import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
        return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&fields=place_id,formatted_address,geometry,address_components`
        );

        if (!response.ok) {
            throw new Error(`Google Places API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Places search error:', error);
        return NextResponse.json(
            { error: 'Failed to search places' },
            { status: 500 }
        );
    }
}