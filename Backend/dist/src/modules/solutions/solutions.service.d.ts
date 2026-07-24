import { SolutionsRepository } from './solutions.repository';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
export declare class SolutionsService {
    private readonly repo;
    constructor(repo: SolutionsRepository);
    getPublicSolutions(tenantId?: string): Promise<any[]>;
    getPublicSolutionBySlug(slug: string, tenantId?: string): Promise<any>;
    getAllSolutions(tenantId: string): Promise<any[]>;
    createSolution(tenantId: string, dto: CreateSolutionDto, userId?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        description: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    updateSolution(tenantId: string, slug: string, dto: UpdateSolutionDto, userId?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        description: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    deleteSolution(tenantId: string, slug: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        description: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
}
