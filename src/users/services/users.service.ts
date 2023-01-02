

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { User } from '../users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findMail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  findUser(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  findId(id: string): Promise<User>{
    return this.usersRepository.findOne({ where: { id: id } });
  }

  //create user
  async create(user: UserDto): Promise<User> {
    const newUser = this.usersRepository.create(user)
    return await this.usersRepository.save(newUser);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
