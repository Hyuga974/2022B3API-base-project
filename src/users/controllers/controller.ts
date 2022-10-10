import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../dto/entity';

@Controller('users')
export class CatsController {
  @Post('users/auth/sign-up')
  create(@Body() newUser : User) {
    return newUser;
  }

  @Get()
  findAll(): string {
    return 'This action returns all Users';
  }
}
