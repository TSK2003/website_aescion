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
                content: Prisma.JsonValue;
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
        total: number;
    }>;
    findPageBySlug(slug: string): Promise<({
        blocks: {
            id: string;
            content: Prisma.JsonValue;
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
    }) | null>;
    findPageById(id: string): Promise<({
        blocks: {
            id: string;
            content: Prisma.JsonValue;
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
            snapshot: Prisma.JsonValue;
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
    }) | null>;
    createPage(data: Prisma.PageCreateInput): Promise<{
        blocks: {
            id: string;
            content: Prisma.JsonValue;
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
    updatePage(id: string, data: Prisma.PageUpdateInput): Promise<{
        blocks: {
            id: string;
            content: Prisma.JsonValue;
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
    softDeletePage(id: string, deletedBy: string): Promise<{
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
    createBlock(data: Prisma.PageBlockCreateInput): Promise<{
        id: string;
        content: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        pageId: string;
    }>;
    updateBlock(id: string, data: Prisma.PageBlockUpdateInput): Promise<{
        id: string;
        content: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        pageId: string;
    }>;
    deleteBlock(id: string): Promise<{
        id: string;
        content: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
        pageId: string;
    }>;
    reorderBlocks(pageId: string, blockIds: string[]): Promise<{
        id: string;
        content: Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        isVisible: boolean;
        blockType: string;
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
