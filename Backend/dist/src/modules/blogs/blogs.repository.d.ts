import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
export declare class BlogsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, options?: {
        status?: string;
        categoryId?: string;
        tagId?: string;
        search?: string;
        isFeatured?: boolean;
        skip?: number;
        take?: number;
    }): Promise<{
        data: ({
            tags: ({
                tag: {
                    id: string;
                    name: string;
                    slug: string;
                };
            } & {
                id: string;
                tagId: string;
                blogId: string;
            })[];
            category: {
                id: string;
                name: string;
                slug: string;
            } | null;
            author: {
                id: string;
                firstName: string;
                lastName: string;
                avatar: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            status: import("@prisma/client").$Enums.ContentStatus;
            deletedAt: Date | null;
            updatedBy: string | null;
            deletedBy: string | null;
            title: string;
            publishedAt: Date | null;
            scheduledAt: Date | null;
            metaTitle: string | null;
            metaDesc: string | null;
            ogImage: string | null;
            canonical: string | null;
            content: string;
            categoryId: string | null;
            isFeatured: boolean;
            excerpt: string | null;
            authorId: string | null;
            readTime: string | null;
            coverImage: string | null;
        })[];
        total: number;
    }>;
    findBySlug(slug: string): Promise<({
        tags: ({
            tag: {
                id: string;
                tenantId: string;
                name: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.RecordStatus;
            };
        } & {
            id: string;
            tagId: string;
            blogId: string;
        })[];
        category: {
            description: string | null;
            id: string;
            tenantId: string;
            name: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.RecordStatus;
            order: number;
            icon: string | null;
        } | null;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            avatar: string | null;
            bio: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        deletedAt: Date | null;
        updatedBy: string | null;
        deletedBy: string | null;
        title: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }) | null>;
    findById(id: string): Promise<({
        tags: ({
            tag: {
                id: string;
                tenantId: string;
                name: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.RecordStatus;
            };
        } & {
            id: string;
            tagId: string;
            blogId: string;
        })[];
        category: {
            description: string | null;
            id: string;
            tenantId: string;
            name: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.RecordStatus;
            order: number;
            icon: string | null;
        } | null;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            avatar: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        deletedAt: Date | null;
        updatedBy: string | null;
        deletedBy: string | null;
        title: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }) | null>;
    create(data: Prisma.BlogCreateInput): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        deletedAt: Date | null;
        updatedBy: string | null;
        deletedBy: string | null;
        title: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }>;
    update(id: string, data: Prisma.BlogUpdateInput): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        deletedAt: Date | null;
        updatedBy: string | null;
        deletedBy: string | null;
        title: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }>;
    softDelete(id: string, deletedBy: string): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        deletedAt: Date | null;
        updatedBy: string | null;
        deletedBy: string | null;
        title: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }>;
    setTags(blogId: string, tagIds: string[]): Promise<void>;
    findAllCategories(tenantId: string): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
        order: number;
        icon: string | null;
    }[]>;
    createCategory(data: Prisma.CategoryCreateInput): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
        order: number;
        icon: string | null;
    }>;
    findAllTags(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
    }[]>;
    createTag(data: Prisma.TagCreateInput): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
    }>;
}
