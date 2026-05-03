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