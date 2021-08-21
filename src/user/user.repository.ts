import { Injectable } from "@nestjs/common";
import {promises} from "fs"
import { UserModel } from "./user.model";

@Injectable()
export class UserRepository {
    private users: UserModel[];

    constructor () {
        promises
          .readFile('users.json', 'utf-8')
          .then(
            (analyticsJSON) =>
              (this.users = JSON.parse(analyticsJSON).users)
          );
    }
  
  add (email: string, password: string) {
    this.users.push(new UserModel(email, password))
    this.save()
    return { email }
  }

  exists (email: string): boolean {
    return this.users.some(user => user.email === email)
  }

  save (): void {
    let users: UserModel[] = this.users;
    promises.writeFile('users.json', JSON.stringify({ users }))
  }

  find (email: string): UserModel {
    return this.users.find(user => user.email === email)
  }

}