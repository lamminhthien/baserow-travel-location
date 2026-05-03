'use client';

import { Location } from '@/types/location';
import LocationCard from './LocationCard';

interface SidebarProps {
  locations: Location[];
  selectedId: string | null;
  onSelectLocation: (id: string) => void;
}

export default function Sidebar({ locations, selectedId, onSelectLocation }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="flex items-center gap-3">
          <div className="logo-icon">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TravelMap</h1>
            <p className="text-xs text-text-muted">Discover amazing places</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="sidebar-stats">
        <div className="stat-pill">
          <span className="stat-number">{locations.length}</span>
          <span className="stat-label">Locations</span>
        </div>
      </div>

      {/* Location List */}
      <div className="location-list">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            isSelected={location.id === selectedId}
            onSelect={() => onSelectLocation(location.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p className="text-xs text-text-muted">
          Click a marker on the map or a card to explore
        </p>
      </div>
    </aside>
  );
}