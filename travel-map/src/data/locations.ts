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
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    googleMapLinks: 'https://www.google.com/maps/place/Eiffel+Tower/@48.8584,2.2945,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66fdfd1f1f1f1:0x1a1a1a1a1a1a1a1a!8m2!3d48.8584!4d2.2945'
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
    address: 'Oia, Santorini 847 02, Greece',
    googleMapLinks: 'https://www.google.com/maps/place/Qu%C3%A1n+C%C3%A0+Ph%C3%AA+La+Maison/@12.2568613,109.1998973,15z/data=!4m6!3m5!1s0x317067dd624c8f41:0xa1a9e45a1a5b5b68!8m2!3d12.2567821!4d109.1937689!16s%2Fg%2F11w84f_0ww?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D'
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
    address: 'Machu Picchu, Cusco Region, Peru',
    googleMapLinks: 'https://www.google.com/maps/place/Machu+Picchu/@-13.1631,-72.5450,17z/data=!3m1!4b1!4m5!3m4!1s0x91a9a1a1a1a1a1a1:0x1a1a1a1a1a1a1a1a!8m2!3d-13.1631!4d-72.5450'
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
    address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan',
    googleMapLinks: 'https://www.google.com/maps/place/Tokyo+Tower/@35.6586,139.7454,17z/data=!3m1!4b1!4m5!3m4!1s0x60188b0b0b0b0b0b:0x1a1a1a1a1a1a1a1a!8m2!3d35.6586!4d139.7454'
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
    address: 'Grand Canyon National Park, AZ 86023, USA',
    googleMapLinks: 'https://www.google.com/maps/place/Grand+Canyon+National+Park/@36.0544,-112.1401,17z/data=!3m1!4b1!4m5!3m4!1s0x873313f1a1a1a1a1:0x1a1a1a1a1a1a1a1a!8m2!3d36.0544!4d-112.1401'
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
    address: 'Tegallalang, Ubud, Gianyar, Bali, Indonesia',
    googleMapLinks: 'https://www.google.com/maps/place/Tegallalang+Rice+Terraces/@-8.4218,115.3191,17z/data=!3m1!4b1!4m5!3m4!1s0x2dd240b1b1b1b1b1:0x1a1a1a1a1a1a1a1a!8m2!3d-8.4218!4d115.3191'
  }
];

export function formatPrice(price: number, currency?: string): string {
  if (price === 0) return 'Free';

  // Default to VND when currency is not provided or not recognized
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    IDR: 'Rp',
    VND: 'VND',
  };

  const resolvedCurrency = (currency && symbols[currency]) ? currency : 'VND';

  // Format VND with compact K notation for thousands
  if (resolvedCurrency === 'VND') {
    const formatted =
      price >= 1_000_000
        ? `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`
        : price >= 1_000
        ? `${(price / 1_000).toFixed(price % 1_000 === 0 ? 0 : 1)}K`
        : `${price}`;
    return `${formatted} VND`;
  }

  return `${symbols[resolvedCurrency]}${price}`;
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