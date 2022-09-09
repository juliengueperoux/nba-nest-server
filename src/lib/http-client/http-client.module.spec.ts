import { DynamicModule } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Axios from 'axios';

import {
  HttpClientModuleOptions,
  HttpClientModuleOptionsFactory,
} from './http-client.interfaces';
import { HttpClientModule } from './http-client.module';
import {
  AXIOS_INSTANCE_TOKEN,
  HTTP_CLIENT_MODULE_ID,
  HTTP_CLIENT_MODULE_OPTIONS,
} from './http-client.constants';

jest.mock('axios');
jest.mock('uuid');

describe('HttpClientModule', () => {
  const httpOptions: HttpClientModuleOptions = {
    baseURL: 'http://url',
    headers: {
      'Content-type': 'application/json',
    },
  };

  class HttpOptionsFactory implements HttpClientModuleOptionsFactory {
    createHttpOptions():
      | Promise<HttpClientModuleOptions>
      | HttpClientModuleOptions {
      return httpOptions;
    }
  }

  let module: DynamicModule;
  const mockedUUID = 'uuid';

  beforeEach(() => {
    jest.spyOn(Axios, 'create');
    (uuid as jest.Mock).mockReturnValue(mockedUUID);
  });

  describe('register', () => {
    beforeEach(() => {
      module = HttpClientModule.register(httpOptions);
    });

    it('Should create a valid module instance.', () => {
      expect(module).toBeDefined();
    });

    it('Should provide an axios instance.', () => {
      expect(Axios.create).toHaveBeenCalledWith(httpOptions);
      expect(module.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: AXIOS_INSTANCE_TOKEN,
          }),
        ]),
      );
    });

    it('Should provide an uuid for the module.', () => {
      expect(module.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: HTTP_CLIENT_MODULE_ID,
            useValue: mockedUUID,
          }),
        ]),
      );
    });
  });

  describe('registerAsync', () => {
    beforeEach(() => {
      module = HttpClientModule.registerAsync({
        useExisting: HttpOptionsFactory,
      });
    });

    it('Should create a valid module instance', () => {
      expect(module).toBeDefined();
    });

    it('Should provide a http module options instance.', () => {
      expect(module.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: HTTP_CLIENT_MODULE_OPTIONS,
          }),
        ]),
      );
    });

    it('Should provide an axios instance.', () => {
      expect(module.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: AXIOS_INSTANCE_TOKEN,
          }),
        ]),
      );
    });

    it('Should provide a unique module id.', () => {
      expect(module.providers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            provide: HTTP_CLIENT_MODULE_ID,
            useValue: mockedUUID,
          }),
        ]),
      );
    });
  });
});
