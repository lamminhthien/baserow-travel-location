'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Location } from '@/types/location';
import { formatPrice } from '@/data/locations';
import { getLocationPosition } from '@/utils/location';

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
}

function createCustomIcon(price: number, currency: string, isActive: boolean) {
  const priceText = price === 0 ? 'Free' : formatPrice(price, currency);
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
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%);
          color: white;
          padding: 6px 10px;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
          border: 2px solid white;
          position: relative;
        ">
          ${priceText}
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

export default function Map({ locations, selectedId, onSelectLocation }: MapProps) {
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

      <MapController center={center} />

      {locations.map((location) => {
        const position = getLocationPosition(location);

        return (
          <Marker
            key={location.id}
            position={position}
            icon={createCustomIcon(location.price, location.currency, location.id === selectedId)}
            eventHandlers={{
              click: () => onSelectLocation(location.id),
            }}
          />
        );
      })}
    </MapContainer>
  );
}