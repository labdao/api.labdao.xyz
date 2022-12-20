import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { AppDataSource } from '../config/ormconfig';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsRepository.save(createProjectDto);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: number): Promise<Project> {
    return this.checkForProject(id);
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.checkForProject(id);
    await this.projectsRepository.update(id, updateProjectDto);
    return this.projectsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.checkForProject(id);
    await this.projectsRepository.delete(id);
  }

  async updateByWalletAddress(
    walletAddress: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<User> {
    const project = await this.findProjectByWalletAddress(walletAddress);
    await this.projectsRepository.update(project.id, updateProjectDto);
    return this.projectsRepository.findOneBy({ project.id });
  }

  findProjectByWalletAddress(walletAddress: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ walletAddress });
    return this.projectsRepository.findOneBy({
      where: { user { id: user.id }},
    });
  }

  private async checkForProject(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (project === null) {
      throw new NotFoundException('Project not found.');
    }
    return project;
  }
}
