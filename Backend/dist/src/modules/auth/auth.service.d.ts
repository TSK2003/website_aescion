import { PrismaService } from '../database/prisma.service';
import { EmailService } from '../email/email.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
