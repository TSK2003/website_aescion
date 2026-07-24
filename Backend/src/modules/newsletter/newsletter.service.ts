import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(email: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.status === 'SUBSCRIBED') {
        throw new ConflictException('This email is already subscribed to our newsletter.');
      }
      return this.prisma.newsletterSubscriber.update({
        where: { id: existing.id },
        data: { status: 'SUBSCRIBED' },
      });
    }

    return this.prisma.newsletterSubscriber.create({
      data: {
        email: normalizedEmail,
        status: 'SUBSCRIBED',
      },
    });
  }

  async getAllSubscribers() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
