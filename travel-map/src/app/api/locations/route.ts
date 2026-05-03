import { NextResponse } from 'next/server';
import { staticLocations } from '@/data/locations';

// Toggle this to switch between static data and Baserow API
const USE_BASEROW_API = process.env.USE_BASEROW_API === 'true';
const BASEROW_API_URL = process.env.BASEROW_API_URL || '';
const BASEROW_API_TOKEN = process.env.BASEROW_API_TOKEN || '';

export async function GET() {
  try {
    if (USE_BASEROW_API && BASEROW_API_URL && BASEROW_API_TOKEN) {
      // Fetch from Baserow API
      const response = await fetch(`${BASEROW_API_URL}/api/database/rows/table/`, {
        headers: {
          'Authorization': `Token ${BASEROW_API_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Baserow');
      }

      const data = await response.json();

      // Transform Baserow data to our format (adjust field names as needed)
      const locations = data.results.map((row: Record<string, unknown>) => ({
        id: String(row.id),
        name: String(row.name || ''),
        lat: Number(row.lat || row.latitude || 0),
        lng: Number(row.lng || row.longitude || 0),
        description: String(row.description || ''),
        price: Number(row.price || 0),
        currency: String(row.currency || 'USD'),
        image: String(row.image || ''),
        address: String(row.address || '')
      }));

      return NextResponse.json(locations);
    }

    // Return static demo data
    return NextResponse.json(staticLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}