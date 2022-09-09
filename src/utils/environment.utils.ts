import { NODE_ENV_PRODUCTION } from 'src/config/constants';

export function isDeployed() {
  return process.env.NODE_ENV === NODE_ENV_PRODUCTION;
}
