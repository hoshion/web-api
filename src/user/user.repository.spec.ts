import { TestingUserRepository } from "./testing.user.repository";
import { UserModel } from "./user.model";


describe("TokenRepository", () => {
    let userRepository: TestingUserRepository;

    const testingEmail: string = "test@test.com"
    const testingPassword: string = "password";

    beforeAll(() => {
        userRepository = new TestingUserRepository();
        userRepository.add(testingEmail, testingPassword)
        userRepository.save();
    })

    beforeEach(() => {
        userRepository = new TestingUserRepository();
    })

    it("add", () => {
        let user = userRepository.getAll().find((token) => token.email === testingEmail);
        expect(user).toBeTruthy();
    })
    it("find", () => {
        expect(userRepository.find(testingEmail)).toBeTruthy();
    })
    it("esists", () => {
        let extsts: boolean = userRepository.getAll().some(tkn => tkn.email == testingEmail);
        expect(userRepository.exists(testingEmail)).toBe(extsts);
    })

    afterAll(() => {
        userRepository.delete(testingEmail)
    })

})