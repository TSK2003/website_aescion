import { Injectable } from '@nestjs/common';
import { EmailRepository } from './email.repository';

@Injectable()
export class EmailService {
  constructor(private readonly emailRepo: EmailRepository) {}

  async getTemplates(tenantId: string) {
    return this.emailRepo.getTemplates(tenantId);
  }

  async getLogs(tenantId: string) {
    return this.emailRepo.getLogs(tenantId);
  }

  // Placeholder for SMTP sending and BullMQ enqueueing
  async sendEmail(
    tenantId: string,
    to: string,
    templateSlug: string,
    variables: any,
  ) {
    return { status: 'QUEUED', message: 'Email queued for sending.' };
  }
}
