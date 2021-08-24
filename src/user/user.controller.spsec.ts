import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as env from 'dotenv';
import { TokenService } from '../token/token.service';
import { TokenRepository } from '../token/token.repository';
import { request } from 'express';

env.config();

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, TokenService, TokenRepository],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('login', () => {
    it('should return "Hello World!"', () => {
      //  expect(userController.getHello()).('Hello World!');
    });
  });
});
