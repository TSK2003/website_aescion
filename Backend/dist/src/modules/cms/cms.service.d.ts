import { CmsRepository } from './cms.repository';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class CmsService {
    private readonly cmsRepo;
    constructor(cmsRepo: CmsRepository);
    getAllPages(tenantId: string, page?: number, limit?: number, status?: string): Promise<{
        items: ({
            blocks: {
                id: string;
                content: import("@prisma/client/runtime/client").JsonValue;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                isVisible: boolean;
                blockType: string;
                pageId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            title: string;
            slug: string;
            status: import("@prisma/client").$Enums.ContentStatus;
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
            description: string | null;
            template: string | null;
            noIndex: boolean;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getPageBySlug(slug: string): Promise<{
        blocks: {
            id: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            pageId: string;
        }[];
    } & {
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.ContentStatus;
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
        description: string | null;
        template: string | null;
        noIndex: boolean;
    }>;
    getPageById(id: string): Promise<{
        blocks: {
            id: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            pageId: string;
        }[];
        versions: {
            id: string;
            createdAt: Date;
            version: number;
            pageId: string;
            snapshot: import("@prisma/client/runtime/client").JsonValue;
            changedBy: string | null;
            changeNote: string | null;
        }[];
    } & {
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.ContentStatus;
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
        description: string | null;
        template: string | null;
        noIndex: boolean;
    }>;
    createPage(tenantId: string, dto: CreatePageDto, userId: string): Promise<{
        blocks: {
            id: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            pageId: string;
        }[];
    } & {
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.ContentStatus;
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
        description: string | null;
        template: string | null;
        noIndex: boolean;
    }>;
    updatePage(id: string, dto: UpdatePageDto, userId: string): Promise<{
        blocks: {
            id: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            pageId: string;
        }[];
    } & {
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.ContentStatus;
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
        description: string | null;
        template: string | null;
        noIndex: boolean;
    }>;
    deletePage(id: string, userId: string): Promise<{
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        status: import("@prisma/client").$Enums.ContentStatus;
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
        description: string | null;
        template: string | null;
        noIndex: boolean;
    }>;
    createPageVersion(pageId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        version: number;
        pageId: string;
        snapshot: import("@prisma/client/runtime/client").JsonValue;
        changedBy: string | null;
        changeNote: string | null;
    }>;
    reorderBlocks(pageId: string, blockIds: string[]): Promise<{
        id: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        pageId: string;
    }[]>;
}
