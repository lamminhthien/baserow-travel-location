export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  price: number;
  currency: string;
  image: string;
  address: string;
  googleMapLinks: string;
  approved?: boolean;
}