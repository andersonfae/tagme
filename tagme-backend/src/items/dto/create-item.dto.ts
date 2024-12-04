import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  photoUrl?: string; // Adicione este campo
}

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  photoUrl?: string; // Adicione este campo
}
