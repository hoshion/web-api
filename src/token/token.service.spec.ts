import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';
import * as env from 'dotenv';

env.config();

describe('TokenService', () => {
  let tokenService: TokenService;
  const testingEmail = 'test@test.com';
  const testingToken = 'myToken';
  const secondTestingToken = 'myToken2';

  beforeEach(() => {
    tokenService = new TokenService(new TokenRepository());
  });

  describe('saveToken', () => {
    it('should add token', () => {
      const userData = tokenService.saveToken(testingEmail, testingToken);
      expect(userData).toHaveProperty('email');
    });
    it('should change token', () => {
      tokenService.saveToken(testingEmail, testingToken);
      const userData = tokenService.saveToken(testingEmail, secondTestingToken);
      expect(userData).toHaveProperty('refreshToken', secondTestingToken);
    });
  });

  describe('generateToken', () => {
    it('check tokens', () => {
      const tokens = tokenService.generateToken(testingEmail);
      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });
  });

  it('validateAccessToken', () => {
    const userData = tokenService.generateToken(testingEmail);
    expect(
      tokenService.validateAccessToken(userData.accessToken),
    ).toHaveProperty('email', testingEmail);
  });
});
