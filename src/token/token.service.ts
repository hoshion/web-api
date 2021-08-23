import { Injectable } from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(readonly tokenRepository: TokenRepository) {}

  saveRepository() {
    this.tokenRepository.save();
  }

  saveToken(email: string, refreshToken: any) {
    if (this.tokenRepository.exists(email)) {
      this.tokenRepository.updateToken(email, refreshToken);
    } else this.tokenRepository.add(email, refreshToken);

    return { email, refreshToken };
  }

  generateToken(email: string): { accessToken: string; refreshToken: string } {
    const accessToken: string = sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken: string = sign(
      { email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '30m' },
    );

    return { accessToken, refreshToken };
  }

  generateAccessToken(email: string) {
    return sign(email, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
  }

  validateAccessToken(token: string): JwtPayload | string {
    const userData = verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  }
}
