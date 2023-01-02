import { IsEmail, IsNotEmpty, Length } from "class-validator"


export class ProjectDto {  
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  referringEmployeeId!: string; //au format uuidv4
}
