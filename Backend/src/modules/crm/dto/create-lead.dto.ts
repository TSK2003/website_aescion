import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({ example: 'john@company.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: '+91 98765 43210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ example: 'CTO' })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({
    enum: [
      'WEBSITE',
      'INTERNSHIP',
      'TRAINING',
      'CONTACT_FORM',
      'CORPORATE',
      'MANUAL',
      'REFERRAL',
      'SOCIAL_MEDIA',
    ],
    default: 'WEBSITE',
  })
  @IsOptional()
  @IsEnum([
    'WEBSITE',
    'INTERNSHIP',
    'TRAINING',
    'CONTACT_FORM',
    'CORPORATE',
    'MANUAL',
    'REFERRAL',
    'SOCIAL_MEDIA',
  ])
  source?: string;

  @ApiPropertyOptional({
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM',
  })
  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  priority?: string;

  @ApiPropertyOptional({ example: 'Need a custom ERP system' })
  @IsOptional()
  @IsString()
  requirement?: string;
}
