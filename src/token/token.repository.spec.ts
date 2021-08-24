import { TestingTokenRepository } from './testing.token.repository';
import { TokenModel } from './token.model';

describe('TokenRepository', () => {
  let tokenRepository: TestingTokenRepository;

  const testingEmail = 'test@test.com';
  const testingToken = 'myToken';
  const secondTestingToken = 'myToken2';

  beforeAll(() => {
    tokenRepository = new TestingTokenRepository();
    tokenRepository.add(testingEmail, testingToken);
    tokenRepository.save();
  });

  beforeEach(() => {
    tokenRepository = new TestingTokenRepository();
  });

  it('add', () => {
    const tkn: TokenModel = tokenRepository
      .getAll()
      .find((token) => token.email === testingEmail);
    expect(tkn).toBeTruthy();
  });
  it('find', () => {
    expect(tokenRepository.find(testingToken)).toBeTruthy();
  });
  it('esists', () => {
    const extsts: boolean = tokenRepository
      .getAll()
      .some((tkn) => tkn.email == testingEmail);
    expect(tokenRepository.exists(testingEmail)).toBe(extsts);
  });
  it('updateToken', () => {
    tokenRepository.updateToken(testingEmail, secondTestingToken);
    tokenRepository.save();
    tokenRepository = new TestingTokenRepository();

    expect(tokenRepository.find(secondTestingToken)).toHaveProperty(
      'email',
      testingEmail,
    );
  });

  afterAll(() => {
    tokenRepository.clear();
  });
});
