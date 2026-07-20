import { MetadataRoute } from 'next';
import { servicesData } from '@/lib/cms/services-data';
import { locationsData } from '@/lib/cms/locations-data';
import { blogsData } from '@/lib/cms/blogs-data';

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

  const serviceUrls = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const locationUrls = locationsData.map((loc) => ({
    url: `${baseUrl}/location/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogsData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...serviceUrls, ...locationUrls, ...blogUrls];
}
