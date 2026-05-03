/* eslint-disable @next/next/no-img-element */
import { Location } from '@/types/location';
import { formatPrice, getGoogleMapsUrl, getGoogleReviewsUrl, getTikTokUrl } from '@/data/locations';
import { getLocationPosition, calculateDistance, formatDistance } from '@/utils/location';

interface LocationCardProps {
  location: Location;
  isSelected: boolean;
  onSelect: () => void;
  userLocation: [number, number] | null;
}

export default function LocationCard({ location, isSelected, onSelect, userLocation }: LocationCardProps) {
  const [lat, lng] = getLocationPosition(location);

  // Calculate distance if user location is available
  let distanceText = '';
  if (userLocation) {
    const distance = calculateDistance(
      userLocation[0],
      userLocation[1],
      lat,
      lng
    );
    distanceText = formatDistance(distance);
  }

  const handleGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getGoogleMapsUrl(lat, lng), '_blank');
  };

  const handleGoogleReviews = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getGoogleReviewsUrl(location.name), '_blank');
  };

  const handleTikTok = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getTikTokUrl(location.name), '_blank');
  };

  return (
    <div
      onClick={onSelect}
      className={`
        location-card
        group
        cursor-pointer
        rounded-xl
        overflow-hidden
        transition-all
        duration-200
        ease-out
        ${isSelected
          ? 'bg-surface-elevated border-2 border-primary shadow-lg shadow-primary/20'
          : 'bg-surface border-2 border-transparent hover:border-border hover:bg-surface-elevated'
        }
      `}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="price-badge">
            {formatPrice(location.price, location.currency)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
          {location.name}
        </h3>

        <p className="text-sm text-text-secondary line-clamp-2 mb-3">
          {location.description}
        </p>

        {/* Coordinates & Distance */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{lat.toFixed(4)}, {lng.toFixed(4)}</span>
          </div>
          {distanceText && (
            <span className="distance-badge">
              {distanceText}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleGoogleMaps}
            className="action-btn flex-1"
            title="View on Google Maps"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Map</span>
          </button>

          <button
            onClick={handleGoogleReviews}
            className="action-btn flex-1"
            title="Search Google Reviews"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Reviews</span>
          </button>

          <button
            onClick={handleTikTok}
            className="action-btn flex-1"
            title="Search TikTok"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
            <span>TikTok</span>
          </button>
        </div>
      </div>
    </div>
  );
}