import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    let result = null;
    try {
      result = await this.skillsRepository.save(createSkillDto);
      return result;
    } catch (e) {
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException('This skill already exists');
      }
      return e;
    }
  }

  findAll(): Promise<Skill[]> {
    return this.skillsRepository.find();
  }

  findOne(id: number): Promise<Skill> {
    return this.skillsRepository.findOneBy({ id });
  }

  async search(text: string): Promise<Skill[]> {
    const users = await this.skillsRepository
      .createQueryBuilder('skill')
      .orderBy('levenshtein(lower(:text), lower(skill.name))', 'ASC')
      .limit(10)
      .setParameters({ text })
      .getMany();

    return users;
  }
}
