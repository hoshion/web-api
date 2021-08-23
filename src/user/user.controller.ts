import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterModel } from './register.model';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('login')
  async login(@Res() response: Response, @Param() params: UserDTO) {
    const userData = await this.userService.login(
      params.email,
      params.password,
    );
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: THIRTY_DAYS,
      httpOnly: true,
    });
    return userData;
  }

  @Get('register')
  async register(@Res() response: Response, @Param() params: UserDTO) {
    const userData: RegisterModel = await this.userService.register(
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
