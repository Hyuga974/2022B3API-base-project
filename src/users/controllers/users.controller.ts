import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import {v4 as uuidv4} from 'uuid';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/guards/local-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { UserDto } from "../dto/user.dto";
import { UsersService } from "../services/users.service";
import { User } from "../users.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {}
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

  @Post('auth/login')
  async login(@Body() body) {
    let user = await this.usersService.findMail(body.email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "email or password is incorrect",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (user.password !== body.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "email or password is incorrect",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
 
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProlfile(@Req() req) {
    // return user profile without password via jwt token
    let username = req.user.username;
    return this.usersService.findUser(username);
  }
  
  @Get()
  async findAll(): Promise<any[]> {
    return this.usersService.findAll();
  }
}

