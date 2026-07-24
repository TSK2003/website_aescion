import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCategoryTagDto } from './dto/category-tag.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getPublicBlogs(page?: number, limit?: number, categoryId?: string, tagId?: string, search?: string): Promise<{
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
    getPublicBlog(slug: string): Promise<{
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
    getBlogBySlugPublic(slug: string): Promise<{
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
    getAllBlogs(user: any, page?: number, limit?: number, status?: string): Promise<{
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
    getCategories(user: any): Promise<{
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
    createCategory(user: any, dto: CreateCategoryTagDto): Promise<{
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
    getTags(user: any): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
    createTag(user: any, dto: CreateCategoryTagDto): Promise<{
        id: string;
        tenantId: string;
        slug: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    getBlogById(id: string): Promise<{
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
    createBlog(user: any, dto: CreateBlogDto): Promise<{
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
    updateBlog(id: string, user: any, dto: UpdateBlogDto): Promise<{
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
    deleteBlog(id: string, user: any): Promise<{
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
}
