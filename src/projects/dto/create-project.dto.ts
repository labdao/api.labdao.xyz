import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  goal: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  website?: string;

  @IsString()
  @IsOptional()
  skills?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  numberOfMembers: number;

  @IsString()
  @IsOptional()
  funding?: string;
}
