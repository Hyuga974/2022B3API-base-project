

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findId(id: string): Promise<Project>{
    return this.projectsRepository.findOne({ where: { id: id } });
  }

  findUser(id: string): Promise<Project>{
    return this.projectsRepository.findOne({ where: { referringEmployeeId: id}})
  }

  //create Project
  async create(project: Project): Promise<Project> {
    return await this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
