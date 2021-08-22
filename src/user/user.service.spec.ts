import { TokenRepository } from "../token/token.repository";
import { TokenService } from "../token/token.service";
import { RegisterModel } from "./register.model";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import * as env from "dotenv";

env.config();


describe('UserController', () => {
  let userService: UserService;
  let testingEmail: string = "test@test.com";
  let testingPassword: string = "abc";
  
  let wrongEmail: string = "test1@test.com";
  let wrongPassword: string = "abcd";

  let tokenRepository: TokenRepository = new TokenRepository();

  beforeEach(async () => {
    userService = new UserService(new UserRepository(), new TokenService(tokenRepository))
  });

  describe('register', () => {
    it('should register user', async () => {
      let userData = await userService.register(testingEmail, testingPassword);
        expect(userData).toHaveProperty("user.email");
    });
    it("should not register user", async () => {
      await userService.register(testingEmail, testingPassword)
      expect(async () => await userService.register(testingEmail, testingPassword)).toThrowError("User with such email already exists")
    })
  });

  describe('login', () => {
    it("should login user", async () => {
      await userService.register(testingEmail, testingPassword);
      let userData = await userService.login(testingEmail, testingPassword);
      expect(userData).toHaveProperty("user.email");
    })
    it('should not find user', async () => {
      await userService.register(testingEmail, testingPassword);
      expect(async () => await userService.login(wrongEmail, testingPassword)).toThrowError("User is not found");
    })
    it('should not find user', async () => {
      await userService.register(testingEmail, testingPassword);
      expect(async () => await userService.login(testingEmail, wrongPassword)).toThrowError("Password isn't correct");
    })
  })
});
