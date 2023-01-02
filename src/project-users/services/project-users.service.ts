

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../projects/projects.entity';
import { User } from '../../users/users.entity';
import { ProjectUsersDto } from '../dto/project-user.dto';
import { ProjectUser } from '../project-users.entity';

@Injectable()
export class ProjectUsersService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUsersRepository: Repository<ProjectUser>,
  ) {}

  findAll(): Promise<ProjectUser[]> {
    return this.projectUsersRepository.find();
  }

  findId(id: string): Promise<ProjectUser>{
    return this.projectUsersRepository.findOne({ where: { id: id } });
  }

  async findAllProjectsUser(user: User): Promise<ProjectUser[]>{
    return await this.projectUsersRepository.find({ where: {userId : user.id}})
  }

  async findProject(project: Project): Promise<ProjectUser>{
    return this.projectUsersRepository.findOne({ where: {projectId : project.id}})
  }

  //create Project
  async create(project: ProjectUsersDto): Promise<ProjectUser> {
    let p = this.projectUsersRepository.create(project);
    return await this.projectUsersRepository.save(p);
  }

  async remove(id: string): Promise<void> {
    await this.projectUsersRepository.delete(id);
  }
}
