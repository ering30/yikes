'use client';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState, useMemo, useCallback, useRef } from "react";
import MapSearch from "./MapSearch";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const mapRef = useRef<GoogleMap>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
    libraries: ["places"],
  });

  const center = useMemo<LatLngLiteral>(()=> ({lat: 4, lng: 134}),[]);
  const options = useMemo<MapOptions>(()=> ({
    mapId: "48dac4a80f64a31b",
    disableDefaultUI: true,
    clickableIcons: false,
  }),[]);
  const onLoad = useCallback(map => (mapRef.current = map), []);

  return (
    <>
      {isLoaded && (
        <div className="map">
          <MapSearch />
          <GoogleMap
            zoom={2}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          ></GoogleMap>
        </div>
      )}
      {!isLoaded && <h1>Loading...</h1>}
    </>
  );
}
