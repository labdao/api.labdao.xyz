import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name/pseudonym cannot be empty' })
  @IsString({ message: 'First name/pseudonym must be a string' })
  @MaxLength(50, {
    message: 'First name/pseudonym must be less than 50 characters',
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  role?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  affiliation?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @IsEthereumAddress()
  @IsNotEmpty()
  walletAddress: string;

  @IsUrl({}, { message: 'Avatar URL is not valid' })
  @IsNotEmpty({ message: 'Avatar URL cannot be empty' })
  @MaxLength(100, { message: 'Avatar URL must be less than 100 characters' })
  avatarUrl: string;
}
