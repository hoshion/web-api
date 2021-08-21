import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { UserService } from './user/user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('login', () => {
    it('should return "Hello World!"', () => {
      //  expect(userController.getHello()).('Hello World!');
    });
  });
});
