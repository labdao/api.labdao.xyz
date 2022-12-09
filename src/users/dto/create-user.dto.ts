import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name/pseudonym cannot be empty' })
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  affiliation?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsEthereumAddress({ message: 'Wallet address is not valid' })
  @IsNotEmpty({ message: 'Wallet address cannot be empty' })
  walletAddress: string;

  @IsUrl({}, { message: 'Avatar URL is not valid' })
  @IsNotEmpty({ message: 'Avatar URL cannot be empty' })
  avatarUrl: string;
}
