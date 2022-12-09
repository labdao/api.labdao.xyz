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
  @MaxLength(50, { message: 'Last name must be less than 50 characters' })
  lastName?: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @MaxLength(50, { message: 'Email must be less than 50 characters' })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Role must be less than 50 characters' })
  role?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Affiliation must be less than 50 characters' })
  affiliation?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'City must be less than 100 characters' })
  city?: string;

  @IsEthereumAddress({ message: 'Wallet address is not valid' })
  @IsNotEmpty({ message: 'Wallet address cannot be empty' })
  walletAddress: string;

  @IsUrl({}, { message: 'Avatar URL is not valid' })
  @IsNotEmpty({ message: 'Avatar URL cannot be empty' })
  @MaxLength(100, { message: 'Avatar URL must be less than 100 characters' })
  avatarUrl: string;
}
