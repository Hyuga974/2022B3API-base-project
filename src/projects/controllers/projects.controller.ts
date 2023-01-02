import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import {v4 as uuidv4} from 'uuid';
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ProjectUsersService } from "../../project-users/services/project-users.service";
import { role } from "../../users/role.enum";
import { UsersService } from "../../users/services/users.service";
import { ProjectDto } from "../dto/project.dto";
import { Project } from "../projects.entity";
import { ProjectsService } from "../services/projects.service";


@Controller("projects")
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService,
              private usersService: UsersService,
              private projectUsersService: ProjectUsersService) 
  {}
  
  @Post('/')
  @Roles(role.Admin)
  @UsePipes(ValidationPipe)
  async create(@Req() req, @Body() createdProjectDto:ProjectDto) {
    let user = await this.usersService.findUser(req.user.username);
    let project : ProjectDto = {
      name: createdProjectDto.name,
      referringEmployeeId : createdProjectDto.referringEmployeeId, 
    }
    let referringUser = await this.usersService.findId(project.referringEmployeeId)
    if (referringUser.role === role.Employee || user.role !== role.Admin){
      throw new HttpException(
        {
          status: 401,
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
    return this.projectsService.create(project)
  }

  @Get('/')
  async getProject(@Req() req){
    let me = await  this.usersService.findId(req.user.userId)
    if (me.role == role.Employee){
      let projects = await this.projectUsersService.findAllProjectsUser(me);
      if (!projects){
        return [];
      }
      // recupérer tout les projects !!
      var myProjects: Project[] = await Promise.all(projects.map(async (item): Promise<Project> => {
        return await this.projectsService.findId(item.projectId)
      }));
      return myProjects;
    }
    let projects = await this.projectUsersService.findAll()
    if (!projects){
      return [];
    }
    return projects
  }

  // @Get('/')
  // @Roles(role.Admin, role.ProjectManager)
  // async findAll(@Req() req){
  //   let allprojects = await this.projectUsersService.findAll();
  //   if (allprojects.length > 0){
  //     return allprojects
  //   } else {
  //     return [];
  //   }
  // }

  // @Get('/')
  // @Roles(role.Employee)
  // async findAllMe(@Req() req){
  //   console.log("--------------------", req)
  //   return await this.projectUsersService.findAllProjectsUser(req.user.id);
  // }

  // @Get()
  // tryFindAll(@Req() req) : Promise<Project[]>{
  //   if (req.user.role === role.Employee){
  //     return this.projectsService.findAll();
  //   }
  //   if (req.user.role === role.Admin || req.user.role === role.ProjectManager){
  //     return this.projectsService.findProjectsUser(req.user.id);
  //   }
  //   console.log(req, "--------------------------------")  
  // }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    let project = await this.projectsService.findId(id)
    if(!project){
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Project not found",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    let user = await this.usersService.findUser(req.user.username);
    let projectUSer = await this.projectUsersService.findProject(project);
    if (!projectUSer) throw new ForbiddenException()
    if(user.role == role.Employee && user.id !== projectUSer.userId)throw new ForbiddenException()
    return project;
  }
}

