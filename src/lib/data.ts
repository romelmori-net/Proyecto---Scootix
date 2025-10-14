import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Wrench, BatteryCharging, Search, Truck, Star, HardHat, Cog, Package } from 'lucide-react';

export const navLinks = [
  { name: 'home', href: '/', description: 'homeNavDescription' },
  { name: 'services', href: '/services', description: 'servicesDescription' },
  { name: 'store', href: '/store', description: 'storeNavDescription' },
  { name: 'diyKits', href: '/diy-kits', description: 'diyKitsDescription' },
  { name: 'subscriptions', href: '/subscriptions', description: 'subscriptionsDescription' },
  { name: 'about', href: '/about', description: 'aboutNavDescription' },
  { name: 'contact', href: '/contact', description: 'contactNavDescription' },
  { name: 'blog', href: '/blog', description: 'blogNavDescription' },
];

export const valuePropositions = [
    {
        icon: "GuaranteeIcon",
        title: "extendedGuarantee",
        description: "extendedGuaranteeDescription"
    },
    {
        icon: "DeliveryIcon",
        title: "homePickupDelivery",
        description: "homePickupDeliveryDescription"
    },
    {
        icon: "SubscriptionIcon",
        title: "subscriptionPlans",
        description: "subscriptionPlansDescription"
    },
    {
        icon: "DiyKitIcon",
        title: "diyOnlineStore",
        description: "diyOnlineStoreDescription"
    },
    {
        icon: "SupportIcon",
        title: "postSaleSupport",
        description: "postSaleSupportDescription"
    },
    {
        icon: "RecycleIcon",
        title: "batteryRecycling",
        description: "batteryRecyclingDescription"
    }
];

export const services = [
  {
    icon: Wrench,
    title: 'preventiveMaintenance',
    description: 'preventiveMaintenanceDescription',
    image: PlaceHolderImages.find(img => img.id === 'service-maintenance'),
  },
  {
    icon: Cog,
    title: 'generalRepairs',
    description: 'generalRepairsDescription',
    image: PlaceHolderImages.find(img => img.id === 'service-repair'),
  },
  {
    icon: Search,
    title: 'advancedDiagnostics',
    description: 'advancedDiagnosticsDescription',
    image: PlaceHolderImages.find(img => img.id === 'service-diagnostics'),
  },
  {
    icon: BatteryCharging,
    title: 'batteryRefurbishment',
    description: 'batteryRefurbishmentDescription',
    image: PlaceHolderImages.find(img => img.id === 'product-battery'),
  },
  {
    icon: Truck,
    title: 'homeDeliveryService',
    description: 'homeDeliveryServiceDescription',
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
    name: 'basic',
    price: 9.99,
    features: ['monthlyCheckUp', 'basicSupport'],
    cta: 'chooseBasic',
  },
  {
    name: 'pro',
    price: 19.99,
    features: [
      'biWeeklyCleaning',
      'prioritySupport',
      'oneFreeRepair',
    ],
    cta: 'choosePro',
    popular: true,
  },
  {
    name: 'enterprise',
    price: 29.99,
    features: [
      'weeklyMaintenance',
      'twentyFourSevenSupport',
      'unlimitedRepairs',
      'homeServiceIncluded',
    ],
    cta: 'chooseEnterprise',
  },
];

export const testimonials = [
  {
    name: 'Alex Johnson',
    review: 'scootixBroughtMyScooter',
    rating: 5,
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1'),
  },
  {
    name: 'Maria Garcia',
    review: 'iBoughtADiyKit',
    rating: 5,
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2'),
  },
];

export const blogPosts = [
  {
    title: 'tipsForExtendingBattery',
    date: 'May 10, 2024',
    excerpt: 'learnHowToProperlyCare',
    image: PlaceHolderImages.find(img => img.id === 'blog-post-1'),
    slug: 'battery-life-tips',
  },
  {
    title: 'theFutureOfUrbanMobility',
    date: 'April 28, 2024',
    excerpt: 'weDiveIntoTheLatest',
    image: PlaceHolderImages.find(img => img.id === 'blog-post-2'),
    slug: '2024-scooter-trends',
  },
  {
    title: 'diyTutorialHowToChange',
    date: 'April 15, 2024',
    excerpt: 'aStepByStepGuide',
    image: PlaceHolderImages.find(img => img.id === 'blog-post-3'),
    slug: 'diy-tire-change',
  },
];

export const faqItems = [
    {
        question: "whatTypesOfScooters",
        answer: "weServiceMostMajorBrands"
    },
    {
        question: "howLongDoesARepairTake",
        answer: "minorRepairsCanOften"
    },
    {
        question: "whatIsYourWarranty",
        answer: "weOfferA90Day"
    },
    {
        question: "howDoesTheHomePickup",
        answer: "whenYouBookAService"
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

    
