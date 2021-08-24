import { TestingTokenRepository } from "./testing.token.repository";
import { TokenModel } from "./token.model";
import { TokenRepository } from "./token.repository"

describe("TokenRepository", () => {
    let tokenRepository: TestingTokenRepository;
    let tokens: TokenModel[];

    const testingEmail: string = "test@test.com"
    const testingToken: string = "myToken";
    const secondTestingToken: string = "myToken2"

    beforeAll(() => {
        tokenRepository = new TestingTokenRepository();
        tokenRepository.add(testingEmail, testingToken)
        tokenRepository.save();
    })

    beforeEach(() => {
        tokenRepository = new TestingTokenRepository();
    })

    it("add", () => {
        let tkn: TokenModel = tokenRepository.getAll().find((token) => token.email === testingEmail);
        expect(tkn).toBeTruthy();
    })
    it("find", () => {
        expect(tokenRepository.find(testingToken)).toBeTruthy();
    })
    it("esists", () => {
        let extsts: boolean = tokenRepository.getAll().some(tkn => tkn.email == testingEmail);
        expect(tokenRepository.exists(testingEmail)).toBe(extsts);
    })
    it("updateToken", () => {
        tokenRepository.updateToken(testingEmail, secondTestingToken);
        tokenRepository.save();
        tokenRepository = new TestingTokenRepository();

        expect(tokenRepository.find(secondTestingToken)).toHaveProperty("email", testingEmail);
    })


    afterAll(() => {
        tokenRepository.clear();
    })
})