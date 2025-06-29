// Mock data for the e-commerce application
import { Product } from './products';

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  phone?: string;
  dateOfBirth?: Date;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  addresses: Address[];
  orders: Order[];
  reviews: Review[];
  wishlist: WishlistItem[];
  newsletterSubscriptions: NewsletterSubscription[];
  socialAccounts: SocialAccount[];
  loginHistory: LoginHistory[];
}

export interface Address {
  id: string;
  userId: string;
  type: 'SHIPPING' | 'BILLING';
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  parent?: Category;
  children: Category[];
  products: Product[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string;
  sortOrder: number;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
  weight?: number;
  weightUnit?: string;
  options: VariantOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantOption {
  id: string;
  variantId: string;
  optionName: string;
  optionValue: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  tracking?: TrackingInfo;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  total: number;
  product: Product;
  variant?: ProductVariant;
}

export interface TrackingInfo {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  trackingUrl?: string;
  status: string;
  estimatedDelivery?: Date;
  events: TrackingEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackingEvent {
  id: string;
  trackingId: string;
  status: string;
  description: string;
  location?: string;
  timestamp: Date;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  content?: string;
  verified: boolean;
  helpful: number;
  images: ReviewImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewImage {
  id: string;
  reviewId: string;
  url: string;
  alt?: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'DIGITAL_WALLET';
  provider: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialAccount {
  id: string;
  userId: string;
  provider: 'google' | 'apple' | 'facebook' | 'twitter';
  providerId: string;
  email?: string;
  name?: string;
  image?: string;
  isLinked: boolean;
  linkedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginHistory {
  id: string;
  userId: string;
  loginMethod: 'email' | 'google' | 'apple' | 'facebook' | 'twitter';
  ipAddress: string;
  userAgent: string;
  device: string;
  location?: string;
  success: boolean;
  failureReason?: string;
  sessionId?: string;
  createdAt: Date;
}

// Mock Data
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic devices and gadgets',
    image: '/images/categories/electronics.jpg',
    parentId: undefined,
    parent: undefined,
    children: [],
    products: [],
    isActive: true,
    sortOrder: 1,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for all occasions',
    image: '/images/categories/clothing.jpg',
    parentId: undefined,
    parent: undefined,
    children: [],
    products: [],
    isActive: true,
    sortOrder: 2,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: '/images/categories/home-garden.jpg',
    parentId: undefined,
    parent: undefined,
    children: [],
    products: [],
    isActive: true,
    sortOrder: 3,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'TechPro',
    slug: 'techpro',
    description: 'Premium technology solutions',
    logo: '/images/brands/techpro.png',
    website: 'https://techpro.com',
    isActive: true,
    products: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'StyleMax',
    slug: 'stylemax',
    description: 'Contemporary fashion brand',
    logo: '/images/brands/stylemax.png',
    website: 'https://stylemax.com',
    isActive: true,
    products: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    image: '/images/avatars/john-doe.jpg',
    phone: '+1 (555) 123-4567',
    emailVerified: new Date('2024-01-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    addresses: [],
    orders: [],
    reviews: [],
    wishlist: [],
    newsletterSubscriptions: [],
    socialAccounts: [],
    loginHistory: [],
  },
];

export const mockAddresses: Address[] = [
  {
    id: '1',
    userId: '1',
    type: 'SHIPPING',
    firstName: 'John',
    lastName: 'Doe',
    company: undefined,
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    isDefault: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    userId: '1',
    type: 'CREDIT_CARD',
    provider: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2027,
    holderName: 'John Doe',
    isDefault: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const mockSocialAccounts: SocialAccount[] = [
  {
    id: '1',
    userId: '1',
    provider: 'google',
    providerId: 'google_123456789',
    email: 'john.doe@example.com',
    name: 'John Doe',
    image: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
    isLinked: true,
    linkedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    userId: '1',
    provider: 'apple',
    providerId: 'apple_987654321',
    email: 'john.doe@example.com',
    name: 'John Doe',
    image: undefined,
    isLinked: false,
    linkedAt: new Date('2024-02-01'),
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
];

export const mockLoginHistory: LoginHistory[] = [
  {
    id: '1',
    userId: '1',
    loginMethod: 'email',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: 'Desktop - Windows 10',
    location: 'New York, NY, USA',
    success: true,
    failureReason: undefined,
    sessionId: 'sess_abc123def456',
    createdAt: new Date('2025-01-20T09:15:00Z'),
  },
  {
    id: '2',
    userId: '1',
    loginMethod: 'google',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    device: 'Mobile - iPhone 15',
    location: 'New York, NY, USA',
    success: true,
    failureReason: undefined,
    sessionId: 'sess_xyz789uvw012',
    createdAt: new Date('2025-01-19T14:30:00Z'),
  },
  {
    id: '3',
    userId: '1',
    loginMethod: 'email',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: 'Desktop - macOS',
    location: 'San Francisco, CA, USA',
    success: false,
    failureReason: 'Invalid password',
    sessionId: undefined,
    createdAt: new Date('2025-01-18T22:45:00Z'),
  },
  {
    id: '4',
    userId: '1',
    loginMethod: 'email',
    ipAddress: '203.0.113.45',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: 'Desktop - macOS',
    location: 'San Francisco, CA, USA',
    success: true,
    failureReason: undefined,
    sessionId: 'sess_mno345pqr678',
    createdAt: new Date('2025-01-18T22:47:00Z'),
  },
  {
    id: '5',
    userId: '1',
    loginMethod: 'apple',
    ipAddress: '198.51.100.25',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    device: 'Tablet - iPad',
    location: 'Los Angeles, CA, USA',
    success: true,
    failureReason: undefined,
    sessionId: 'sess_stu901vwx234',
    createdAt: new Date('2025-01-17T16:20:00Z'),
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    orderNumber: 'EX-ORD-001',
    status: 'delivered',
    paymentStatus: 'paid',
    subtotal: 299.99,
    taxAmount: 24.00,
    shippingAmount: 9.99,
    discountAmount: 0,
    total: 333.98,
    currency: 'USD',
    shippingAddress: mockAddresses[0],
    billingAddress: mockAddresses[0],
    items: [],
    tracking: undefined,
    notes: undefined,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of E-commerce',
    slug: 'future-of-ecommerce',
    excerpt: 'Exploring the latest trends and innovations in online retail',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: '/images/articles/ecommerce-future.jpg',
    author: 'Jane Smith',
    tags: ['ecommerce', 'technology', 'trends'],
    published: true,
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    title: 'Sustainable Shopping Guide',
    slug: 'sustainable-shopping-guide',
    excerpt: 'How to make more environmentally conscious purchasing decisions',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: '/images/articles/sustainable-shopping.jpg',
    author: 'Mike Green',
    tags: ['sustainability', 'shopping', 'environment'],
    published: true,
    publishedAt: new Date('2024-01-05'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
];

// Helper functions
export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(order => order.id === id);
};

export const getOrderByNumber = (orderNumber: string): Order | undefined => {
  return mockOrders.find(order => order.orderNumber === orderNumber);
};

export const getUserOrders = (userId: string): Order[] => {
  return mockOrders.filter(order => order.userId === userId);
};

export const getArticleById = (id: string): Article | undefined => {
  return mockArticles.find(article => article.id === id);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};

export const getPublishedArticles = (): Article[] => {
  return mockArticles.filter(article => article.published);
};

// Category helper functions
export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(category => category.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return mockCategories.find(category => category.slug === slug);
};

export const getActiveCategories = (): Category[] => {
  return mockCategories.filter(category => category.isActive);
};

// Brand helper functions
export const getBrandById = (id: string): Brand | undefined => {
  return mockBrands.find(brand => brand.id === id);
};

export const getBrandBySlug = (slug: string): Brand | undefined => {
  return mockBrands.find(brand => brand.slug === slug);
};

export const getActiveBrands = (): Brand[] => {
  return mockBrands.filter(brand => brand.isActive);
};

// User helper functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

// Consolidated export for easier imports
export const mockData = {
  users: mockUsers,
  addresses: mockAddresses,
  paymentMethods: mockPaymentMethods,
  socialAccounts: mockSocialAccounts,
  loginHistory: mockLoginHistory,
  orders: mockOrders,
  articles: mockArticles,
  categories: mockCategories,
  brands: mockBrands,
};
