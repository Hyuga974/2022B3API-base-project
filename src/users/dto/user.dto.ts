import { IsEmail, IsNotEmpty, Length } from "class-validator"
import { role } from "../role.enum"


export class UserDto {
  id: string
  
  @Length(3)
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @Length(8)
  @IsNotEmpty()
  password: string
  
  role: role
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}
