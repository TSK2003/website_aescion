import { MetadataRoute } from 'next';

const defaultServiceSlugs = [
  'custom-software-development',
  'ai-automation',
  'cloud-solutions',
  'erp-software-development',
];

const defaultBlogSlugs = [
  'future-of-enterprise-ai',
  'migrating-monoliths',
  'security-modern-web',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aescion.com';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/solutions',
    '/industries',
    '/training',
    '/internship',
    '/blog',
    '/contact',
    '/careers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const serviceUrls = defaultServiceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogUrls = defaultBlogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls];
}
