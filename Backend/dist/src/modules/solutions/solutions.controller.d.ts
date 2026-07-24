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
    updateSolution(slug: string, user: any, dto: UpdateSolutionDto): Promise<{
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
    deleteSolution(slug: string, user: any): Promise<{
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
