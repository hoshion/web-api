import { Injectable } from '@nestjs/common';
import { promises, readFileSync, writeFileSync } from 'fs';
import { TokenModel } from './token.model';

@Injectable()
export class TokenRepository {
  private tokens: TokenModel[];

  constructor() {
    const JSONobj = readFileSync('tokens.json', 'utf-8');
    this.tokens = JSON.parse(JSONobj).tokens;
  }

  add(email: string, refreshToken: string) {
    this.tokens.push(new TokenModel(email, refreshToken));
  }

  exists(email: string): boolean {
    return this.tokens.some((token) => token.email === email);
  }

  updateToken(email: string, refreshToken: string) {
    this.tokens.forEach((token) => {
      if (token.email === email) token.refreshToken = refreshToken;
    });
  }

  save() {
    writeFileSync('tokens.json', JSON.stringify({ tokens: this.tokens }));
  }

  clear() {
    writeFileSync("tokens.json", JSON.stringify({ tokens: []}))
  }

  find(refreshToken: string) {
    return this.tokens.find((token) => token.refreshToken === refreshToken);
  }
}
