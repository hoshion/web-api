import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository {
  private users: UserModel[];

  constructor() {
    const JSONobj = readFileSync('users.json', 'utf-8');
    this.users = JSON.parse(JSONobj).users;
  }

  add(email: string, password: string) {
    this.users.push(new UserModel(email, password));
    this.save();
    return { email };
  }

  exists(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  save(): void {
    writeFileSync('users.json', JSON.stringify({ users: this.users }));
  }

  find(email: string): UserModel {
    return this.users.find((user) => user.email === email);
  }
}
