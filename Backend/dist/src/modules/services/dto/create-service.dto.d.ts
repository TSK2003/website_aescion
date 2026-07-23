export declare class CreateServiceDto {
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    icon?: string;
    features?: string[];
    order?: number;
    status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
    metaTitle?: string;
    metaDesc?: string;
}
