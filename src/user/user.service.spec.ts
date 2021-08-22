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

  beforeEach(async () => {
    userService = new UserService(new UserRepository, new TokenService(new TokenRepository()))
  });

  describe('register', () => {
    it('should register user', async () => {
      let userData: RegisterModel = await userService.register(testingEmail, testingPassword);
        expect(userData).toHaveProperty("user.email", testingEmail);
    });
    it("should not register user", async () => {
      expect(await userService.register(testingEmail, testingPassword)).toThrowError("User with such email already exists")
    })
  });

  describe('login', () => {
    it("should login user", async () => {
      let userData = await userService.login(testingEmail, testingPassword);
      expect(userData).toHaveProperty("user.email", testingEmail);
    })
    it('should not find user', () => {
      expect(userService.login(wrongEmail, testingPassword)).toThrowError("User is not found");
    })
    it('should not find user', () => {
      expect(userService.login(testingEmail, wrongPassword)).toThrowError("Password isn't correct");
    })
  })
});
