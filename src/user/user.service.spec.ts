import { TokenRepository } from '../token/token.repository';
import { TokenService } from '../token/token.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as env from 'dotenv';

env.config();

describe('UserController', () => {
  let userService: UserService;
  const testingEmail = 'test@test.com';
  const testingPassword = 'abc';

  const wrongEmail = 'test1@test.com';
  const wrongPassword = 'abcd';

  beforeEach(async () => {
    userService = new UserService(
      new UserRepository(),
      new TokenService(new TokenRepository()),
    );
  });

  describe('register', () => {
    it('should register user', () => {
      const userData = userService.register(testingEmail, testingPassword);
      expect(userData).toHaveProperty('user.email');
    });
    it('should not register user', async () => {
      userService.register(testingEmail, testingPassword);
      expect(() =>
        userService.register(testingEmail, testingPassword),
      ).toThrowError('User with such email already exists');
    });
  });

  describe('login', () => {
    it('should login user', () => {
      userService.register(testingEmail, testingPassword);
      const userData = userService.login(testingEmail, testingPassword);
      expect(userData).toHaveProperty('email');
    });
    it('should not find user', () => {
      expect(() => userService.login(wrongEmail, testingPassword)).toThrowError(
        'User is not found',
      );
    });
    it('should check wrong password', () => {
      userService.register(testingEmail, testingPassword);
      expect(() => userService.login(testingEmail, wrongPassword)).toThrowError(
        "Password isn't correct",
      );
    });
  });
});
