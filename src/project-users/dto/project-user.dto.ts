import { IsDate, IsEmail, IsNotEmpty, Length } from "class-validator"


export class ProjectUsersDto {  
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsDate()
  startDate: Date

  @IsNotEmpty()
  @IsDate()
  endDate: Date

  @IsNotEmpty()
  projectId: string

  @IsNotEmpty()
  userId: string
}
