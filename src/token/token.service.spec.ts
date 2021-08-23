import { TokenRepository } from "./token.repository";
import { TokenService } from "./token.service"

describe("TokenService", () => {
    let tokenService: TokenService;
    let testingEmail: string = "test@test.com"
    let testingToken: string = "myToken"
    const secondTestingToken: string = "myToken2"

    beforeEach(() => {
        tokenService = new TokenService(new TokenRepository);
    })

    describe("saveToken", () => {
        it("should add token", () => {
            let userData = tokenService.saveToken(testingEmail, testingToken);
            expect(userData).toHaveProperty("email");
        })
        it("should change token", () => {
            tokenService.saveToken(testingEmail, testingToken);
            let userData = tokenService.saveToken(testingEmail, secondTestingToken);
            expect(userData).toHaveProperty("refreshToken", secondTestingToken);
        })
    })

    describe("generateToken", () => {
        it("check tokens", () => {
            let tokens = tokenService.generateToken(testingEmail);
            expect(tokenService.generateToken(testingEmail)).toBe(tokens);
        })
    })
})