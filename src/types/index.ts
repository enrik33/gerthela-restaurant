export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'seafood' | 'fish' | 'drinks' | 'desserts';
  image_url?: string;
  available: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email?: string;
  website?: string;
  instagram?: string;
  latitude: number;
  longitude: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  image_url?: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  author: string;
  platform: 'tripadvisor' | 'google' | 'restaurant_guru';
  rating: number;
  content: string;
  date: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at?: string;
  last_login?: string;
}
