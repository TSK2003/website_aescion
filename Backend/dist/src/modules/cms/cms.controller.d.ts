import { CmsService } from './cms.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    getPublicPage(slug: string): Promise<{
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
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        template: string | null;
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
        noIndex: boolean;
    }>;
    getAllPages(user: any, page?: number, limit?: number, status?: string): Promise<{
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
            id: string;
            tenantId: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            status: import("@prisma/client").$Enums.ContentStatus;
            template: string | null;
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
            noIndex: boolean;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
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
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        template: string | null;
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
        noIndex: boolean;
    }>;
    createPage(user: any, dto: CreatePageDto): Promise<{
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
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        template: string | null;
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
        noIndex: boolean;
    }>;
    updatePage(id: string, user: any, dto: UpdatePageDto): Promise<{
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
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        template: string | null;
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
        noIndex: boolean;
    }>;
    deletePage(id: string, user: any): Promise<{
        description: string | null;
        id: string;
        tenantId: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.ContentStatus;
        template: string | null;
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
        noIndex: boolean;
    }>;
    createVersion(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        version: number;
        pageId: string;
        snapshot: import("@prisma/client/runtime/client").JsonValue;
        changedBy: string | null;
        changeNote: string | null;
    }>;
    reorderBlocks(id: string, body: {
        blockIds: string[];
    }): Promise<{
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
