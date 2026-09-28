export type CategoryType = 
  | 'Fashion'
  | 'Accessories'
  | 'Electronics'
  | 'Books'
  | 'Sports'
  | 'Tools'
  | 'Travel'
  | 'Events';

export type ItemCondition = 'Brand New' | 'Like New' | 'Gently Used' | 'Good';

export interface Owner {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  memberSince: string;
  responseTime: string;
  neighborhood: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Listing {
  id: string;
  title: string;
  category: CategoryType;
  subcategory?: string;
  description: string;
  dailyPrice: number;
  securityDeposit: number;
  images: string[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  location: string;
  condition: ItemCondition;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  deliveryFee: number;
  owner: Owner;
  rules: string[];
  included: string[];
  careInstructions?: string;
  isAvailable: boolean;
  createdAt: string;
  featured?: boolean;
  popular?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  listingId: string;
  listing: Listing;
  startDate: string;
  endDate: string;
  days: number;
  deliveryType: 'pickup' | 'delivery';
}

export type OrderStatus = 
  | 'Reserved'
  | 'Ready for pickup'
  | 'Picked up'
  | 'Active rental'
  | 'Returned'
  | 'Completed'
  | 'Cancelled';

export interface OrderItem {
  listing: Listing;
  startDate: string;
  endDate: string;
  days: number;
  rentalCost: number;
  deposit: number;
}

export interface OrderTimelineEvent {
  title: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: OrderItem[];
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  deliveryMethod: 'pickup' | 'delivery';
  address?: {
    houseFlat: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  paymentId: string;
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  securityDeposit: number;
  totalPaid: number;
  status: OrderStatus;
  pickupTime: string;
  returnTime: string;
  timeline: OrderTimelineEvent[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  memberSince: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  bio: string;
  idVerificationStatus: 'Verified' | 'Pending' | 'Unverified';
}
