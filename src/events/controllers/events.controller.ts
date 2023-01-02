import { Body, ConflictException, Controller, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import {v4 as uuidv4} from 'uuid';
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ProjectsService } from "../../projects/services/projects.service";
import { role } from "../../users/role.enum";
import { UsersService } from "../../users/services/users.service";
import { EventDto } from "../dto/event.dto";
import { Event } from "../events.entity";
import { EventsService } from "../services/event.service";


@Controller("events")
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService,
              private usersService: UsersService, 
              private projectsService: ProjectsService) 
  {}

  @Get()
  async getEvent(@Req() req) {
    let events = await this.eventsService.findAll();
    if (!events) {
      return [];
    }
    return events;
  }

  @Post()
  async postEvent(@Req() req, @Body() body : Event) {
    console.log(body.date);
    if (req.user){
      console.log(req.user.userId);
      return await this.eventsService.create(body, req.user.userId)
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    let project = await this.eventsService.findId(id);
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

