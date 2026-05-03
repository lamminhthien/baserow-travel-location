'use client';

import { useState, useCallback } from 'react';
import { Location } from '@/types/location';
import LocationCard from './LocationCard';

interface SidebarProps {
  locations: Location[];
  selectedId: string | null;
  onSelectLocation: (id: string) => void;
  userLocation: [number, number] | null;
}

export default function Sidebar({ locations, selectedId, onSelectLocation, userLocation }: SidebarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setMobileExpanded(prev => !prev);
  }, []);

  const handleSelect = useCallback((id: string) => {
    onSelectLocation(id);
    // Collapse drawer after selecting on mobile
    setMobileExpanded(false);
  }, [onSelectLocation]);

  return (
    <>
      {/* Floating "Show List" button — visible on mobile only when drawer is collapsed */}
      <button
        className={`sidebar-fab${mobileExpanded ? ' sidebar-fab--hidden' : ''}`}
        onClick={handleToggle}
        aria-label="Show locations list"
        aria-hidden={mobileExpanded}
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>{locations.length} Places</span>
      </button>

      {/* Backdrop — mobile only */}
      {mobileExpanded && (
        <div className="sidebar-backdrop" onClick={handleToggle} aria-hidden="true" />
      )}

      <aside className={`sidebar${mobileExpanded ? ' sidebar--open' : ''}`}>
        {/* Drag handle — mobile only */}
        <div className="sidebar-drag-handle" onClick={handleToggle} role="button" aria-label="Toggle sidebar">
          <div className="drag-pill" />
        </div>

        {/* Header */}
        <div className="sidebar-header">
          <div className="flex items-center gap-3">
            <div className="logo-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">TravelMap</h1>
              <p className="text-xs text-text-muted">Discover amazing places</p>
            </div>
            {/* Close button — mobile only */}
            <button
              className="sidebar-close-btn"
              onClick={handleToggle}
              aria-label="Close sidebar"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
              onSelect={() => handleSelect(location.id)}
              userLocation={userLocation}
            />
          ))}
        </div>

        {/* Add Location Button */}
        <div className="sidebar-add-location">
          <a
            href="https://baserow.io/form/m4L4gWcFu2uk4Al6AHz4LJX5xVcJF3Zyj1CxVrU3lxk"
            target="_blank"
            rel="noopener noreferrer"
            className="add-location-btn"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Location
          </a>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p className="text-xs text-text-muted">
            Click a marker on the map or a card to explore
          </p>
        </div>
      </aside>
    </>
  );
}