import { Test, TestingModule } from '@nestjs/testing';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpClientService } from './http-client.service';
import { AXIOS_INSTANCE_TOKEN } from './http-client.constants';
import { generateResponse } from 'test/axios.spec-utils';

describe('HttpClientService', () => {
  let service: HttpClientService;
  const axiosInstance: AxiosInstance = Axios.create();
  const defaultResponse: AxiosResponse<boolean> = generateResponse(true);
  const emptyConfig: AxiosRequestConfig = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpClientService,
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useValue: axiosInstance,
        },
      ],
    }).compile();

    service = module.get<HttpClientService>(HttpClientService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('request', () => {
    it('Should call the axios request method when called.', () => {
      const config: AxiosRequestConfig = {
        url: 'https://tesla.com/car-price',
        method: 'GET',
      };
      const response: AxiosResponse<number> = generateResponse(100);

      jest.spyOn(axiosInstance, 'request').mockResolvedValue(response);

      return service.request(config).then((result) => {
        expect(axiosInstance.request).toHaveBeenCalledWith(config);
        expect(result).toBe(response);
      });
    });
  });

  describe('get', () => {
    it('Should call the axios get method when called.', () => {
      const url = 'https://esn-de-france.fr/meilleur-salaire';
      const response: AxiosResponse<number> = generateResponse(1400);

      jest.spyOn(axiosInstance, 'get').mockResolvedValue(response);

      return service.get(url, emptyConfig).then((result) => {
        expect(axiosInstance.get).toHaveBeenCalledWith(url, emptyConfig);
        expect(result).toBe(response);
      });
    });
  });

  describe('delete', () => {
    it('Should call the axios delete method when called.', () => {
      const url = 'https://twitter.com/biden-and-macron';
      const response: AxiosResponse<string> = generateResponse('Hey Joe !');

      jest.spyOn(axiosInstance, 'delete').mockResolvedValue(response);

      return service.delete(url, emptyConfig).then((result) => {
        expect(axiosInstance.delete).toHaveBeenCalledWith(url, emptyConfig);
        expect(result).toBe(response);
      });
    });
  });

  describe('head', () => {
    it('Should call the axios head method when called.', () => {
      const url = 'https://abz.com';

      jest.spyOn(axiosInstance, 'head').mockResolvedValue(defaultResponse);

      return service.head(url, emptyConfig).then((result) => {
        expect(axiosInstance.head).toHaveBeenCalledWith(url, emptyConfig);
        expect(result).toBe(defaultResponse);
      });
    });
  });

  describe('post', () => {
    it('Should call the axios post method when called.', () => {
      const url = 'https://ping-pong-tournament.com/matches';
      const data = { winner: 'A', looser: 'M', score: '11 - 2' };
      const response: AxiosResponse<object> = generateResponse({});

      jest.spyOn(axiosInstance, 'post').mockResolvedValue(response);

      return service.post(url, data, emptyConfig).then((result) => {
        expect(axiosInstance.post).toHaveBeenCalledWith(url, data, emptyConfig);
        expect(result).toBe(response);
      });
    });
  });

  describe('put', () => {
    it('Should call the axios put method when called.', () => {
      const url = 'https://ping-pong-tournament.com/matches/123';
      const data = { winner: 'M', looser: 'A', score: '7 - 11' };
      const response: AxiosResponse<string> = generateResponse('NON');

      jest.spyOn(axiosInstance, 'put').mockResolvedValue(response);

      return service.put(url, data, emptyConfig).then((result) => {
        expect(axiosInstance.put).toHaveBeenCalledWith(url, data, emptyConfig);
        expect(result).toBe(response);
      });
    });
  });

  describe('patch', () => {
    it('Should call the axios patch method when called.', () => {
      const url = 'https://users.com/1234';
      const data = { weight: 10 };
      const response: AxiosResponse<boolean> = generateResponse(false);

      jest.spyOn(axiosInstance, 'patch').mockResolvedValue(response);

      return service.patch(url, data, emptyConfig).then((result) => {
        expect(axiosInstance.patch).toHaveBeenCalledWith(
          url,
          data,
          emptyConfig,
        );
        expect(result).toBe(response);
      });
    });
  });

  describe('axiosRef', () => {
    it('Should return the axios instance when called.', () => {
      expect(service.axiosRef).toBe(axiosInstance);
    });
  });
});
