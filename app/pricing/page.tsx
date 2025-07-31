"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error('Error getting location:', err);
        setError('Location permission denied or unavailable');
      },
      {
        enableHighAccuracy: true, // uses GPS if available
        timeout: 10000,
      }
    );
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      {location ? (
        <p>
          📍 Your current location is: <br />
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      ) : error ? (
        <p>⚠️ {error}</p>
      ) : (
        <p>📡 Getting your location...</p>
      )}
    </div>
  );
}


