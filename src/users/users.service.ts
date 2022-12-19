import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let result = null;
    try {
      result = await this.usersRepository.save(createUserDto);
      return result;
    } catch (e) {
      if (/(wallet)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          'Account with this wallet address already exists.',
        );
      }
      return e;
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.checkForUser({ id });
  }

  findByWalletAddress(walletAddress: string): Promise<User> {
    return this.usersRepository.findOneBy({ walletAddress });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.checkForUser({ id });
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.checkForUser({ id });
    await this.usersRepository.delete(id);
  }

  private async checkForUser(userInfo: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: ['projects', 'skills'],
      where: userInfo,
    });
    if (user === null) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
