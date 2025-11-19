export const localProjects = [
  {
    id: 'drh-customer-portal',
    title: 'D.R. Horton Customer Portal',
    description: 'Redesigned front-facing customer portal application for everyday homebuyers, modernizing a legacy .NET environment with React.',
    shortDescription: 'Modernizing the homebuyer experience.',
    categoryId: 'professional',
    technologies: ['React', 'JavaScript', 'ASP.NET', 'SCSS', 'Webpack', 'React Helmet'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fspokane_exterior.jpg?alt=media',
    featured: true,
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fcustomerportal_dashboard.png?alt=media',
        title: 'Dashboard View',
        description: 'Main dashboard showing construction progress and updates'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fcustomerportal_sharemedia.png?alt=media',
        title: 'Share Media Feature',
        description: 'Social media sharing functionality with custom metadata'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fcustomerportal_sharemedia2.png?alt=media',
        title: 'Share Media Preview',
        description: 'Preview of shared content with Open Graph tags'
      }
    ],
    features: [
      'End-to-end feature work: UI components, responsive SCSS, client-side state flows.',
      'Robust image pipelines: bulk retrieval, thumbnails, lazy loading.',
      'Improved UX for notifications and new-content discovery.',
      'SEO / social sharing metadata with react-helmet-async.'
    ],
    links: {
      live: 'https://customerportal.drhorton.com/'
    }
  },
  {
    id: 'drh-warranty-system',
    title: 'Warranty System Modernization',
    description: 'Transformed legacy jQuery-based customer care and warranty management system into a modern React application.',
    shortDescription: 'Enterprise legacy migration to React.',
    categoryId: 'professional',
    technologies: ['React 18', 'Kendo UI', 'ASP.NET MVC 5', 'Gulp', 'SASS'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fdrh_logo.png?alt=media',
    imageFit: 'contain',
    featured: true,
    images: null,
    imagesNote: 'This is an internal application and screenshots cannot be shared publicly.',
    features: [
      'Converted legacy jQuery dashboard to React functional components.',
      'Data Grid Modernization with Kendo React Grid.',
      'Interactive Dashboard Components and Ticket Workflow.',
      'Build System Modernization with Gulp and Babel.'
    ],
    links: {}
  },
  {
    id: 'drh-mobile-app',
    title: 'Customer Portal Mobile',
    description: 'Building a .NET MAUI mobile app from the ground up, converting the web customer portal into a native mobile experience.',
    shortDescription: 'Native mobile experience for homebuyers.',
    categoryId: 'professional',
    technologies: ['.NET MAUI', 'C#', 'Mobile Architecture', 'UI/UX Design'],
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fdotnetmaui.png?alt=media',
    featured: true,
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fcustomerportalmobile_dashboard.png?alt=media',
        title: 'Mobile Dashboard',
        description: 'Native mobile dashboard with optimized touch interactions'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fcustomerportalmobile_constructionphotography.png?alt=media',
        title: 'Construction Photography',
        description: 'Photo gallery optimized for mobile viewing'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/wbrh-plus.firebasestorage.app/o/dr-horton%2Fcustomerportalmobile_videopreview.png?alt=media',
        title: 'Video Preview',
        description: 'Video playback and preview functionality'
      }
    ],
    features: [
      'Designing UI and learning architecture from the ground up.',
      'Integrating .NET backend.',
      'Shipping to production.'
    ],
    links: {}
  }
];

export const localCategories = [
  {
    id: 'professional',
    title: 'Professional Experience',
    order: 0
  },
  {
    id: 'personal',
    title: 'Personal Projects',
    order: 1
  }
];

