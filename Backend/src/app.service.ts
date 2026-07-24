import { Injectable } from '@nestjs/common';
import { PrismaService } from './modules/database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'AESCION Enterprise API Engine Active';
  }

  async search(query: string) {
    if (!query || query.trim().length === 0) return [];
    const term = query.trim();

    const [blogs, services, pages] = await Promise.all([
      this.prisma.blog.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { excerpt: { contains: term, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
        },
      }),
      this.prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { shortDescription: { contains: term, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
        },
      }),
      this.prisma.page.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: 'insensitive' } },
            { slug: { contains: term, mode: 'insensitive' } },
          ],
        },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
        },
      }),
    ]);

    const results = [
      ...blogs.map((b) => ({
        id: b.id,
        title: b.title,
        href: `/blog/${b.slug}`,
        category: 'Blog',
        description: b.excerpt,
      })),
      ...services.map((s) => ({
        id: s.id,
        title: s.title,
        href: `/services/${s.slug}`,
        category: 'Service',
        description: s.shortDescription,
      })),
      ...pages.map((p) => ({
        id: p.id,
        title: p.title,
        href: p.slug.startsWith('/') ? p.slug : `/${p.slug}`,
        category: 'Page',
        description: `Website page`,
      })),
    ];

    return results;
  }
}
