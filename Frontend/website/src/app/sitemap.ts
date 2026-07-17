import { MetadataRoute } from 'next';
import { cmsClient } from '@aescion/api-client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aescion.com';

  // Static Pages
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
    '/careers'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Routes
  const services: any[] = [];
  try {
    const data = await cmsClient.services.getAll();
    services.push(...data);
  } catch(e) {
    console.error(e);
  }

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const solutionUrls = [{ slug: 'education-lms' }].map((sol) => ({
    url: `${baseUrl}/solutions/${sol.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogUrls = [{ slug: 'future-of-enterprise-ai' }].map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...serviceUrls, ...solutionUrls, ...blogUrls];
}
