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
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBySlug(slug: string): Promise<{
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
    }>;
    getById(id: string): Promise<{
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
    }>;
    create(tenantId: string, dto: CreateBlogDto, userId: string): Promise<{
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
    }>;
    update(id: string, dto: UpdateBlogDto, userId: string): Promise<{
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
    }>;
    delete(id: string, userId: string): Promise<{
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
    getCategories(tenantId: string): Promise<{
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
    createCategory(tenantId: string, name: string, slug: string): Promise<{
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
    getTags(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createTag(tenantId: string, name: string, slug: string): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
}
