import { Injectable, NotFoundException } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly repo: ServicesRepository) {}

  async getPublicServices(tenantId?: string) {
    return this.repo.findPublicServices(tenantId);
  }

  async getPublicServiceBySlug(slug: string) {
    const service = await this.repo.findBySlug(slug);
    if (!service || service.deletedAt || service.status !== 'PUBLISHED') {
      throw new NotFoundException(`Service with slug ${slug} not found`);
    }
    return service;
  }

  async getAllServices(tenantId: string, page = 1, limit = 50, status?: string) {
    const skip = (page - 1) * limit;
    return this.repo.findAll(tenantId, { status, skip, take: limit });
  }

  async getServiceById(id: string) {
    const service = await this.repo.findById(id);
    if (!service || service.deletedAt) {
      throw new NotFoundException(`Service ${id} not found`);
    }
    return service;
  }

  async createService(tenantId: string, dto: CreateServiceDto, userId?: string) {
    return this.repo.create({
      tenant: { connect: { id: tenantId } },
      title: dto.title,
      slug: dto.slug,
      shortDescription: dto.shortDescription,
      content: dto.content,
      icon: dto.icon || 'Code',
      features: dto.features || [],
      order: dto.order ?? 0,
      status: (dto.status as any) || 'PUBLISHED',
      metaTitle: dto.metaTitle,
      metaDesc: dto.metaDesc,
      createdBy: userId,
    });
  }

  async updateService(id: string, dto: UpdateServiceDto, userId?: string) {
    await this.getServiceById(id);
    return this.repo.update(id, {
      ...dto,
      status: dto.status as any,
      updatedBy: userId,
    });
  }

  async deleteService(id: string, userId?: string) {
    await this.getServiceById(id);
    return this.repo.delete(id, userId);
  }
}
