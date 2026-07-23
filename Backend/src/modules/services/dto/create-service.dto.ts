import { IsString, IsOptional, IsArray, IsInt, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  slug!: string;

  @ApiProperty()
  @IsString()
  shortDescription!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  features?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'])
  status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaDesc?: string;
}
