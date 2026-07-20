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
                createdAt: Date;
                updatedAt: Date;
                order: number;
                isVisible: boolean;
                blockType: string;
                content: import("@prisma/client/runtime/client").JsonValue;
                pageId: string;
            }[];
        } & {
            description: string | null;
            status: import("@prisma/client").$Enums.ContentStatus;
            id: string;
            tenantId: string;
            title: string;
            slug: string;
            publishedAt: Date | null;
            scheduledAt: Date | null;
            template: string | null;
            metaTitle: string | null;
            metaDesc: string | null;
            ogImage: string | null;
            canonical: string | null;
            noIndex: boolean;
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
    getPageBySlug(slug: string): Promise<{
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        description: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        template: string | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        noIndex: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
    }>;
    getPageById(id: string): Promise<{
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: import("@prisma/client/runtime/client").JsonValue;
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
        description: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        template: string | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        noIndex: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
    }>;
    createPage(tenantId: string, dto: CreatePageDto, userId: string): Promise<{
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        description: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        template: string | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        noIndex: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
    }>;
    updatePage(id: string, dto: UpdatePageDto, userId: string): Promise<{
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: import("@prisma/client/runtime/client").JsonValue;
            pageId: string;
        }[];
    } & {
        description: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        template: string | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        noIndex: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
    }>;
    deletePage(id: string, userId: string): Promise<{
        description: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        publishedAt: Date | null;
        scheduledAt: Date | null;
        template: string | null;
        metaTitle: string | null;
        metaDesc: string | null;
        ogImage: string | null;
        canonical: string | null;
        noIndex: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        content: import("@prisma/client/runtime/client").JsonValue;
        pageId: string;
    }[]>;
}
