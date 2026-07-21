import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
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
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBySlug(slug: string): Promise<{
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
    }>;
    getById(id: string): Promise<{
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
    }>;
    create(tenantId: string, dto: CreateBlogDto, userId: string): Promise<{
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
    }>;
    update(id: string, dto: UpdateBlogDto, userId: string): Promise<{
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
    }>;
    delete(id: string, userId: string): Promise<{
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
    getCategories(tenantId: string): Promise<{
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
    createCategory(tenantId: string, name: string, slug: string): Promise<{
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
    getTags(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
    }[]>;
    createTag(tenantId: string, name: string, slug: string): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
    }>;
}
