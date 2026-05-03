import { NextResponse } from 'next/server';
import { staticLocations } from '@/data/locations';
import type { Location } from '@/types/location';
import { scrapeOpenGraph, type OpenGraphResult } from '@/utils/openGraph';
import { extractCoordinatesFromGoogleMapsLink } from '@/utils/location';

// Toggle this to switch between static data and Baserow API
const USE_BASEROW_API = process.env.USE_BASEROW_API === 'true';
const BASEROW_API_URL = process.env.BASEROW_API_URL || '';
const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN || '';

// Baserow table IDs
const TRAVEL_LOCATIONS_TABLE_ID = 956852;

/**
 * Enriches a single location with Open Graph data from its Google Maps link.
 * This resolves short links, fetches description, and gets map preview image.
 */
async function enrichLocationWithOG(location: {
  googleMapLinks?: string;
  description?: string;
  image?: string;
  lat?: number;
  lng?: number;
}): Promise<{
  googleMapLinks: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}> {
  const googleMapLinks = location.googleMapLinks || '';

  if (!googleMapLinks) {
    return {
      googleMapLinks,
      description: location.description || '',
      image: location.image || '',
      lat: location.lat || 0,
      lng: location.lng || 0,
    };
  }

  // Try to scrape Open Graph data from the Google Maps link
  const ogResult: OpenGraphResult | null = await scrapeOpenGraph(googleMapLinks);

  // Extract coordinates from the resolved URL
  let lat = location.lat || 0;
  let lng = location.lng || 0;

  if (ogResult?.resolvedUrl) {
    const coords = extractCoordinatesFromGoogleMapsLink(ogResult.resolvedUrl);
    if (coords) {
      lat = coords[0];
      lng = coords[1];
    }
  }

  return {
    // Use resolved URL if available, otherwise keep original
    googleMapLinks: ogResult?.resolvedUrl || googleMapLinks,
    // Use OG description if available, otherwise keep existing
    description: ogResult?.description || location.description || '',
    // Use OG image if available, otherwise keep existing
    image: ogResult?.image || location.image || '',
    lat,
    lng,
  };
}

export async function GET() {
  try {
    if (USE_BASEROW_API && BASEROW_API_URL && BASEROW_API_TOKEN) {
      // Fetch from Baserow API
      const response = await fetch(`https://api.baserow.io/api/database/rows/table/${TRAVEL_LOCATIONS_TABLE_ID}/?user_field_names=true`, {
        headers: {
          'Authorization': `Token ${BASEROW_API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from Baserow,`);
      }

      const data = await response.json();

      // Transform Baserow row data to our format
      let locations: Location[] = data.results.map((row: Record<string, unknown>) => ({
        id: String(row.id),
        name: String(row.name || ''),
        lat: Number(row.lat || row.latitude || 0),
        lng: Number(row.lng || row.longitude || 0),
        description: String(row.description || ''),
        price: Number(row.price || 0),
        currency: String(row.currency || 'USD'),
        image: String(row.image || ''),
        address: String(row.address || ''),
        googleMapLinks: String(row.googleMapLinks || ''),
      }));

      // Enrich with Open Graph data (resolves short links, fetches description + image)
      locations = await Promise.all(
        locations.map(async (location) => {
          const enriched = await enrichLocationWithOG(location);
          return {
            ...location,
            googleMapLinks: enriched.googleMapLinks,
            description: enriched.description,
            image: enriched.image,
            lat: enriched.lat,
            lng: enriched.lng,
          };
        })
      );

      return NextResponse.json(locations);
    }

    // Return static demo data
    let locations: Location[] = staticLocations;

    // Enrich with Open Graph data (resolves short links, fetches description + image)
    locations = await Promise.all(
      locations.map(async (location) => {
        const enriched = await enrichLocationWithOG(location);
        return {
          ...location,
          googleMapLinks: enriched.googleMapLinks,
          description: enriched.description,
          image: enriched.image,
          lat: enriched.lat,
          lng: enriched.lng,
        };
      })
    );

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations', errorDetails: String(error) },
      { status: 500 }
    );
  }
}