import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchSkillsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  query: string;
}
