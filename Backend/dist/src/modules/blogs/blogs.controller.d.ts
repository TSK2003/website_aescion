import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCategoryTagDto } from './dto/category-tag.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getPublicBlogs(page?: number, limit?: number, categoryId?: string, tagId?: string, search?: string): Promise<{
        items: ({
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
            category: {
                id: string;
                slug: string;
                name: string;
            } | null;
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
    getPublicBlog(slug: string): Promise<{
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
        category: {
            description: string | null;
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            name: string;
            icon: string | null;
        } | null;
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
    getAllBlogs(user: any, page?: number, limit?: number, status?: string): Promise<{
        items: ({
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
            category: {
                id: string;
                slug: string;
                name: string;
            } | null;
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
    getCategories(user: any): Promise<{
        description: string | null;
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        name: string;
        icon: string | null;
    }[]>;
    createCategory(user: any, dto: CreateCategoryTagDto): Promise<{
        description: string | null;
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        name: string;
        icon: string | null;
    }>;
    getTags(user: any): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createTag(user: any, dto: CreateCategoryTagDto): Promise<{
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getBlogById(id: string): Promise<{
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
        category: {
            description: string | null;
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            name: string;
            icon: string | null;
        } | null;
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
    createBlog(user: any, dto: CreateBlogDto): Promise<{
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
        category: {
            description: string | null;
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            name: string;
            icon: string | null;
        } | null;
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
    updateBlog(id: string, user: any, dto: UpdateBlogDto): Promise<{
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
        category: {
            description: string | null;
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            name: string;
            icon: string | null;
        } | null;
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
    deleteBlog(id: string, user: any): Promise<{
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
}
