import { TestingUserRepository } from './testing.user.repository';

describe('TokenRepository', () => {
  let userRepository: TestingUserRepository;

  const testingEmail = 'test@test.com';
  const testingPassword = 'password';

  beforeAll(() => {
    userRepository = new TestingUserRepository();
    userRepository.add(testingEmail, testingPassword);
    userRepository.save();
  });

  beforeEach(() => {
    userRepository = new TestingUserRepository();
  });

  it('add', () => {
    const user = userRepository
      .getAll()
      .find((token) => token.email === testingEmail);
    expect(user).toBeTruthy();
  });
  it('find', () => {
    expect(userRepository.find(testingEmail)).toBeTruthy();
  });
  it('esists', () => {
    const extsts: boolean = userRepository
      .getAll()
      .some((tkn) => tkn.email == testingEmail);
    expect(userRepository.exists(testingEmail)).toBe(extsts);
  });

  afterAll(() => {
    userRepository.delete(testingEmail);
  });
});
