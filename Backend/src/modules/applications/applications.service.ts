import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationsRepository } from './applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(private readonly appsRepo: ApplicationsRepository) {}

  async getAllApplications(
    tenantId: string,
    options: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
      assigneeId?: string;
      search?: string;
    },
  ) {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const result = await this.appsRepo.findAll(tenantId, {
      ...options,
      skip,
      take: limit,
    });

    return {
      items: result.data,
      meta: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    };
  }

  async getApplicationById(id: string) {
    const app = await this.appsRepo.findById(id);
    if (!app) throw new NotFoundException(`Application "${id}" not found`);
    return app;
  }

  // Public endpoint used by Website forms
  async submitApplication(tenantId: string, data: any) {
    return this.appsRepo.create({
      tenant: { connect: { id: tenantId } },
      type: data.type,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      college: data.college,
      degree: data.degree,
      position: data.position,
      resumeUrl: data.resumeUrl,
      portfolioUrl: data.portfolioUrl,
      coverLetter: data.coverLetter,
      status: 'SUBMITTED',
    });
  }

  async updateStatus(id: string, status: string, userId: string) {
    await this.getApplicationById(id);
    return this.appsRepo.update(id, {
      status: status as any,
      updatedBy: userId,
    });
  }

  async assignUser(id: string, assigneeId: string, userId: string) {
    await this.getApplicationById(id);
    return this.appsRepo.update(id, {
      assignee: { connect: { id: assigneeId } },
      updatedBy: userId,
    });
  }
}
