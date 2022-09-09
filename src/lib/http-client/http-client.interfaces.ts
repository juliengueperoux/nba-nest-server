import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

export type HttpClientModuleOptions = AxiosRequestConfig;

export interface HttpClientModuleOptionsFactory {
  createHttpOptions():
    | Promise<HttpClientModuleOptions>
    | HttpClientModuleOptions;
}

export interface HttpModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<HttpClientModuleOptionsFactory>;
  useClass?: Type<HttpClientModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpClientModuleOptions> | HttpClientModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
