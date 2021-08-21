import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(readonly tokenService: TokenService) {}

  use(req: Request, res: Response, next: NextFunction){
    
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) 
      throw createException();

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken)
      throw createException();

    const userData = this.tokenService.validateAccessToken(accessToken)
    if (!userData) 
      throw createException();

    next();
  }
}

function createException(): HttpException {
  return new HttpException("User is not authorized", HttpStatus.UNAUTHORIZED);
}
