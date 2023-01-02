import { Body, ConflictException, Controller, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import {v4 as uuidv4} from 'uuid';
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ProjectsService } from "../../projects/services/projects.service";
import { role } from "../../users/role.enum";
import { UsersService } from "../../users/services/users.service";
import { ProjectUsersDto } from "../dto/project-user.dto";
import { ProjectUser } from "../project-users.entity";
import { ProjectUsersService } from "../services/project-users.service";


@Controller("project-users")
@UseGuards(JwtAuthGuard)
export class ProjectUsersController {
  constructor(private readonly projectUsersService: ProjectUsersService,
              private usersService: UsersService, 
              private projectsService: ProjectsService) 
  {}

  @Get()
  async getProjectUser(@Req() req) {
    let me = await this.usersService.findId(req.user.userId);
    if (me.role === role.Employee) {
      //return only projects where user is referringEmployee
      return this.projectUsersService.findAllProjectsUser(me);
    }
    
    let projectUsers = await this.projectUsersService.findAll();
    if (!projectUsers) {
      return [];
    }
    return projectUsers;
  }

  @Post()
  async postProjectUser(@Req() req, @Body() body : ProjectUsersDto) {
    let me = await this.usersService.findId(req.user.userId);
    let user = await this.usersService.findId(body.userId);
    let project = await this.projectsService.findId(body.projectId)
    let newPostUser = new ProjectUsersDto
    newPostUser.projectId = body.projectId
    newPostUser.userId = body.userId
    newPostUser.startDate = new Date(body.startDate)
    newPostUser.endDate = new Date(body.endDate)

    
    if (me.role === "Employee") throw new UnauthorizedException("you are not authorized to create a project user");
    if (!project || !user)throw new NotFoundException("Id not found")
    
    // date check
    let currentProjects = await this.projectUsersService.findAllProjectsUser(user); 
    if (currentProjects.length == 0){
      return await this.projectUsersService.create(newPostUser)
    }
    for (let i = 0; i < currentProjects.length; i++) {
      //console.log("Project -------------------", currentProjects[i].startDate, "--------------", newPostUser.startDate);
      // console.log("Project try ---------------", newPostUser.startDate > currentProjects[i].startDate, "--------------");
      // console.log("Project bleu  ---------------", newPostUser.startDate < currentProjects[i].startDate, "--------------");
      // console.log("Project egal  ---------------", newPostUser.startDate === currentProjects[i].startDate, "--------------");

      // case: 
      // currentProjects[i]      |----------------|
      // newPostUser        |----------------|
      if (newPostUser.startDate <= currentProjects[i].startDate && newPostUser.endDate <= currentProjects[i].endDate && newPostUser.endDate >= currentProjects[i].startDate) {
          throw new ConflictException("the date of the project conflict with another user project");
      }
      // case: 
      // currentProjects[i] |----------------|
      // newPostUser           |----------|
      if (newPostUser.startDate >= currentProjects[i].startDate && newPostUser.endDate <= currentProjects[i].endDate) {
        throw new ConflictException("the date of the project conflict with another user project");
      }
      // case: 
      // currentProjects[i] |----------------|
      // newPostUser               |----------------|
      if (newPostUser.startDate >= currentProjects[i].startDate && newPostUser.endDate >= currentProjects[i].endDate && newPostUser.startDate <= currentProjects[i].endDate){
        throw new ConflictException("the date of the project conflict with another user project");
      }
      // case: 
      // currentProjects[i]     |---------|
      // newPostUser        |----------------|
      if (newPostUser.startDate <= currentProjects[i].startDate && newPostUser.endDate >= currentProjects[i].endDate) {
        throw new ConflictException("the date of the project conflict with another user project");
      }
    }

    return await this.projectUsersService.create(body)
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    let project = await this.projectUsersService.findId(id);
    let me = await this.usersService.findUser(req.user.username);

    if (me.role === role.Employee && project.userId !== me.id) {
      throw new ForbiddenException("you are not authorized to view this project");
    }
    if (!project) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "project not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return project;
  }
}

