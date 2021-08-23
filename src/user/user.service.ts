import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository';
import { hashSync, compareSync } from 'bcrypt';
import { RegisterModel } from './register.model';

@Injectable()
export class UserService {
  constructor(
    readonly userRepository: UserRepository,
    readonly tokenService: TokenService,
  ) {}

  register(email: string, password: string): RegisterModel {
    if (this.userRepository.exists(email))
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword = hashSync(password, 8);
    const user = this.userRepository.add(email, hashPassword);

    const tokens = this.tokenService.generateToken(user.email);
    this.tokenService.saveToken(user.email, tokens.refreshToken);

    return { ...tokens, user };
  }

  login(email: string, password: string) {
    if (!this.userRepository.exists(email))
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);

    const user: UserModel = this.userRepository.find(email);

    const isPassEquals = compareSync(password, user.password);
    if (!isPassEquals)
      throw new HttpException("Password isn't correct", HttpStatus.BAD_REQUEST);

    const tokens = this.tokenService.generateToken(email);
    this.tokenService.saveToken(user.email, tokens.refreshToken);

    return { ...tokens, email };
  }

  saveRepository() {
    this.userRepository.save();
  }
}
