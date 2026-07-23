import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
export declare class SolutionsController {
    private readonly solutionsService;
    constructor(solutionsService: SolutionsService);
    getPublicSolutions(): Promise<any[]>;
    getPublicSolutionBySlug(slug: string): Promise<any>;
    getAllSolutions(user: any): Promise<any[]>;
    createSolution(user: any, dto: CreateSolutionDto): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    updateSolution(slug: string, user: any, dto: UpdateSolutionDto): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
    deleteSolution(slug: string, user: any): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        updatedBy: string | null;
        group: string;
        key: string;
        value: import("@prisma/client/runtime/client").JsonValue;
        isPublic: boolean;
    }>;
}
