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
            description: string | null;
            id: string;
            tenantId: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            createdBy: string | null;
            status: import("@prisma/client").$Enums.RecordStatus;
            deletedAt: Date | null;
            updatedBy: string | null;
            deletedBy: string | null;
            isSystem: boolean;
        } | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        status: import("@prisma/client").$Enums.RecordStatus;
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
        deletedAt: Date | null;
        updatedBy: string | null;
        deletedBy: string | null;
        roleId: string | null;
    }>;
}
export {};
