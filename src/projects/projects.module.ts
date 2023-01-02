import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { Project } from './projects.entity';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/users.entity';
import { ProjectUsersService } from '../project-users/services/project-users.service';
import { ProjectUser } from '../project-users/project-users.entity';
import { UsersModule } from '../users/users.module';
import { ProjectUsersModule } from '../project-users/project-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UsersModule, forwardRef(() => ProjectUsersModule),],
  providers: [ProjectsService],
  exports : [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
