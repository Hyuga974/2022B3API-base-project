import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import {v4 as uuidv4} from 'uuid';
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/guards/local-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { role } from "../../users/role.enum";
import { ProjectsService } from "../services/projects.service";


@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService, private authService: AuthService) {}
    
  @Get()
  @Roles(role.Admin, role.ProjectManager)
  async findAll(): Promise<any[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.projectsService.findId(id);
  }
}

