import { Injectable, NotFoundException } from '@nestjs/common';
import { SolutionsRepository } from './solutions.repository';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

const DEFAULT_TENANT_ID =
  process.env.DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001';

@Injectable()
export class SolutionsService {
  constructor(private readonly repo: SolutionsRepository) {}

  async getPublicSolutions(tenantId?: string) {
    const tid = tenantId || DEFAULT_TENANT_ID;
    return this.repo.findPublic(tid);
  }

  async getPublicSolutionBySlug(slug: string, tenantId?: string) {
    const tid = tenantId || DEFAULT_TENANT_ID;
    const sol = await this.repo.findBySlug(tid, slug);
    if (!sol) {
      throw new NotFoundException(`Solution with slug ${slug} not found`);
    }
    return sol;
  }

  async getAllSolutions(tenantId: string) {
    return this.repo.findAll(tenantId);
  }

  async createSolution(tenantId: string, dto: CreateSolutionDto, userId?: string) {
    const value = {
      title: dto.title,
      slug: dto.slug,
      shortDescription: dto.shortDescription,
      content: dto.content,
      category: dto.category || 'Enterprise',
      icon: dto.icon || 'Cpu',
      benefits: dto.benefits || [],
      techStack: dto.techStack || [],
      order: dto.order ?? 0,
      status: dto.status || 'PUBLISHED',
    };
    return this.repo.upsert(tenantId, dto.slug, value, dto.title, userId);
  }

  async updateSolution(tenantId: string, slug: string, dto: UpdateSolutionDto, userId?: string) {
    const existing = await this.repo.findBySlug(tenantId, slug);
    if (!existing) {
      throw new NotFoundException(`Solution with slug ${slug} not found`);
    }
    const updatedValue = {
      ...existing,
      ...dto,
    };
    const newSlug = dto.slug || slug;
    if (newSlug !== slug) {
      await this.repo.delete(tenantId, slug);
    }
    return this.repo.upsert(tenantId, newSlug, updatedValue, updatedValue.title, userId);
  }

  async deleteSolution(tenantId: string, slug: string) {
    return this.repo.delete(tenantId, slug);
  }
}
