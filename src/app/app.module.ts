import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { getDeploymentEnv, isDeployed } from '../utils/environment.utils';
import { join } from 'path';
import servicesConfig from '../config/services/services.config';
import authenticationConfig from '../config/authentication/authentication.config';
import contextConfig from '../config/context/context.config';
import { validate } from 'src/config/configuration.validation';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';

const configFile = `${getDeploymentEnv()}.env`;
const configPath = join(
  __dirname,
  isDeployed() ? '..' : '../..',
  '/env-files/',
  configFile,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: configPath,
      load: [servicesConfig, authenticationConfig, contextConfig],
      isGlobal: true,
      cache: true,
      validate,
    }),
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    TeamModule,
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
