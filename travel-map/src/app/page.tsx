'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import { Location } from '@/types/location';
import { staticLocations } from '@/data/locations';

// Dynamic import for Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="loading-spinner" />
      <p>Loading map...</p>
    </div>
  ),
});

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // For demo, use static data. In production, fetch from API
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
        setLocations(staticLocations);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleSelectLocation = (id: string) => {
    setSelectedId(id);
  };

  const handleUserLocationChange = (location: [number, number]) => {
    setUserLocation(location);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner large" />
        <p>Loading TravelMap...</p>
      </div>
    );
  }

  return (
    <main className="app-container">
      <Sidebar
        locations={locations}
        selectedId={selectedId}
        onSelectLocation={handleSelectLocation}
        userLocation={userLocation}
      />

      <div className="map-wrapper">
        <Map
          locations={locations}
          selectedId={selectedId}
          onSelectLocation={handleSelectLocation}
          userLocation={userLocation}
          onUserLocationChange={handleUserLocationChange}
        />
      </div>
    </main>
  );
}