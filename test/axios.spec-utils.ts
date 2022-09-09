import { AxiosResponse } from 'axios';

export function generateResponse<T>(
  data: T,
  response?: Partial<AxiosResponse<T>>,
): AxiosResponse<T> {
  const defaultResponse: AxiosResponse<T> = {
    config: {},
    data,
    headers: {},
    status: 200,
    statusText: 'Success',
  };

  return {
    ...defaultResponse,
    ...(response || {}),
  };
}
