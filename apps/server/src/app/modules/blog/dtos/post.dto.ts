// import { IsString, IsOptional, IsInt } from 'class-validator';

import { ContentSection } from '@server/types/post.types';
import { IsOptional, IsString } from 'class-validator';

export class Post {
  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  recipeUID?: string;

  @IsString()
  @IsOptional()
  contentSections?: ContentSection[];

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  img?: string;

  @IsString()
  @IsOptional()
  excerpt?: string;
}
