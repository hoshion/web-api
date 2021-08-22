import { TokenRepository } from "../token/token.repository";
import { TokenService } from "../token/token.service";
import { RegisterModel } from "./register.model";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import * as env from "dotenv";

env.config();


describe('UserController', () => {
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService(new UserRepository, new TokenService(new TokenRepository()))
  });

  describe('register', () => {
    it('should register user', async () => {
      let userData: RegisterModel = await userService.register("mwadman2018@gmail.com", "Nhjzy2019");
        expect(userData).toHaveProperty("user.email", "mwadman2018@gmail.com");
    });
  });
});
