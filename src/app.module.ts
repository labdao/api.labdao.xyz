import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { SkillsModule } from './skills/skills.module';
import { HealthModule } from './health/health.module';

// Read runtime environment variables in prod.
// .env files are only used in development
let ignoreEnvFile = false;
if (process.env.NODE_ENV == 'production') {
  ignoreEnvFile = true;
}
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: ignoreEnvFile,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        // Only need .js files because entities are loaded from compiled JS files
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProjectsModule,
    SkillsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
