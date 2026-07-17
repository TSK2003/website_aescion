import { Strategy } from 'passport-jwt';
import { PrismaService } from '../database/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        role: {
            status: import("@prisma/client").$Enums.RecordStatus;
            id: string;
            tenantId: string | null;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            deletedBy: string | null;
            name: string;
            isSystem: boolean;
        } | null;
        status: import("@prisma/client").$Enums.RecordStatus;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        email: string;
        lastName: string;
        firstName: string;
        phone: string | null;
        avatar: string | null;
        bio: string | null;
        timezone: string | null;
        language: string | null;
        lastLoginAt: Date | null;
        failedAttempts: number;
        isLocked: boolean;
        isVerified: boolean;
        roleId: string | null;
    }>;
}
export {};
