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
    getPublicBlog(slug: string): Promise<{
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
    getAllBlogs(user: any, page?: number, limit?: number, status?: string): Promise<{
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
    getCategories(user: any): Promise<{
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
    createCategory(user: any, dto: CreateCategoryTagDto): Promise<{
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
    getTags(user: any): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
    }[]>;
    createTag(user: any, dto: CreateCategoryTagDto): Promise<{
        id: string;
        tenantId: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RecordStatus;
    }>;
    getBlogById(id: string): Promise<{
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
    createBlog(user: any, dto: CreateBlogDto): Promise<{
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
    updateBlog(id: string, user: any, dto: UpdateBlogDto): Promise<{
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
    deleteBlog(id: string, user: any): Promise<{
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
}
