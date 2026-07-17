import { BlogsRepository } from './blogs.repository';
export declare class BlogsService {
    private readonly blogsRepo;
    constructor(blogsRepo: BlogsRepository);
    getAll(tenantId: string, options: {
        page?: number;
        limit?: number;
        status?: string;
        categoryId?: string;
        tagId?: string;
        search?: string;
        isFeatured?: boolean;
    }): Promise<{
        items: ({
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
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBySlug(slug: string): Promise<{
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
    }>;
    getById(id: string): Promise<{
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
    }>;
    create(tenantId: string, dto: any, userId: string): Promise<{
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
    }>;
    update(id: string, dto: any, userId: string): Promise<{
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
    }>;
    delete(id: string, userId: string): Promise<{
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
    getCategories(tenantId: string): Promise<{
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
    createCategory(tenantId: string, name: string, slug: string): Promise<{
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
    getTags(tenantId: string): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createTag(tenantId: string, name: string, slug: string): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
