import { Body, Controller, Get, Post, Request, HttpStatus, HttpCode, HttpException, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { LoginDto, UserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import {v4 as uuidv4} from 'uuid';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get('/')
  findAll(): string {
    return 'This action returns all Users';
  }

  @Post('/auth/sign-up')
  @UsePipes(ValidationPipe)
  async create(@Body() body:UserDto) {
    let newUser : UserDto = {
      id : uuidv4(),
      username : body.username,
      password : body.password,
      email : body.email,
      role : body.role
    }
    return this.usersService.create(newUser)
  }

  // @Post('/auth/login')
  // @UsePipes(ValidationPipe)
  // async login(@Body() body:LoginDto){
  //   let user = this.usersService.login(body)
  //   return user
  // }
  //@UseGuards(JwtAuthGuard)
  // @Post('/auth/login')
  // async login(@Request() req) {
  //   return this.usersService.login(req.user);
  // }
}
