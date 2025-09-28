// Client-specific project data
export interface ProjectData {
  clientId: string;
  title: string;
  subtitle: string;
  requirements: string[];
  competitors: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  designs: Array<{
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    link?: string;
    isPremium?: boolean;
  }>;
  selectedDesigns: string[];
  proposalDetails: {
    projectType: string;
    timeline: string;
    budget: string;
    features: string[];
    discount?: number;
    deliverables: Array<{
      name: string;
      isPremium?: boolean;
    }>;
    specialRequests: string[];
  };
}

export const clientProjects: Record<string, ProjectData> = {
  'client-a': {
    clientId: 'client-a',
    title: 'Complete Pet Services & E-Commerce Platform',
    subtitle: 'A next-generation, responsive online store with dynamic features, seamless payments, and interactive user experience',

    requirements: [
      'Mobile-first responsive design – looks perfect on all devices',
      'Advanced product filtering and search – by category, breed, size, and price',
      'Integrated payment gateways – Stripe, PayPal, Shopify, UPI India',
      'Customer account management – profiles, orders, and preferences',
      'Inventory management system – real-time stock tracking',
      'SEO optimization – built-in tools for better search visibility',
      'Analytics dashboard – track sales, traffic, and user behavior',
      'Dynamic product pages – animated, interactive, and visually engaging',
      'Product reviews and ratings – build trust and engagement',
      'Offers & coupons management – create promotions easily',
      'Multi-currency support – sell globally with ease',
      'Secure login and signup – with social login options',
      'Grooming & appointment booking system – schedule sessions efficiently',
      'Community forum & blog – engage and educate users',
      'Wishlist & cart recovery – boost conversions effectively',
      'Favicon, logo, and branding assets – ready for web and print',
      'Tag manager & analytics-ready setup – track campaigns efficiently',
      'Order tracking and shipping integration – automated notifications',
      'Email service setup – transactional, newsletter, and marketing ready',
      'Animation & motion effects – modern and interactive UI/UX',
      'Dynamic admin dashboard – manage users, orders, and site content securely',
      'Newsletter subscription & promotional email campaigns – keep users engaged'
    ],
    competitors: [
      {
        name: 'Huft',
        url: 'https://headsupfortails.com/',
        description: 'Discover a wide range of pet products at HUFT. Shop online or visit our 100+ retail stores across India for pet food, toys, grooming, accessories, and more.'
      },
      {
        name: 'Zigly',
        url: 'https://zigly.com/',
        description: 'Discover premium pet food, toys, grooming, and accessories at Zigly, your trusted online pet store. Easily book online vet consultations and grooming services at our experience centers nationwide.'
      },
    ],
    designs: [
      {
        id: 'design-premium',
        title: 'Zupet',
        imageUrl: 'https://cdn.shopify.com/theme-store/pukkvw21u51ftlusm37pgavtnl2t.jpg?w=300&h=200&fit=crop',
        description: 'NO Password',
        link: 'https://pets-toyo.myshopify.com/',
        isPremium: true
      },
      {
        id: 'design-premium2',
        title: 'Toyo',
        imageUrl: 'https://cdn.shopify.com/theme-store/ufqxm942hcc9taio6x2dbpvqgijp.jpg?w=300&h=200&fit=crop',
        description: 'NO Password',
        link: 'https://64la8o1y5ynxhluu-80850387230.shopifypreview.com/',
        isPremium: true
      },
      {
        id: 'design-1',
        title: 'Pet Pals',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/490635641/Petpals%20Shopify%20Preview%20Image.__large_preview.png?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=36e8bf9ab26734e7c8095cc463c694b39bd54f4a8274e51e9c5d2ca93a12bee7',
        description: 'Password : 1 ',
        link: 'https://dt-petpals.myshopify.com/'
      },
      {
        id: 'design-2',
        title: 'Petoria',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/314399095/ThemePreview.__large_preview.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=02b4470f644b54245341425e529284c3307e66cf7d0675f16085eff268d41516',
        description: 'Password : 1',
        link: 'https://petoria-store-demo.myshopify.com/'
      },
      {
        id: 'design-3',
        title: 'Ziggypet',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/401604779/preview/01_preview.__large_preview.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=b0536e6ff687bee4bdfc026968de0e5aa5c1fc05484f024fb04bed32de4006d2',
        description: 'Password : 1',
        link: 'https://ap-ziggypet.myshopify.com/'
      },
      {
        id: 'design-4',
        title: 'Petty Shop',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/441759312/01_petty-preview.__large_preview.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=4fd415a9f541c31cc04e55861eceaf8e488c7b6f8f79fc4a94d27ede943e3d07',
        description: 'Password : 1',
        link: 'https://dt-petty.myshopify.com/'
      },
      {
        id: 'design-5',
        title: 'Crazy Pets',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/437036956/crazypets_preview.__large_preview.jpg?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=8eb6ef1bdae204b6b1c057c0b5016c74123690d54bf4edcd14e01ec0e48d9bb2',
        description: 'Password : 1',
        link: 'https://dt-crazy-pets.myshopify.com/'
      },
      {
        id: 'design-6',
        title: 'Pettile',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/631053539/Pettile-pet-shopify-preview/01-pettile-pet-shopify-theme.__large_preview.png?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=8f3384863976ef417f92df60fff71400db480207c00d192064fae985045d9cb4',
        description: 'Password : 1',
        link: 'https://pettile-preyantechnosys.myshopify.com/'
      },
      {
        id: 'design-7',
        title: 'Pets Zone',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/509793649/Preview%20-%20PetZone.__large_preview.png?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=2d5c765da552bf88f8579630c43c3754b9a7ce1ca405411d223f6d038d76f654',
        description: 'Password : buddha',
        link: 'https://dt-petszone.myshopify.com/'
      },
      {
        id: 'design-8',
        title: 'Crazy Pets',
        imageUrl: 'https://market-resized.envatousercontent.com/themeforest.net/files/418580627/pet_gro_preview.__large_preview.png?auto=format&q=94&cf_fit=crop&gravity=top&h=8000&w=590&s=57fcaa23161d51157c6fd623b794d9c5fc52500027626d3b763c141f3f33597a',
        description: 'Password : buddha',
        link: 'https://dt-petster.myshopify.com/'
      },

    ],
    selectedDesigns: ['design-premium2', 'design-premium'],
    proposalDetails: {
      projectType: 'E-Commerce Website',
      timeline: '2-3 weeks',
      budget: '50,000',
      features: [
        'Custom Responsive Design – Looks flawless on any device',
        'Seamless Payment Integration – Multiple gateways supported (Stripe, PayPal, Shopify, UPI India)',
        'Comprehensive Admin Dashboard – Full control of content, users, and analytics',
        '3 Months Dedicated Support – We’re here whenever you need us',
        'Logo Package – 5+ formats for web, print, and social media',
        'Favicon & Brand Icons – Ready for all platforms',
        'SEO-Optimized Dashboard – Built-in tools to boost visibility',
        'Tag Manager Ready – Track, analyze, and optimize effortlessly',
        'Advanced Search & Filtering – Find what you need instantly',
        'Dynamic Login & Signup – Smooth authentication experience with social login',
        'Grooming Session Booking – Schedule and manage appointments easily',
        'Community Portal – Connect, engage, and collaborate',
        'Exclusive Offers & Sales Management – Create and manage promotions effortlessly',
        '5+ Policy Pages – GDPR, CORS, fraud prevention, and brand protection',
        'Email Service Setup – Transactional, marketing, and newsletter integration',
        'CDN Integration – Fast global content delivery for improved site speed',
        'Customer Database – Secure storage with preference recording',
        'Error & Cache Management – Preload, caching, and error monitoring for smooth performance',
        'Dynamic Product Recommendations – Personalized AI-driven suggestions',
        'Wishlist & Cart Recovery – Increase conversions and engagement',
        'Social Media Sharing – Boost reach with easy sharing options',
        'Gift Cards & Vouchers – Flexible sales and promotions',
        'Subscription & Recurring Orders – For food, treats, or services',
        'Live Chat & Customer Support – Real-time assistance for users',
        'Mobile-Responsive Generator – Auto-adjust content for all devices',
        'Active Admin Account Setup – Ready-to-use management access',
        'Secure Third-Party Payment Channels – Complete transaction safety',
        'Domain, DNS & SSL Management – Protect brand and users',
        'Optimized SEO & Sitemap – Search engine friendly with robots.txt',
        'Newsletter & Promotional Email Updates – Automated campaigns',
        'Review Management System – Customer feedback handling and ratings',
        'Animation & Motion Effects – Modern and engaging interactions',
        'Fast Site Loading – Lightweight and optimized for performance',
        'Multi-Categories & Product Management – Fully structured catalog',
        'Working Outbound Links – Seamless external navigation',
        'Advanced Analytics & Reporting – Track sales, traffic, and user behavior',
        'Active Security & Compliance – GDPR, policies, and fraud prevention',
        'Premium Branding Assets – Logo, favicon, and icons for all platforms',
        'Offers & Coupons Dashboard – Manage promotions effortlessly',
        'Newsletter Subscription & Marketing Integration – Keep users engaged'
      ],
      discount: 10,
      deliverables: [
        { name: 'Fully Responsive Website – mobile-first, ultra-fast, adaptive', isPremium: false },
        { name: 'E-commerce Store – modern, scalable, and conversion-optimized', isPremium: true },
        { name: 'Payment Gateway Integration – Stripe, PayPal, Shopify, UPI India', isPremium: true },
        { name: 'Admin Panel – intuitive dashboard with full control', isPremium: true },
        { name: '25+ Dynamic Website Pages – feature-rich and visually engaging', isPremium: false },
        { name: '5 Dedicated Admin Backend Pages – manage products, users, and analytics', isPremium: true },
        { name: 'Custom Logo Design – premium multi-format assets for web & print', isPremium: true },
        { name: 'Favicon & Brand Icons – all platforms ready', isPremium: true },
        { name: '24/7 Support Setup – priority response and troubleshooting', isPremium: false },
        { name: 'Multiple Categories & Subcategories – fully structured catalog', isPremium: false },
        { name: 'Working Outbound Links – seamless external navigation', isPremium: false },
        { name: 'Offers & Coupons Dashboard – manage promotions effortlessly', isPremium: false },
        { name: 'Animation & Motion Effects – modern, engaging interactions', isPremium: false },
        { name: 'Optimized Site Loading – fast, lightweight, and performant', isPremium: false },
        { name: 'Advanced SEO – better rankings, sitemap & robots.txt ready', isPremium: false },
        { name: 'SEO Dashboard – track, analyze, and optimize visibility', isPremium: true },
        { name: 'Tag Manager Dashboard – campaign tracking & analytics ready', isPremium: true },
        { name: 'Email Services Setup – professional transactional & marketing emails', isPremium: true },
        { name: 'CDN Integration – global content delivery for faster load', isPremium: false },
        { name: 'Customer Database – secure and structured storage', isPremium: false },
        { name: 'Error Management & Monitoring – proactive issue handling', isPremium: false },
        { name: 'Preload & Cache Management – optimized user experience', isPremium: false },
        { name: 'Login & Signup Manager – dynamic, secure, and scalable', isPremium: false },
        { name: 'Newsletter & Promotional Email Updates – integrated automation', isPremium: false },
        { name: 'Grooming Session Booking System – seamless scheduling', isPremium: false },
        { name: 'Strict Policies & Fraud Prevention – GDPR, CORS, and security compliance', isPremium: false },
        { name: 'Domain & DNS Management – SSL certification and protection', isPremium: false },
        { name: 'Mobile Responsive Generator – auto-adjust content for any device', isPremium: false },
        { name: 'Active Admin Account Setup – ready-to-use management access', isPremium: false },
        { name: 'Secure Third-Party Payment Channels – complete transaction safety', isPremium: true },
        { name: 'Client Preferences Recorder – track and personalize experience', isPremium: false },
        { name: 'Review Management System – customer feedback handling', isPremium: false },
        { name: 'Extra Premium Branding Assets – logo, favicon, and icon packs', isPremium: true },
        { name: 'Dynamic Product Recommendations – AI-driven personalization', isPremium: false },
        { name: 'Wishlist & Cart Recovery System – increase conversions', isPremium: false },
        { name: 'Social Media Sharing Integration – boost engagement', isPremium: false },
        { name: 'Gift Cards & Vouchers Setup – flexible sales options', isPremium: false },
        { name: 'Advanced Analytics & Reporting – sales, traffic, customer insights', isPremium: false },
        { name: 'Live Chat & Customer Support System – instant assistance', isPremium: false },
        { name: 'Subscription Options – recurring delivery for food & treats', isPremium: false },
        { name: 'Secure Data Backups – automated and encrypted', isPremium: false },
        { name: 'Accessibility Features – ADA compliant interface', isPremium: false },
        { name: 'Sitemap & Robots.txt Auto-Generation – search engine friendly', isPremium: false }
      ],
      specialRequests: [
        'Custom domain registration for pet store',
        'Business email setup',
        'Trademark registration assistance',
        'Business name incorporation support'
      ]
    }
  },
  'client-b': {
    clientId: 'client-b',
    title: 'SaaS Dashboard & Analytics Platform',
    subtitle: 'Real-time data visualization and business intelligence',
    requirements: [
      'Real-time data visualization',
      'Interactive charts and graphs',
      'User role management',
      'API integrations',
      'Export functionality (PDF, CSV)',
      'White-label customization',
      'Multi-tenant architecture'
    ],
    competitors: [
      {
        name: 'Tableau',
        url: 'https://www.tableau.com',
        description: 'Leading data visualization platform'
      },
      {
        name: 'Power BI',
        url: 'https://powerbi.microsoft.com',
        description: 'Microsoft business analytics solution'
      },
      {
        name: 'Looker',
        url: 'https://looker.com',
        description: 'Modern BI and data platform'
      }
    ],
    designs: [
      {
        id: 'design-5',
        title: 'Data-Focused Layout',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
        description: 'Dashboard optimized for data visualization'
      },
      {
        id: 'design-6',
        title: 'Executive Summary',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
        description: 'High-level overview with key metrics'
      },
      {
        id: 'design-7',
        title: 'Interactive Workspace',
        imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=200&fit=crop',
        description: 'Collaborative analytics workspace'
      }
    ],
    selectedDesigns: ['design-5', 'design-6'],
    proposalDetails: {
      projectType: 'SaaS Platform',
      timeline: '12-14 weeks',
      budget: '$28,000',
      features: [
        'Custom dashboard design',
        'Real-time analytics',
        'User management',
        '12 months support'
      ],
      deliverables: [
        { name: 'Custom Dashboard', isPremium: true },
        { name: 'Analytics Platform', isPremium: false },
        { name: 'User Management System', isPremium: true },
        { name: 'API Integrations', isPremium: false }
      ],
      specialRequests: [
        'White-label customization with custom branding',
        'Advanced API integrations for third-party tools',
        'Priority support setup'
      ]
    }
  },
  'client-c': {
    clientId: 'client-c',
    title: 'Mobile App & Web Portal',
    subtitle: 'Cross-platform mobile application with web dashboard',
    requirements: [
      'Native iOS and Android apps',
      'Web admin portal',
      'Push notifications',
      'Offline functionality',
      'Real-time synchronization',
      'Social media integration',
      'In-app purchases'
    ],
    competitors: [
      {
        name: 'React Native',
        url: 'https://reactnative.dev',
        description: 'Cross-platform mobile development'
      },
      {
        name: 'Flutter',
        url: 'https://flutter.dev',
        description: 'Google\'s UI toolkit for mobile'
      },
      {
        name: 'Ionic',
        url: 'https://ionicframework.com',
        description: 'Hybrid mobile app development'
      }
    ],
    designs: [
      {
        id: 'design-8',
        title: 'Mobile-First Design',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
        description: 'Optimized for mobile user experience'
      },
      {
        id: 'design-9',
        title: 'Material Design',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
        description: 'Google Material Design principles'
      },
      {
        id: 'design-10',
        title: 'Custom Illustrations',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
        description: 'Unique custom illustrations and animations'
      }
    ],
    selectedDesigns: ['design-8', 'design-10'],
    proposalDetails: {
      projectType: 'Mobile App + Web Portal',
      timeline: '16-20 weeks',
      budget: '$35,000',
      features: [
        'Native mobile apps',
        'Web admin portal',
        'Push notifications',
        '18 months support'
      ],
      discount: 15,
      deliverables: [
        { name: 'iOS Mobile App', isPremium: true },
        { name: 'Android Mobile App', isPremium: true },
        { name: 'Web Admin Portal', isPremium: false },
        { name: 'Push Notification System', isPremium: false }
      ],
      specialRequests: [
        'App Store optimization',
        'Custom app icons and splash screens',
        'Offline data synchronization',
        'Advanced analytics integration'
      ]
    }
  }
};

export const getClientProject = (clientId: string): ProjectData | null => {
  return clientProjects[clientId] || null;
};