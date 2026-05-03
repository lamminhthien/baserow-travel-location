import { Location } from '@/types/location';

export const staticLocations: Location[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    lat: 48.8584,
    lng: 2.2945,
    description: 'Iconic iron lattice tower on the Champ de Mars in Paris, France. Built in 1889, it stands at 330 meters tall and is one of the most recognizable structures in the world.',
    price: 28,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&q=80',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'
  },
  {
    id: '2',
    name: 'Santorini Caldera',
    lat: 36.3932,
    lng: 25.4615,
    description: 'Stunning volcanic caldera in the Greek islands offering breathtaking views of white-washed buildings and deep blue waters. Perfect for sunset viewing.',
    price: 0,
    currency: 'EUR',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    address: 'Oia, Santorini 847 02, Greece'
  },
  {
    id: '3',
    name: 'Machu Picchu',
    lat: -13.1631,
    lng: -72.5450,
    description: 'Ancient Incan citadel set high in the Andes Mountains in Peru. Built in the 15th century and later abandoned, this UNESCO World Heritage site is one of the most famous archaeological sites in the world.',
    price: 54,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    address: 'Machu Picchu, Cusco Region, Peru'
  },
  {
    id: '4',
    name: 'Tokyo Tower',
    lat: 35.6586,
    lng: 139.7454,
    description: 'Communications and observation tower in Shiba-koen in Minato, Tokyo. Inspired by the Eiffel Tower, it stands at 333 meters and offers panoramic views of the city.',
    price: 18,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan'
  },
  {
    id: '5',
    name: 'Grand Canyon',
    lat: 36.0544,
    lng: -112.1401,
    description: 'Steep-sided canyon carved by the Colorado River in Arizona. It is 277 miles long, up to 18 miles wide and over a mile deep, exposing nearly 2 billion years of Earth\'s geological history.',
    price: 35,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&q=80',
    address: 'Grand Canyon National Park, AZ 86023, USA'
  },
  {
    id: '6',
    name: 'Bali Rice Terraces',
    lat: -8.4218,
    lng: 115.3191,
    description: 'Famous Tegallalang Rice Terraces in Ubud showcasing traditional Balinese irrigation system. The terraced landscapes offer stunning green views and insight into local agriculture.',
    price: 15,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    address: 'Tegallalang, Ubud, Gianyar, Bali, Indonesia'
  }
];

export function formatPrice(price: number, currency: string): string {
  if (price === 0) return 'Free';
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    IDR: 'Rp'
  };
  return `${symbols[currency] || currency}${price}`;
}

export function getGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function getGoogleReviewsUrl(name: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(name)}+reviews`;
}

export function getTikTokUrl(name: string): string {
  return `https://www.tiktok.com/search?q=${encodeURIComponent(name)}+travel`;
}