'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Location } from '@/types/location';
import { formatPrice } from '@/data/locations';
import { getLocationPosition, calculateDistance, formatDistance } from '@/utils/location';

import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  locations: Location[];
  selectedId: string | null;
  onSelectLocation: (id: string) => void;
  userLocation: [number, number] | null;
  onUserLocationChange: (location: [number, number]) => void;
}

function LocateControl({ onUserLocationChange }: { onUserLocationChange: (location: [number, number]) => void }) {
  const map = useMap();

  useEffect(() => {
    const locateBtn = L.Control.extend({
      onAdd: function () {
        const btn = L.DomUtil.create('button', 'leaflet-locate-btn');
        btn.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
          </svg>
        `;
        btn.title = 'Find my location';
        btn.style.cssText = `
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
          transition: all 0.2s ease;
          z-index: 1000;
        `;

        btn.onclick = function () {
          map.locate({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        };

        return btn;
      },
    });

    const control = new locateBtn({ position: 'topright' });
    control.addTo(map);

    const handleLocationFound = (e: L.LeafletEvent) => {
      const event = e as unknown as { latlng: { lat: number; lng: number } };
      onUserLocationChange([event.latlng.lat, event.latlng.lng]);
      map.flyTo([event.latlng.lat, event.latlng.lng], 15, { duration: 1 });
    };

    const handleLocationError = (e: L.LeafletEvent) => {
      const event = e as unknown as { code: number; message: string };
      console.error('Location error:', event.message);

      let userMessage = 'Unable to get your location.';
      if (event.code === 1) {
        userMessage = 'Location permission denied. Please enable location access in your browser settings.';
      } else if (event.code === 2) {
        userMessage = 'Location services unavailable. Please enable GPS or Wi-Fi positioning.';
      } else if (event.code === 3) {
        userMessage = 'Location request timed out. Please try again.';
      }

      alert(userMessage);
    };

    map.on('locationfound', handleLocationFound);
    map.on('locationerror', handleLocationError);

    return () => {
      control.remove();
      map.off('locationfound', handleLocationFound);
      map.off('locationerror', handleLocationError);
    };
  }, [map, onUserLocationChange]);

  return null;
}

function createUserIcon() {
  return L.divIcon({
    className: 'user-marker',
    html: `
      <div style="
        background: #3b82f6;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
        color: white;
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function createCustomIcon(
  location: Location,
  userLocation: [number, number] | null,
  isActive: boolean
) {
  const position = getLocationPosition(location);
  let distanceText = formatPrice(location.price, location.currency);

  if (userLocation) {
    const distance = calculateDistance(
      userLocation[0],
      userLocation[1],
      position[0],
      position[1]
    );
    distanceText = formatDistance(distance);
  }

  const scale = isActive ? 1.15 : 1;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        transform: scale(${scale});
        transition: transform 0.2s ease-out;
        transform-origin: center bottom;
      ">
        <div style="
          display: inline-block;
          width: max-content;
          max-width: 220px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%);
          color: white;
          padding: 6px 10px;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.4;
          white-space: normal;
          word-break: break-word;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
          border: 2px solid white;
          position: relative;
        ">
          ${distanceText} - ${location.name}
          <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
          "></div>
        </div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 40],
  });
}

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 17, {
        duration: 1,
      });
    }
  }, [center, map]);

  return null;
}

export default function Map({ locations, selectedId, onSelectLocation, userLocation, onUserLocationChange }: MapProps) {
  const selectedLocation = locations.find(loc => loc.id === selectedId);
  const center: [number, number] | null = selectedLocation
    ? getLocationPosition(selectedLocation)
    : null;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocateControl onUserLocationChange={onUserLocationChange} />
      <MapController center={center} />

      {userLocation && (
        <Marker
          position={userLocation}
          icon={createUserIcon()}
          zIndexOffset={1000}
        />
      )}

      {locations.map((location) => {
        const position = getLocationPosition(location);

        return (
          <Marker
            key={location.id}
            position={position}
            icon={createCustomIcon(location, userLocation, location.id === selectedId)}
            eventHandlers={{
              click: () => onSelectLocation(location.id),
            }}
          />
        );
      })}
    </MapContainer>
  );
}