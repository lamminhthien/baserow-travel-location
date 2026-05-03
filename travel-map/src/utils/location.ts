/**
 * Calculates distance between two coordinates using the Haversine formula.
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formats distance for display.
 * @param distance - Distance in kilometers
 * @returns Formatted string (e.g., "1.2 km" or "900 m")
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
}

/**
 * Extracts latitude and longitude from a Google Maps URL.
 * Handles formats like:
 * - https://www.google.com/maps/place/.../@12.2568613,109.1998973,15z/...
 * - https://www.google.com/maps/@12.2568613,109.1998973,15z
 *
 * @param googleMapLink - The Google Maps URL string
 * @returns [lat, lng] tuple if found, otherwise null
 */
export function extractCoordinatesFromGoogleMapsLink(googleMapLink: string): [number, number] | null {
  if (!googleMapLink || googleMapLink.trim() === '') {
    return null;
  }

  const match = googleMapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2])];
  }

  return null;
}

/**
 * Gets the position (lat/lng) for a location,优先使用 Google Maps URL 中的坐标
 *
 * @param location - The location object
 * @returns [lat, lng] tuple, preferring coordinates from googleMapLinks if available
 */
export function getLocationPosition(location: { lat: number; lng: number; googleMapLinks?: string }): [number, number] {
  const coords = extractCoordinatesFromGoogleMapsLink(location.googleMapLinks || '');
  return coords || [location.lat, location.lng];
}