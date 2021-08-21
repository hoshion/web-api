import { Injectable } from "@nestjs/common";
import jwt, { JwtPayload } from "jsonwebtoken"
import { TokenRepository } from "./token.repository";

@Injectable()
export class TokenService{
  constructor(readonly tokenRepository: TokenRepository) {}

  saveToken(email: string, refreshToken: any) {
    if (this.tokenRepository.exists(email)) {
      this.tokenRepository.updateToken(email, refreshToken)
    } else this.tokenRepository.add(email, refreshToken)

    return { email, refreshToken }
  }

  generateToken(email: string): { accessToken: string, refreshToken: string} {
      
    const accessToken: string = jwt.sign(email, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken: string = this.generateAccessToken(email);

    return { accessToken, refreshToken }
  }

  generateAccessToken(email: string) {
    return jwt.sign(email, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
  }

  validateAccessToken (token: string): JwtPayload | string{
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        return userData
    }
}