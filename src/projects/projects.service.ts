import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { AppDataSource } from '../config/ormconfig';
//import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.save(createProjectDto);
    const user = await this.usersService.findOne(createProjectDto.userId);
    project.user = user;
    return await this.projectsRepository.save(project);
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
  ): Promise<Project> {
    const project = await this.findProjectByWalletAddress(walletAddress);
    return this.update(project.id, updateProjectDto);
  }

  async findProjectByWalletAddress(walletAddress: string): Promise<Project> {
    const user = await this.usersService.findByWalletAddress(walletAddress);
    return user.projects[0];
  }

  private async checkForProject(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (project === null) {
      throw new NotFoundException('Project not found.');
    }
    return project;
  }
}
