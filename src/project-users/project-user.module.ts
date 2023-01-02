import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/users.entity';
import { ProjectUser } from './project-users.entity';
import { ProjectUsersController } from './controllers/project-user.controller';
import { ProjectUsersService } from './services/project-users.service';
import { Project } from '../projects/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]), UsersModule, ProjectsModule],
  providers: [ProjectUsersService],
  exports : [ProjectUsersService],
  controllers: [ProjectUsersController],
})
export class ProjectUsersModule {}
