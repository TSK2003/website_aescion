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
            category: {
                id: string;
                slug: string;
                name: string;
            } | null;
            tags: ({
                tag: {
                    id: string;
                    slug: string;
                    name: string;
                };
            } & {
                id: string;
                tagId: string;
                blogId: string;
            })[];
            author: {
                id: string;
                lastName: string;
                firstName: string;
                avatar: string | null;
            } | null;
        } & {
            status: import("@prisma/client").$Enums.ContentStatus;
            id: string;
            tenantId: string;
            title: string;
            slug: string;
            publishedAt: Date | null;
            scheduledAt: Date | null;
            metaTitle: string | null;
            metaDesc: string | null;
            ogImage: string | null;
            canonical: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            deletedBy: string | null;
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
        category: {
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            slug: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            name: string;
            icon: string | null;
        } | null;
        tags: ({
            tag: {
                status: import("@prisma/client").$Enums.RecordStatus;
                id: string;
                tenantId: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            tagId: string;
            blogId: string;
        })[];
        author: {
            id: string;
            lastName: string;
            firstName: string;
            avatar: string | null;
            bio: string | null;
        } | null;
    } & {
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }) | null>;
    findById(id: string): Promise<({
        category: {
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            slug: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            name: string;
            icon: string | null;
        } | null;
        tags: ({
            tag: {
                status: import("@prisma/client").$Enums.RecordStatus;
                id: string;
                tenantId: string;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            tagId: string;
            blogId: string;
        })[];
        author: {
            id: string;
            lastName: string;
            firstName: string;
            avatar: string | null;
        } | null;
    } & {
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }) | null>;
    create(data: Prisma.BlogCreateInput): Promise<{
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }>;
    update(id: string, data: Prisma.BlogUpdateInput): Promise<{
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        content: string;
        categoryId: string | null;
        isFeatured: boolean;
        excerpt: string | null;
        authorId: string | null;
        readTime: string | null;
        coverImage: string | null;
    }>;
    softDelete(id: string, deletedBy: string): Promise<{
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
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
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        name: string;
        icon: string | null;
    }[]>;
    createCategory(data: Prisma.CategoryCreateInput): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        name: string;
        icon: string | null;
    }>;
    findAllTags(tenantId: string): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createTag(data: Prisma.TagCreateInput): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
