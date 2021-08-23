import { Module } from '@nestjs/common';
import { TokenRepository } from '../token/token.repository';
import { TokenService } from '../token/token.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, TokenService, TokenRepository],
})
export class UserModule {}
