import { ContentStatus } from '@prisma/client';
export declare class CreateBlogDto {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    categoryId?: string;
    isFeatured?: boolean;
    status?: ContentStatus;
    publishedAt?: string;
    scheduledAt?: string;
    coverImage?: string;
    metaTitle?: string;
    metaDesc?: string;
    tagIds?: string[];
}
