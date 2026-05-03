import { NextResponse } from 'next/server';
import { staticLocations } from '@/data/locations';

const USE_BASEROW_API = process.env.USE_BASEROW_API === 'true';
const BASEROW_API_URL = process.env.BASEROW_API_URL || '';
const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN || '';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    if (USE_BASEROW_API && BASEROW_API_URL && BASEROW_API_TOKEN) {
      const response = await fetch(`${BASEROW_API_URL}/api/database/rows/table/${id}/`, {
        headers: {
          'Authorization': `Token ${BASEROW_API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Baserow');
      }

      const row = await response.json();

      const location = {
        id: String(row.id),
        name: String(row.name || ''),
        lat: Number(row.lat || row.latitude || 0),
        lng: Number(row.lng || row.longitude || 0),
        description: String(row.description || ''),
        price: Number(row.price || 0),
        currency: String(row.currency || 'USD'),
        image: String(row.image || ''),
        address: String(row.address || ''),
        googleMapLinks: String(row.google_map_links || ''),
      };

      return NextResponse.json(location);
    }

    // Return static demo data
    const location = staticLocations.find(loc => loc.id === id);

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}