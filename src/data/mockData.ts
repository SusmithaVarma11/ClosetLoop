import { Listing, UserProfile, Order } from '../types';
import { FASHION_LISTINGS } from './categories/fashion';
import { ACCESSORIES_LISTINGS } from './categories/accessories';
import { ELECTRONICS_LISTINGS } from './categories/electronics';
import { BOOKS_LISTINGS } from './categories/books';
import { SPORTS_LISTINGS } from './categories/sports';
import { TOOLS_LISTINGS } from './categories/tools';
import { TRAVEL_LISTINGS } from './categories/travel';
import { EVENTS_LISTINGS } from './categories/events';

export const HERO_IMAGE = '/src/assets/images/hero_curated_collection_1790614305476.jpg';

export const INITIAL_USER: UserProfile = {
  name: 'Susmitha Varma',
  email: 'susmithavrma@gmail.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  location: 'Indiranagar, Bengaluru',
  memberSince: 'March 2024',
  verified: true,
  rating: 4.95,
  reviewsCount: 18,
  bio: 'Community enthusiast, occasional film shooter, and lover of sustainable fashion. Always take meticulous care of borrowed gear.',
  idVerificationStatus: 'Verified',
};

// 80 items: exactly 10 distinct curated items in each of the 8 categories with unique individual photography
export const INITIAL_LISTINGS: Listing[] = [
  ...FASHION_LISTINGS,
  ...ACCESSORIES_LISTINGS,
  ...ELECTRONICS_LISTINGS,
  ...BOOKS_LISTINGS,
  ...SPORTS_LISTINGS,
  ...TOOLS_LISTINGS,
  ...TRAVEL_LISTINGS,
  ...EVENTS_LISTINGS,
];

export const INITIAL_ORDERS: Order[] = [
  {
    orderId: 'CL-20481',
    createdAt: '2026-09-27T14:30:00Z',
    items: [
      {
        listing: FASHION_LISTINGS[0],
        startDate: '2026-09-29',
        endDate: '2026-10-02',
        days: 3,
        rentalCost: 750,
        deposit: 1500,
      }
    ],
    contact: {
      fullName: 'Susmitha Varma',
      email: 'susmithavrma@gmail.com',
      phone: '+91 98765 43210',
    },
    deliveryMethod: 'pickup',
    paymentMethod: 'upi',
    paymentId: 'pay_sim_928174102',
    subtotal: 750,
    serviceFee: 75,
    deliveryFee: 0,
    securityDeposit: 1500,
    totalPaid: 2325,
    status: 'Reserved',
    pickupTime: 'Tomorrow, 10:00 AM',
    returnTime: 'Friday, 6:00 PM',
    timeline: [
      { title: 'Reservation Confirmed', time: 'Sep 27, 2:30 PM', completed: true },
      { title: 'Owner Accepted & Prepared', time: 'Sep 27, 3:15 PM', completed: true },
      { title: 'Scheduled Pickup Window', time: 'Tomorrow, 10:00 AM', completed: false, current: true },
      { title: 'Active Rental Period', time: 'Sep 29 - Oct 02', completed: false },
      { title: 'Safe Return & Deposit Release', time: 'Oct 02, 6:00 PM', completed: false }
    ]
  }
];

export const CATEGORIES = [
  { id: 'Fashion', name: 'Fashion', iconName: 'Shirt', count: '10 items', description: 'Blazers, dresses, sarees, lehengas & suits' },
  { id: 'Accessories', name: 'Accessories', iconName: 'Gem', count: '10 items', description: 'Jewellery, designer bags, watches & scarves' },
  { id: 'Electronics', name: 'Electronics', iconName: 'Camera', count: '10 items', description: 'Cameras, drones, projectors, gimbals & audio' },
  { id: 'Books', name: 'Books', iconName: 'BookOpen', count: '10 items', description: 'Engineering, architecture, art & literature' },
  { id: 'Sports', name: 'Sports', iconName: 'Trophy', count: '10 items', description: 'Badminton, tennis, golf, cycling & paddleboards' },
  { id: 'Tools', name: 'Tools', iconName: 'Wrench', count: '10 items', description: 'Hammer drills, pressure washers & power saws' },
  { id: 'Travel', name: 'Travel', iconName: 'Compass', count: '10 items', description: 'Camping tents, hardside luggage & satellite GPS' },
  { id: 'Events', name: 'Events', iconName: 'Sparkles', count: '10 items', description: 'Instant cameras, Marshall speakers & party lights' },
] as const;
