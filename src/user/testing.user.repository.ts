import { UserRepository } from './user.repository';

export class TestingUserRepository extends UserRepository {
  getAll() {
    return this.users;
  }
}
