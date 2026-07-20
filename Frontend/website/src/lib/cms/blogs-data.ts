export interface BlogData {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  publishDate: string;
  author: string;
  excerpt: string;
}

export const blogsData: BlogData[] = [
  {
    slug: 'future-of-enterprise-ai',
    title: 'The Future of Enterprise AI Automation in 2026',
    seoTitle: 'Future of Enterprise AI Automation in 2026 | Tech Blog',
    metaDescription: 'Discover how AI agents and automation are transforming enterprise operations, reducing costs, and paving the way for the future of work.',
    category: 'Artificial Intelligence',
    publishDate: '2026-07-15',
    author: 'Aescion Engineering',
    excerpt: 'AI is no longer just a chatbot. Learn how custom AI agents are autonomously handling complex enterprise workflows.'
  },
  {
    slug: 'why-custom-erp-beats-saas',
    title: 'Why Custom ERPs Are Outperforming Off-the-Shelf SaaS',
    seoTitle: 'Custom ERP vs Off-the-Shelf SaaS | Which is Better? | AESCION',
    metaDescription: 'Compare the ROI of custom Enterprise Resource Planning software against monthly SaaS subscriptions for growing businesses.',
    category: 'ERP',
    publishDate: '2026-07-10',
    author: 'Aescion Business Insights',
    excerpt: 'Stop forcing your business workflows to fit restricted SaaS software. Custom ERPs offer perfect alignment and zero licensing fees.'
  },
  {
    slug: 'how-to-choose-software-company-tamil-nadu',
    title: 'How to Choose the Right Software Company in Tamil Nadu',
    seoTitle: 'How to Choose the Best Software Company in Tamil Nadu',
    metaDescription: 'A complete guide to evaluating and hiring the best software development agency in Tamil Nadu for your startup or enterprise project.',
    category: 'Technology',
    publishDate: '2026-07-05',
    author: 'Aescion Team',
    excerpt: 'From evaluating tech stacks to checking client references, here is your checklist for finding the perfect IT partner in Tamil Nadu.'
  },
  {
    slug: 'nextjs-vs-react-for-enterprise',
    title: 'Next.js vs React: Which is Best for Enterprise Websites?',
    seoTitle: 'Next.js vs React for Enterprise Web Development | AESCION',
    metaDescription: 'Understand why Next.js has become the industry standard over vanilla React for building high-performance, SEO-optimized enterprise applications.',
    category: 'Web Development',
    publishDate: '2026-06-28',
    author: 'Aescion Engineering',
    excerpt: 'Server-side rendering, advanced caching, and Edge networks are making Next.js the absolute winner for modern web development.'
  },
  {
    slug: 'benefits-of-ai-internship',
    title: '5 Benefits of an Industrial AI Internship for Engineering Students',
    seoTitle: 'Benefits of AI Industrial Internships | AESCION EdTech',
    metaDescription: 'Learn how working on live AI and Machine Learning projects during an industrial internship can secure high-paying tech placements.',
    category: 'Internship',
    publishDate: '2026-06-20',
    author: 'Aescion EdTech',
    excerpt: 'Academic knowledge is not enough. Discover how live project experience bridges the gap between college and the IT industry.'
  }
];
