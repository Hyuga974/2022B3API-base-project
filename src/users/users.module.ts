import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service'; 
import { UsersController } from './controllers/users.controller';
import { User } from './users.entity';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Project } from '../projects/projects.entity';
import { ProjectsController } from '../projects/controllers/projects.controller';
import { ProjectsService } from '../projects/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,AuthService, JwtService, JwtStrategy],
  exports : [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
