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
            id: string;
            tenantId: string | null;
            status: import("@prisma/client").$Enums.RecordStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            deletedBy: string | null;
            description: string | null;
            name: string;
            isSystem: boolean;
        } | null;
        id: string;
        tenantId: string;
        status: import("@prisma/client").$Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        deletedBy: string | null;
        email: string;
        resetToken: string | null;
        firstName: string;
        lastName: string;
        avatar: string | null;
        bio: string | null;
        phone: string | null;
        timezone: string | null;
        language: string | null;
        lastLoginAt: Date | null;
        failedAttempts: number;
        isLocked: boolean;
        isVerified: boolean;
        resetTokenExpiry: Date | null;
        roleId: string | null;
    }>;
}
export {};
