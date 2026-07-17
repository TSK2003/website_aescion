/**
 * AESCION Mock API Client
 * This simulates a headless CMS SDK (e.g. Sanity/Strapi) or standard REST API.
 */

// Delay helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime?: string;
  tags?: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon?: string;
  content?: string;
  features: string[];
}

// Mock Data
const MOCK_SERVICES: Service[] = [
  { slug: 'software-development', title: 'Enterprise Software Development', shortDescription: 'Custom, scalable, and secure applications.', features: ['Microservices', 'High Availability', 'Security'] },
  { slug: 'ai-automation', title: 'AI & Automation', shortDescription: 'LLMs, RPA, and predictive analytics.', features: ['Custom AI Agents', 'Workflow Automation', 'OCR'] },
  { slug: 'cloud-infrastructure', title: 'Cloud Infrastructure', shortDescription: 'AWS/Azure architecture and DevOps.', features: ['CI/CD', 'Kubernetes', 'Serverless'] },
];

const MOCK_BLOGS: Blog[] = [
  { 
    slug: 'future-of-enterprise-ai', 
    title: 'The Future of Enterprise AI Agents', 
    excerpt: 'How autonomous agents are transforming the way large organizations handle internal workflows.', 
    date: 'Oct 24, 2026', 
    readTime: '12 min read',
    tags: ['AI', 'Enterprise', 'Automation'],
    author: { name: 'Dr. Sarah Chen', role: 'Chief AI Officer' }, 
    category: 'Artificial Intelligence', 
    content: `
## The Shift to Autonomous AI

The landscape of enterprise software is changing rapidly. What was once dominated by monolithic Java applications and heavyweight Oracle databases is now being replaced by cloud-native architectures, serverless computing, and AI-powered automation. 

### Why Autonomous Agents?

Unlike traditional chatbots that require explicit human prompts for every step, autonomous agents can:
1. Break down complex tasks into a sequence of smaller steps.
2. Self-correct when they encounter errors.
3. Access external APIs and databases to fetch necessary context.

\`\`\`typescript
// Example of an AI Agent defining its goal
const agent = new AutonomousAgent({
  role: "Data Analyst",
  goal: "Analyze Q3 sales data and identify the top 3 underperforming regions.",
  tools: [sqlDatabase, emailClient]
});
await agent.execute();
\`\`\`

> "By 2027, over 50% of enterprise workflows will be augmented or fully handled by autonomous AI agents." – Industry Research

### The Implementation Strategy
At AESCION, we advocate for an incremental modernization approach. We help enterprises integrate AI agents into specific, high-friction workflows first, such as customer support triage or automated data entry.
    `
  },
  { 
    slug: 'migrating-monoliths', 
    title: 'Migrating Monoliths to Microservices', 
    excerpt: 'A practical guide to breaking down legacy systems without disrupting active business operations.', 
    date: 'Oct 18, 2026', 
    readTime: '9 min read',
    tags: ['Cloud', 'Architecture', 'DevOps'],
    author: { name: 'James Wilson', role: 'Cloud Architect' }, 
    category: 'Cloud Architecture', 
    content: `
## The Strangler Fig Pattern

When dealing with legacy systems, a "big bang" rewrite is often too risky and expensive. Instead, we use the **Strangler Fig Pattern**.

### Step-by-Step Approach

1. **Identify a Bounded Context**: Find a specific feature or domain that can be isolated (e.g., the billing module).
2. **Build the Microservice**: Develop the new service using modern technologies (like NestJS and PostgreSQL).
3. **Route Traffic**: Update the API Gateway to route traffic for that specific feature to the new microservice instead of the monolith.

### Benefits

- Reduced deployment risk
- Incremental value delivery
- Independent scaling of services

Contact our architects to learn more about how we can help modernize your legacy systems.
    ` 
  },
];

export const cmsClient = {
  services: {
    getAll: async (): Promise<Service[]> => {
      await delay(800);
      return MOCK_SERVICES;
    },
    getBySlug: async (slug: string): Promise<Service | null> => {
      await delay(800);
      return MOCK_SERVICES.find(s => s.slug === slug) || null;
    }
  },
  blogs: {
    getAll: async (): Promise<Blog[]> => {
      await delay(800);
      return MOCK_BLOGS;
    },
    getBySlug: async (slug: string): Promise<Blog | null> => {
      await delay(800);
      return MOCK_BLOGS.find(b => b.slug === slug) || null;
    }
  }
};
