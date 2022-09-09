import { registerAs } from '@nestjs/config';

export default registerAs('context', () => ({
  environment: process.env.ENV,
}));
