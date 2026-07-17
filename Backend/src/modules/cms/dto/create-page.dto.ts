import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, Matches } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ example: 'About AESCION', description: 'Page title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'about', description: 'URL-friendly slug' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase alphanumeric with hyphens' })
  slug!: string;

  @ApiPropertyOptional({ example: 'Learn about our company', description: 'Page description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'], default: 'DRAFT' })
  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'])
  status?: string;

  @ApiPropertyOptional({ example: 'About AESCION | Enterprise Software', description: 'SEO Meta Title' })
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional({ example: 'AESCION builds enterprise software solutions', description: 'SEO Meta Description' })
  @IsOptional()
  @IsString()
  metaDesc?: string;
}
