import { Client } from '../config/auth';

export interface DeliverableStatus {
  name: string;
  completed: boolean;
  isPremium?: boolean;

}

export interface AssetFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'svg' | 'pdf' | 'txt' | 'other';
  size: number; // in bytes
  uploadedAt: Date;
}

export interface ProgressItem {
  name: string;
  percentage: number;
  color: string;
}

export interface SpecialRequest {
  id: string;
  request: string;
  status: 'pending' | 'in-progress' | 'completed';
  service?: string;
  amount?: string;
  paymentStatus?: 'paid' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface LiveUpdate {
  id: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'success';
}

export interface Credential {
  siteTitle: string;
  siteUrl: string;
  username: string;
  password: string;
}

export interface Milestone {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  color: string;
}

export interface PaymentBreakdownDeliverable {
  name: string;
  amount: number;
  free?: boolean;
}

export interface PaymentBreakdownItem {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
  showBreakdown: boolean;
  deliverables?: PaymentBreakdownDeliverable[];
}

export interface CompletionServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface Message {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timeLimit?: boolean;
}

export interface ClientProgress {
  clientId: string;
  deliverables: DeliverableStatus[];
  assets: AssetFile[];
  noAssets: boolean;
  progress: {
    frontend: ProgressItem;
    backend: ProgressItem;
    seo: ProgressItem;
  };
  specialRequests: SpecialRequest[];
  liveUpdates: LiveUpdate[];
  credentials: Credential[];
  milestones: Milestone[];
  messages: Message[];
  paymentTracking: {
    totalAmount: number;
    paidAmount: number;
    currency: string;
    breakdown: PaymentBreakdownItem[];
    deliverables?: PaymentBreakdownDeliverable[];
  };
  projectDetails: {
    domain: string;
    domainProvider: string;
    adminDashboardLink: string;
  };
  sitePreview: {
    thumbnailUrl: string;
    liveUrl?: string;
    storeUrl?: string;
    isEnabled: boolean;
  };
  completionServices: CompletionServiceItem[];
  lastUpdated: Date;
}

// Sample data for client-a
export const clientProgressData: Record<string, ClientProgress> = {
  'client-a': {
    clientId: 'client-a',
    deliverables: [
      { name: 'Fully Responsive Website – mobile-first, ultra-fast, adaptive', completed: true },
      { name: 'E-commerce Store – modern, scalable, and conversion-optimized', completed: false, isPremium: true },
      { name: 'Payment Gateway Integration – Stripe, PayPal, Shopify, UPI India', completed: false, isPremium: true },
      { name: 'Admin Panel – intuitive dashboard with full control', completed: true, isPremium: true },
      { name: '25+ Dynamic Website Pages – feature-rich and visually engaging', completed: false },
      { name: '5 Dedicated Admin Backend Pages – manage products, users, and analytics', completed: false, isPremium: true },
      { name: 'Custom Logo Design – premium multi-format assets for web & print', completed: true, isPremium: true },
      { name: 'Favicon & Brand Icons – all platforms ready', completed: false, isPremium: true },
      { name: '24/7 Support Setup – priority response and troubleshooting', completed: false },
      { name: 'Multiple Categories & Subcategories – fully structured catalog', completed: false },
      { name: 'Working Outbound Links – seamless external navigation', completed: true },
      { name: 'Offers & Coupons Dashboard – manage promotions effortlessly', completed: false },
      { name: 'Animation & Motion Effects – modern and engaging interactions', completed: false },
      { name: 'Optimized Site Loading – fast, lightweight, and performant', completed: false },
      { name: 'Advanced SEO – better rankings, sitemap & robots.txt ready', completed: false },
      { name: 'SEO Dashboard – track, analyze, and optimize visibility', completed: true, isPremium: true },
      { name: 'Tag Manager Dashboard – campaign tracking & analytics ready', completed: true, isPremium: true },
      { name: 'Email Services Setup – professional transactional & marketing emails', completed: false, isPremium: true },
      { name: 'CDN Integration – global content delivery for faster load', completed: true },
      { name: 'Customer Database – secure and structured storage', completed: false },
      { name: 'Error Management & Monitoring – proactive issue handling', completed: false },
      { name: 'Preload & Cache Management – optimized user experience', completed: false },
      { name: 'Login & Signup Manager – dynamic, secure, and scalable', completed: false },
      { name: 'Newsletter & Promotional Email Updates – integrated automation', completed: false },
      { name: 'Grooming Session Booking System – seamless scheduling', completed: false },
      { name: 'Strict Policies & Fraud Prevention – GDPR, CORS, and security compliance', completed: false },
      { name: 'Domain & DNS Management – SSL certification and protection', completed: false },
      { name: 'Mobile Responsive Generator – auto-adjust content for any device', completed: false },
      { name: 'Active Admin Account Setup – ready-to-use management access', completed: true },
      { name: 'Secure Third-Party Payment Channels – complete transaction safety', completed: false, isPremium: true },
      { name: 'Client Preferences Recorder – track and personalize experience', completed: false },
      { name: 'Review Management System – customer feedback handling', completed: false },
      { name: 'Extra Premium Branding Assets – logo, favicon, and icon packs', completed: false, isPremium: true },
      { name: 'Dynamic Product Recommendations – AI-driven personalization', completed: false },
      { name: 'Wishlist & Cart Recovery System – increase conversions', completed: false },
      { name: 'Social Media Sharing Integration – boost engagement', completed: false },
      { name: 'Gift Cards & Vouchers Setup – flexible sales options', completed: false },
      { name: 'Advanced Analytics & Reporting – sales, traffic, customer insights', completed: false },
      { name: 'Live Chat & Customer Support System – instant assistance', completed: false },
      { name: 'Subscription Options – recurring delivery for food & treats', completed: false },
      { name: 'Secure Data Backups – automated and encrypted', completed: true },
      { name: 'Accessibility Features – ADA compliant interface', completed: true },
      { name: 'Sitemap & Robots.txt Auto-Generation – search engine friendly', completed: true }
    ],
    assets: [
      // {
      //   id: 'logo-1',
      //   name: 'Company Logo.png',
      //   url: 'https://example.com/logo.png',
      //   type: 'image',
      //   size: 1024000,
      //   uploadedAt: new Date('2024-01-15')
      // },
      // {
      //   id: 'favicon-1',
      //   name: 'Favicon.ico',
      //   url: 'https://example.com/favicon.ico',
      //   type: 'other',
      //   size: 2048,
      //   uploadedAt: new Date('2024-01-15')
      // },
      {
        id: 'Udyam_Registration_Certificate',
        name: 'Udyam Registration Certificate.pdf',
        url: 'https://dashboard.aidacorp.in/assets/stamix/Udyam_Registration_Certificate.pdf',
        type: 'pdf',
        size: 353280,
        uploadedAt: new Date('2025-10-04')
      },
      // {
      //   id: 'mockup-1',
      //   name: 'Homepage Mockup.svg',
      //   url: 'https://example.com/mockup.svg',
      //   type: 'svg',
      //   size: 102400,
      //   uploadedAt: new Date('2024-01-17')
      // },
      // {
      //   id: 'readme-1',
      //   name: 'Project Readme.txt',
      //   url: 'https://example.com/readme.txt',
      //   type: 'txt',
      //   size: 4096,
      //   uploadedAt: new Date('2024-01-18') 
      // }
    ],
    noAssets: false,
    progress: {
      frontend: { name: 'Frontend Development', percentage: 20, color: '#95aac9' },
      backend: { name: 'Backend Development', percentage: 30, color: '#d32777' },
      seo: { name: 'SEO Optimization', percentage: 10, color: '#e37335' }
    },
    specialRequests: [
      {
        id: 'req-1',
        request: 'Custom domain registration',
        status: 'completed',
        service: 'Domain Registration',
        amount: '2,000',
        paymentStatus: 'paid',
        createdAt: new Date('2025-10-04'),
        updatedAt: new Date('2025-10-04')
      },
      {
        id: 'req-2',
        request: 'Business email setup',
        status: 'completed',
        service: 'Email Setup',
        amount: '2000',
        paymentStatus: 'paid',
        createdAt: new Date('2025-10-04'),
        updatedAt: new Date('2025-10-04')
      },
      {
        id: 'req-3',
        request: 'Trademark registration assistance',
        status: 'in-progress',
        service: 'Legal Services',
        amount: '5,000',
        paymentStatus: 'paid',
        createdAt: new Date('2025-10-04'),
        updatedAt: new Date('2025-10-04')
      }
    ],
    liveUpdates: [        
      
      {
        id: 'update-1',
        message: 'Backend work started',
        timestamp: new Date('2025-10-19T24:00:00'),
        type: 'success'
      },
      {
        id: 'update-2',
        message: 'Theme file has been purchased and deployed',
        timestamp: new Date('2025-10-19T24:00:00'),
        type: 'success'
      },
            {
        id: 'update-9',
        message: 'The coming soon page has been deployed you can check it at site preview.',
        timestamp: new Date('2025-10-12T24:00:00'),
        type: 'success'
      },
      {
        id: 'update-10',
        message: 'Logos have been confirmed.',
        timestamp: new Date('2025-10-12T19:00:00'),
        type: 'success'
      },
      {
        id: 'update-7',
        message: 'Created instagram & facebook business page',
        timestamp: new Date('2025-10-06T18:00:00'),
        type: 'success'
      },
      {
        id: 'update-8',
        message: 'Gmail and shopify dashbaords have been set up',
        timestamp: new Date('2025-10-04T15:30:00'),
        type: 'success'
      },
      {
        id: 'update-3',
        message: 'Trademark registration is in progress',
        timestamp: new Date('2025-10-04T15:15:00'),
        type: 'info'
      },
      {
        id: 'update-4',
        message: 'Logo and UI desinging is in the process',
        timestamp: new Date('2025-10-04T15:45:00'),
        type: 'warning'
      },
      {
        id: 'update-5',
        message: 'Domain registration has been done',
        timestamp: new Date('2025-10-04T15:00:00'),
        type: 'success'
      },
      {
        id: 'update-6',
        message: 'MSME registartion & Certificate',
        timestamp: new Date('2025-10-04T21:00:00'),
        type: 'success'
      },//warnig , info is also a type
    ],
    credentials: [
      {
        siteTitle: 'Google',
        siteUrl: 'https://mail.google.com/',
        username: 'luxepawlour@gmail.com ',
        password: 'luxepawlour2025@'
      },
      {
        siteTitle: 'Instagram',
        siteUrl: 'https://www.instagram.com/accounts/login/',
        username: 'luxepawlour',
        password: 'luxepawlour2025@'
      },
      {
        siteTitle: 'Facebook',
        siteUrl: 'https://www.facebook.com/login/',
        username: 'luxepawlour',
        password: 'luxepawlour2025@'
      },
      {
        siteTitle: 'Hostinger',
        siteUrl: 'https://hpanel.hostinger.com/domain/luxepawlour.com',
        username: 'luxepawlour@gmail.com ',
        password: 'luxepawlour2025@'
      },
      {
        siteTitle: 'Shopify Dashboard',
        siteUrl: 'https://admin.shopify.com/',
        username: 'luxepawlour@gmail.com ',
        password: 'luxepawlour2025@'
      }
    ],
    milestones: [
      {
        id: 'milestone-1',
        name: 'Project Planning & Design',
        startDate: new Date('2025-10-04'),
        endDate: new Date('2025-10-06'),
        completed: true,
        color: '#4CAF50'
      },
      {
        id: 'milestone-2',
        name: 'Frontend Development',
        startDate: new Date('2025-10-06'),
        endDate: new Date('2025-10-26'),
        completed: false,
        color: '#2196F3'
      },
      {
        id: 'milestone-3',
        name: 'Backend Integration',
        startDate: new Date('2025-10-12'),
        endDate: new Date('2025-10-27'),
        completed: false,
        color: '#FF9800'
      },
      {
        id: 'milestone-4',
        name: 'E-commerce Features',
        startDate: new Date('2025-10-15'),
        endDate: new Date('2025-10-29'),
        completed: false,
        color: '#9C27B0'
      },
      {
        id: 'milestone-5',
        name: 'Testing & Launch',
        startDate: new Date('2025-10-17'),
        endDate: new Date('2025-11-01'),
        completed: false,
        color: '#F44336'
      }
    ],
    messages: [
      { message: 'YAY 🎊! Your Coming Soon page is live. Visit site preview.', type: 'success', timeLimit: true },
      { message: 'Special request completed successfully', type: 'success', timeLimit: true },
      { message: 'The dates of completion have been changed to 1st of the November', type: 'info', timeLimit: true },
      // { message: 'Please review the latest design mockups', type: 'info' , timeLimit: true },
      // { message: 'Payment deadline approaching', type: 'warning', timeLimit: true },
      // { message: 'Payment pending for website development ( 30% remaining ) refer payemnt breakdown. Please complete to proceed further.', type: 'error', timeLimit: false }
    ],
    paymentTracking: {
      totalAmount: 50000,
      paidAmount: 25000,
      currency: 'INR',
      breakdown: [
        {
          id: 'payment-1',
          date: new Date('2025-10-04'),
          amount: 10000,
          description: '1. Special Services Payment',
          status: 'paid',
          showBreakdown: true,
          deliverables: [
            { name: 'Domain registration and setup', amount: 2000, free: false },
            { name: 'Business email setup', amount: 2000, free: false },
            { name: 'SSL certificate ', amount: 2000, free: true },
            { name: 'Basic website hosting setup', amount: 1000, free: false },
            { name: 'Trademark registration assistance', amount: 5000, free: false }
          ]
        },
        {
          id: 'payment-2',
          date: new Date('2025-10-17'),
          amount: 15000,
          description: '2. Initial Project Payment',
          status: 'paid',
          showBreakdown: true,
          deliverables: [
            { name: 'Website design and wireframes', amount: 5000, free: false },
            { name: 'Frontend development (HTML/CSS/JS)', amount: 10000, free: false },
            { name: 'Premium responsive layout', amount: 2000, free: true },
            { name: 'Content management system setup', amount: 3000, free: true },
            { name: 'MSME Certificate', amount: 3000, free: true },
            { name: 'Initial branding elements', amount: 3000, free: true }
          ]
        },
        {
          id: 'payment-3',
          date: new Date('2025-10-19'),
          amount: 25000,
          description: '3. Final Payment',
          status: 'pending',
          showBreakdown: false,
          deliverables: [
            { name: 'Marketing & Advertisement campaigns', amount: 5000, free: false },
            { name: 'Payment gateway integration', amount: 5000, free: false },
            { name: 'Admin dashboard development', amount: 6000, free: false },
            { name: 'SEO optimization and setup', amount: 10000, free: false },
            { name: 'Final testing and deployment', amount: 5000, free: true }
          ]
        }
      ]
    },
    projectDetails: {
      domain: 'luxepawlour.com',
      domainProvider: 'Hostinger',
      adminDashboardLink: 'https://hpanel.hostinger.com/'
    },
    sitePreview: {
      thumbnailUrl: 'https://dashboard.aidacorp.in/assets/stamix/preview.png',
      liveUrl: 'https://www.luxepawlour.com',
      storeUrl: 'https://p0cxk0-yq.myshopify.com/?_ab=0&_fd=0&_sc=1',
      isEnabled: true
    },
    completionServices: [
      {
        id: 'service-1',
        title: 'Future Support',
        description: '3 Months after the completion.'
      },
      {
        id: 'service-2',
        title: 'Shopify Backend Dashboard',
        description: '3 Months after the completion.'
      },
      {
        id: 'service-3',
        title: 'Hostinger Domain',
        description: '1 year after the completion.'
      },
      {
        id: 'service-4',
        title: 'Api & Payment Policies ',
        description: '6 Months after the completion.'
      },
      {
        id: 'service-5',
        title: 'Custom Domain Email',
        description: '3 Months after the completion.'
      },
      {
        id: 'service-6',
        title: 'Marketing & Advertisement campaigns',
        description: '40 days after the site forntend completion or till the budget get exhausted.'
      },

    ],
    lastUpdated: new Date('2025-10-04')
  }
};

export const getClientProgress = (clientId: string): ClientProgress | null => {
  return clientProgressData[clientId] || null;
};

export const updateDeliverableStatus = (clientId: string, deliverableName: string, completed: boolean): void => {
  const progress = clientProgressData[clientId];
  if (progress) {
    const deliverable = progress.deliverables.find(d => d.name === deliverableName);
    if (deliverable) {
      deliverable.completed = completed;
      progress.lastUpdated = new Date();
    }
  }
};

export const addAsset = (clientId: string, asset: AssetFile): void => {
  const progress = clientProgressData[clientId];
  if (progress) {
    progress.assets.push(asset);
    progress.lastUpdated = new Date();
  }
};

export const updateProgress = (clientId: string, type: 'frontend' | 'backend' | 'seo', percentage: number): void => {
  const progress = clientProgressData[clientId];
  if (progress) {
    progress.progress[type].percentage = Math.min(100, Math.max(0, percentage));
    progress.lastUpdated = new Date();
  }
};

export const addSpecialRequest = (clientId: string, request: Omit<SpecialRequest, 'id' | 'createdAt' | 'updatedAt'>): void => {
  const progress = clientProgressData[clientId];
  if (progress) {
    const newRequest: SpecialRequest = {
      ...request,
      id: `req-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    progress.specialRequests.push(newRequest);
    progress.lastUpdated = new Date();
  }
};

export const addLiveUpdate = (clientId: string, update: Omit<LiveUpdate, 'id' | 'timestamp'>): void => {
  const progress = clientProgressData[clientId];
  if (progress) {
    const newUpdate: LiveUpdate = {
      ...update,
      id: `update-${Date.now()}`,
      timestamp: new Date()
    };
    progress.liveUpdates.unshift(newUpdate); // Add to beginning
    progress.lastUpdated = new Date();
  }
};

export const updateMilestoneStatus = (clientId: string, milestoneId: string, completed: boolean): void => {
  const progress = clientProgressData[clientId];
  if (progress) {
    const milestone = progress.milestones.find(m => m.id === milestoneId);
    if (milestone) {
      milestone.completed = completed;
      progress.lastUpdated = new Date();
    }
  }
};
