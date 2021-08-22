import { Injectable } from "@nestjs/common";
import {promises, readFileSync} from "fs"
import { TokenModel } from "./token.model";

@Injectable()
export class TokenRepository {
    private tokens: TokenModel[];

    constructor () {
      let JSONobj = readFileSync("tokens.json", "utf-8");
      this.tokens = JSON.parse(JSONobj).tokens;
    }
    
      async add (email: string, refreshToken: string) {
        this.tokens.push(new TokenModel(email, refreshToken))
        this.save()
      }
    
      exists (email: string): boolean {
        return this.tokens.some(token => token.email === email)
      }
    
      async updateToken (email: string, refreshToken: string) {
        this.tokens.forEach(token => {
          if (token.email === email) token.refreshToken = refreshToken
        })
        this.save()
      }
    
      save () {
          let tokens: TokenModel[] = this.tokens
        promises.writeFile('tokens.json', JSON.stringify({ tokens }))
      }
    
      find (refreshToken: string) {
        return this.tokens.find(token => token.refreshToken === refreshToken)
      }
}