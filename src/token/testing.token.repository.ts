import { TokenRepository } from "./token.repository";

export class TestingTokenRepository extends TokenRepository {
    getAll(){
        return this.tokens;
    }
}