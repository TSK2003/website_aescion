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
            author: {
                id: string;
                firstName: string;
                lastName: string;
                avatar: string | null;
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
        } & {
            id: string;
            tenantId: string;
            authorId: string | null;
            categoryId: string | null;
            title: string;
            slug: string;
            content: string;
            excerpt: string | null;
            readTime: string | null;
            isFeatured: boolean;
            status: import("@prisma/client").$Enums.ContentStatus;
            publishedAt: Date | null;
            scheduledAt: Date | null;
            coverImage: string | null;
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
        })[];
        total: number;
    }>;
    findBySlug(slug: string): Promise<({
        category: {
            id: string;
            tenantId: string;
            slug: string;
            status: import("@prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            order: number;
            description: string | null;
            name: string;
        } | null;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            avatar: string | null;
            bio: string | null;
        } | null;
        tags: ({
            tag: {
                id: string;
                tenantId: string;
                slug: string;
                status: import("@prisma/client").$Enums.RecordStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            tagId: string;
            blogId: string;
        })[];
    } & {
        id: string;
        tenantId: string;
        authorId: string | null;
        categoryId: string | null;
        title: string;
        slug: string;
        content: string;
        excerpt: string | null;
        readTime: string | null;
        isFeatured: boolean;
        status: import("@prisma/client").$Enums.ContentStatus;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        coverImage: string | null;
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
    }) | null>;
    findById(id: string): Promise<({
        category: {
            id: string;
            tenantId: string;
            slug: string;
            status: import("@prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            icon: string | null;
            order: number;
            description: string | null;
            name: string;
        } | null;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            avatar: string | null;
        } | null;
        tags: ({
            tag: {
                id: string;
                tenantId: string;
                slug: string;
                status: import("@prisma/client").$Enums.RecordStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
            };
        } & {
            id: string;
            tagId: string;
            blogId: string;
        })[];
    } & {
        id: string;
        tenantId: string;
        authorId: string | null;
        categoryId: string | null;
        title: string;
        slug: string;
        content: string;
        excerpt: string | null;
        readTime: string | null;
        isFeatured: boolean;
        status: import("@prisma/client").$Enums.ContentStatus;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        coverImage: string | null;
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
    }) | null>;
    create(data: Prisma.BlogCreateInput): Promise<{
        id: string;
        tenantId: string;
        authorId: string | null;
        categoryId: string | null;
        title: string;
        slug: string;
        content: string;
        excerpt: string | null;
        readTime: string | null;
        isFeatured: boolean;
        status: import("@prisma/client").$Enums.ContentStatus;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        coverImage: string | null;
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
    }>;
    update(id: string, data: Prisma.BlogUpdateInput): Promise<{
        id: string;
        tenantId: string;
        authorId: string | null;
        categoryId: string | null;
        title: string;
        slug: string;
        content: string;
        excerpt: string | null;
        readTime: string | null;
        isFeatured: boolean;
        status: import("@prisma/client").$Enums.ContentStatus;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        coverImage: string | null;
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
    }>;
    softDelete(id: string, deletedBy: string): Promise<{
        id: string;
        tenantId: string;
        authorId: string | null;
        categoryId: string | null;
        title: string;
        slug: string;
        content: string;
        excerpt: string | null;
        readTime: string | null;
        isFeatured: boolean;
        status: import("@prisma/client").$Enums.ContentStatus;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        coverImage: string | null;
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
    }>;
    setTags(blogId: string, tagIds: string[]): Promise<void>;
    findAllCategories(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        order: number;
        description: string | null;
        name: string;
    }[]>;
    createCategory(data: Prisma.CategoryCreateInput): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        icon: string | null;
        order: number;
        description: string | null;
        name: string;
    }>;
    findAllTags(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createTag(data: Prisma.TagCreateInput): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
