import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterModel } from './register.model';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('login')
  login(@Res() response: Response, @Param() params: UserDTO) {
    const userData = this.userService.login(params.email, params.password);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: THIRTY_DAYS,
      httpOnly: true,
    });
    this.userService.saveRepository();
    return userData;
  }

  @Get('register')
  register(@Res() response: Response, @Param() params: UserDTO) {
    const userData: RegisterModel = this.userService.register(
      params.email,
      params.password,
    );
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: THIRTY_DAYS,
      httpOnly: true,
    });
    this.userService.saveRepository();
    return userData;
  }
}
