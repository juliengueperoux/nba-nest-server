import { DynamicModule, Module, Provider } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Axios from 'axios';

import {
  AXIOS_INSTANCE_TOKEN,
  HTTP_CLIENT_MODULE_ID,
  HTTP_CLIENT_MODULE_OPTIONS,
} from './http-client.constants';
import { HttpClientService } from './http-client.service';
import {
  HttpModuleAsyncOptions,
  HttpClientModuleOptions,
  HttpClientModuleOptionsFactory,
} from './http-client.interfaces';

@Module({
  providers: [
    HttpClientService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: Axios,
    },
  ],
  exports: [HttpClientService],
})
export class HttpClientModule {
  static register(config: HttpClientModuleOptions): DynamicModule {
    return {
      module: HttpClientModule,
      providers: [
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: Axios.create(config),
        },
        {
          provide: HTTP_CLIENT_MODULE_ID,
          useValue: uuid(),
        },
      ],
    };
  }

  static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    return {
      module: HttpClientModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useFactory: (config: HttpClientModuleOptions) => Axios.create(config),
          inject: [HTTP_CLIENT_MODULE_OPTIONS],
        },
        {
          provide: HTTP_CLIENT_MODULE_ID,
          useValue: uuid(),
        },
        ...(options.extraProviders || []),
      ],
    };
  }

  private static createAsyncProviders(
    options: HttpModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: HttpModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_CLIENT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: HTTP_CLIENT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpClientModuleOptionsFactory) =>
        optionsFactory.createHttpOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
