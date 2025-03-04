import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthService } from './auth/services/auth.service';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { ProjectUsersModule } from './project-users/project-user.module';
import { ProjectUser } from './project-users/project-users.entity';
import { Project } from './projects/projects.entity';
import { ProjectsModule } from './projects/projects.module';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { Event } from './events/events.entity'
import { EventModule } from './events/event.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUser, Event],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProjectsModule,
    ProjectUsersModule,
    EventModule,
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
