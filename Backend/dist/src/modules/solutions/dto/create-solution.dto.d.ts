export declare class CreateSolutionDto {
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    category?: string;
    icon?: string;
    benefits?: string[];
    techStack?: string[];
    order?: number;
    status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
}
