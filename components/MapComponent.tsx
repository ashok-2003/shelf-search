"use client";
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface Props {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

const MapComponent: React.FC<Props> = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={14}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default MapComponent;
