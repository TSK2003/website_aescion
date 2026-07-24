import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SubscribeNewsletterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Subscriber email address' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;
}
