import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Wrench, BatteryCharging, Search, Truck, Star, HardHat, Cog, Package } from 'lucide-react';

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Store', href: '/store' },
  { name: 'DIY Kits', href: '/diy-kits' },
  { name: 'Subscriptions', href: '/subscriptions' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

export const valuePropositions = [
    {
        icon: "GuaranteeIcon",
        title: "Extended Guarantee",
        description: "Transparent service with an extended warranty you can trust."
    },
    {
        icon: "DeliveryIcon",
        title: "Home Pickup & Delivery",
        description: "We pick up your scooter and deliver it back, fully repaired."
    },
    {
        icon: "SubscriptionIcon",
        title: "Subscription Plans",
        description: "Affordable monthly plans to keep your scooter in top shape."
    },
    {
        icon: "DiyKitIcon",
        title: "DIY Online Store",
        description: "Kits and parts for those who love to get their hands dirty."
    },
    {
        icon: "SupportIcon",
        title: "Post-Sale Support",
        description: "Get help anytime via WhatsApp or Telegram."
    },
    {
        icon: "RecycleIcon",
        title: "Battery Recycling",
        description: "We recycle and refurbish batteries, promoting sustainability."
    }
];

export const services = [
  {
    icon: Wrench,
    title: 'Preventive Maintenance',
    description: 'Full check-up to keep your scooter running smoothly and prevent future issues.',
    image: PlaceHolderImages.find(img => img.id === 'service-maintenance'),
  },
  {
    icon: Cog,
    title: 'General Repairs',
    description: 'From flat tires to engine trouble, our experts can fix it all.',
    image: PlaceHolderImages.find(img => img.id === 'service-repair'),
  },
  {
    icon: Search,
    title: 'Advanced Diagnostics',
    description: 'Using the latest tech to accurately diagnose and solve any electronic issue.',
    image: PlaceHolderImages.find(img => img.id === 'service-diagnostics'),
  },
  {
    icon: BatteryCharging,
    title: 'Battery Refurbishment',
    description: 'Extend your battery’s life with our professional refurbishment and recycling service.',
    image: PlaceHolderImages.find(img => img.id === 'product-battery'),
  },
  {
    icon: Truck,
    title: 'Home Delivery Service',
    description: 'Convenient pickup and delivery service for all repairs and maintenance.',
    image: PlaceHolderImages.find(img => img.id === 'hero-scooter'),
  },
];

export const products = [
  {
    id: 'prod_1',
    name: 'High-Capacity Battery',
    price: 299.99,
    category: 'Batteries',
    image: PlaceHolderImages.find(img => img.id === 'product-battery') as ImagePlaceholder,
  },
  {
    id: 'prod_2',
    name: 'All-Terrain Tire',
    price: 49.99,
    category: 'Parts',
    image: PlaceHolderImages.find(img => img.id === 'product-tire') as ImagePlaceholder,
  },
  {
    id: 'prod_3',
    name: 'Hydraulic Brake System',
    price: 89.99,
    category: 'Parts',
    image: PlaceHolderImages.find(img => img.id === 'product-brake') as ImagePlaceholder,
  },
  {
    id: 'prod_4',
    name: 'Urban Rider Helmet',
    price: 79.99,
    category: 'Accessories',
    image: PlaceHolderImages.find(img => img.id === 'product-helmet') as ImagePlaceholder,
  },
  {
    id: 'prod_5',
    name: 'DIY Maintenance Kit',
    price: 59.99,
    category: 'DIY Kits',
    image: PlaceHolderImages.find(img => img.id === 'service-repair') as ImagePlaceholder,
  },
    {
    id: 'prod_6',
    name: 'LED Light Strip',
    price: 25.99,
    category: 'Accessories',
    image: {
        id: "led-light",
        description: "Colorful LED light strip for scooters",
        imageUrl: "https://picsum.photos/seed/15/400/400",
        imageHint: "LED strip"
    },
  },
  {
    id: 'prod_7',
    name: 'Advanced Motor',
    price: 199.99,
    category: 'Parts',
    image: {
        id: "scooter-motor",
        description: "A powerful electric scooter motor",
        imageUrl: "https://picsum.photos/seed/16/400/400",
        imageHint: "scooter motor"
    },
  },
  {
    id: 'prod_8',
    name: 'Suspension Upgrade Kit',
    price: 129.99,
    category: 'DIY Kits',
    image: {
        id: "scooter-suspension",
        description: "Suspension kit for a smoother ride",
        imageUrl: "https://picsum.photos/seed/17/400/400",
        imageHint: "scooter suspension"
    },
  }
];

export const subscriptionPlans = [
  {
    name: 'Basic',
    price: 9.99,
    features: ['Monthly check-up', '10% off parts', 'Basic support'],
    cta: 'Choose Basic',
  },
  {
    name: 'Pro',
    price: 19.99,
    features: [
      'Bi-weekly cleaning',
      '20% off parts',
      'Priority support',
      '1 free repair/year',
    ],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 29.99,
    features: [
      'Weekly maintenance',
      '30% off parts',
      '24/7 support',
      'Unlimited repairs',
      'Home service included',
    ],
    cta: 'Choose Enterprise',
  },
];

export const testimonials = [
  {
    name: 'Alex Johnson',
    review: 'Scootix brought my scooter back to life! The home pickup service is a game-changer. Absolutely seamless experience.',
    rating: 5,
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
  },
  {
    name: 'Maria Garcia',
    review: 'I bought a DIY kit and the tutorial was super easy to follow. My scooter is running better than ever. Highly recommend!',
    rating: 5,
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
  },
];

export const blogPosts = [
  {
    title: '5 Tips for Extending Your Scooter\'s Battery Life',
    date: 'May 10, 2024',
    excerpt: 'Learn how to properly care for your battery to get the most out of every charge and extend its overall lifespan.',
    image: PlaceHolderImages.find(img => img.id === 'blog-post-1'),
    slug: 'battery-life-tips',
  },
  {
    title: 'The Future of Urban Mobility: 2024 Scooter Trends',
    date: 'April 28, 2024',
    excerpt: 'We dive into the latest innovations in the e-scooter industry, from smart features to sustainable designs.',
    image: PlaceHolderImages.find(img => img.id === 'blog-post-2'),
    slug: '2024-scooter-trends',
  },
  {
    title: 'DIY Tutorial: How to Change Your Scooter Tire',
    date: 'April 15, 2024',
    excerpt: 'A step-by-step guide to changing a flat tire on your electric scooter with our DIY kit. No experience needed!',
    image: PlaceHolderImages.find(img => img.id === 'blog-post-3'),
    slug: 'diy-tire-change',
  },
];

export const faqItems = [
    {
        question: "What types of scooters do you service?",
        answer: "We service most major brands of electric scooters. Contact us with your model information, and we can confirm if we support it."
    },
    {
        question: "How long does a typical repair take?",
        answer: "Minor repairs can often be done same-day. More complex issues might take 2-3 business days. We provide a time estimate after our initial diagnosis."
    },
    {
        question: "What is your warranty policy?",
        answer: "We offer a 90-day warranty on all our repairs and a 1-year warranty on most parts sold in our store. Please see our full warranty page for details."
    },
    {
        question: "How does the home pickup and delivery service work?",
        answer: "When you book a service, you can select the pickup option. We will coordinate a time to collect your scooter from your location and will return it to you once the service is complete. This service is available in select areas."
    }
];

export const mockOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    date: "2024-05-20",
    status: "Delivered",
    total: 139.98,
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    date: "2024-05-21",
    status: "Processing",
    total: 299.99,
  },
  {
    id: "ORD003",
    customer: "Alex Johnson",
    date: "2024-05-21",
    status: "Shipped",
    total: 79.99,
  },
  {
    id: "ORD004",
    customer: "Maria Garcia",
    date: "2024-05-22",
    status: "Pending",
    total: 59.99,
  },
  {
    id: "ORD005",
    customer: "Sam Wilson",
    date: "2024-05-23",
    status: "Cancelled",
    total: 49.99,
  },
];
