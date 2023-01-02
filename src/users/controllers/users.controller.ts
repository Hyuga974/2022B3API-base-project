import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import {v4 as uuidv4} from 'uuid';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/guards/local-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { UserDto } from "../dto/user.dto";
import { UsersService } from "../services/users.service";
import { User } from "../users.entity";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {}
  @Post('/auth/sign-up')
  @UsePipes(ValidationPipe)
  async create(@Body() CreatedUserDto:UserDto): Promise<User> {
    // let newUser : UserDto = {
    //   id : uuidv4(),
    //   username : CreatedUserDto.username,
    //   password : CreatedUserDto.password,
    //   email : CreatedUserDto.email,
    //   role : CreatedUserDto.role
    // }
    return this.usersService.create(CreatedUserDto)
  }

  @Post('auth/login')
  async login(@Body() body) {
    let user = await this.usersService.findMail(body.email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "email is incorrect",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (user.password !== body.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "password is incorrect",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
 
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Req() req) {
    // return user profile without password via jwt token
    let username = req.user.username;
    return this.usersService.findUser(username);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const reg = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
    if (!reg.test(id)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Invalid id"
        },
        
        HttpStatus.BAD_REQUEST,
      )
    }
    let user = await this.usersService.findId(id);
    if (user === null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}

