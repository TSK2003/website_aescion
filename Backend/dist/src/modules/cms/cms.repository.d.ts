import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CmsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllPages(tenantId: string, options?: {
        status?: string;
        skip?: number;
        take?: number;
    }): Promise<{
        data: ({
            blocks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                isVisible: boolean;
                blockType: string;
                content: Prisma.JsonValue;
                pageId: string;
            }[];
        } & {
            status: import("@prisma/client").$Enums.ContentStatus;
            id: string;
            tenantId: string;
            title: string;
            slug: string;
            description: string | null;
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
        total: number;
    }>;
    findPageBySlug(slug: string): Promise<({
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: Prisma.JsonValue;
            pageId: string;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        description: string | null;
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
    }) | null>;
    findPageById(id: string): Promise<({
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: Prisma.JsonValue;
            pageId: string;
        }[];
        versions: {
            id: string;
            createdAt: Date;
            version: number;
            pageId: string;
            snapshot: Prisma.JsonValue;
            changedBy: string | null;
            changeNote: string | null;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        description: string | null;
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
    }) | null>;
    createPage(data: Prisma.PageCreateInput): Promise<{
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: Prisma.JsonValue;
            pageId: string;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        description: string | null;
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
    updatePage(id: string, data: Prisma.PageUpdateInput): Promise<{
        blocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            isVisible: boolean;
            blockType: string;
            content: Prisma.JsonValue;
            pageId: string;
        }[];
    } & {
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        description: string | null;
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
    softDeletePage(id: string, deletedBy: string): Promise<{
        status: import("@prisma/client").$Enums.ContentStatus;
        id: string;
        tenantId: string;
        title: string;
        slug: string;
        description: string | null;
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
    createBlock(data: Prisma.PageBlockCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        content: Prisma.JsonValue;
        pageId: string;
    }>;
    updateBlock(id: string, data: Prisma.PageBlockUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        content: Prisma.JsonValue;
        pageId: string;
    }>;
    deleteBlock(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        content: Prisma.JsonValue;
        pageId: string;
    }>;
    reorderBlocks(pageId: string, blockIds: string[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        content: Prisma.JsonValue;
        pageId: string;
    }[]>;
    createVersion(data: Prisma.PageVersionCreateInput): Promise<{
        id: string;
        createdAt: Date;
        version: number;
        pageId: string;
        snapshot: Prisma.JsonValue;
        changedBy: string | null;
        changeNote: string | null;
    }>;
    findVersions(pageId: string): Promise<{
        id: string;
        createdAt: Date;
        version: number;
        pageId: string;
        snapshot: Prisma.JsonValue;
        changedBy: string | null;
        changeNote: string | null;
    }[]>;
    findVersionByNumber(pageId: string, version: number): Promise<{
        id: string;
        createdAt: Date;
        version: number;
        pageId: string;
        snapshot: Prisma.JsonValue;
        changedBy: string | null;
        changeNote: string | null;
    } | null>;
}
