import { IsString, IsOptional, IsArray, IsInt, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSolutionDto {
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
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  benefits?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  techStack?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'])
  status?: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
}
