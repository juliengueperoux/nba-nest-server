import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { getDeploymentEnv, isDeployed } from '../utils/environment.utils';
import { join } from 'path';
import servicesConfig from '../config/services/services.config';
import authenticationConfig from '../config/authentication/authentication.config';
import contextConfig from '../config/context/context.config';
import { validate } from 'src/config/configuration.validation';

const configFile = `${getDeploymentEnv()}.env`;
const configPath = join(
  __dirname,
  isDeployed() ? '..' : '../..',
  '/env-files/',
  configFile,
);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    ConfigModule.forRoot({
      envFilePath: configPath,
      load: [servicesConfig, authenticationConfig, contextConfig],
      isGlobal: true,
      cache: true,
      validate,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
