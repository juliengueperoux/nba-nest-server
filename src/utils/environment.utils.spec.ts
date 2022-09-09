import { NODE_ENV_PRODUCTION } from 'src/config/constants';
import { isDeployed } from 'src/utils/environment.utils';

describe('Environment utils', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = { ...originalEnv };
  });

  describe('isDeployed', () => {
    it('Should return false when "NODE_ENV" environment variable is not "production".', () => {
      process.env.NODE_ENV = 'notProduction';

      expect(isDeployed()).toBe(false);
    });

    it('Should return true when "NODE_ENV" environment variable is "production".', () => {
      process.env.NODE_ENV = NODE_ENV_PRODUCTION;

      expect(isDeployed()).toBe(true);
    });
  });
});
