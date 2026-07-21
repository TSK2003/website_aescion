import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
