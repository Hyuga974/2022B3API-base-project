import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/users.entity';
import { Event } from './events.entity';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/event.service';
import { Project } from '../projects/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectUsersModule } from '../project-users/project-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule, ProjectsModule, ProjectUsersModule],
  providers: [EventsService],
  exports:[EventsService],
  controllers: [EventsController],
})
export class EventModule {}
