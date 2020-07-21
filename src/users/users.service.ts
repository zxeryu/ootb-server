import { HttpException, Injectable } from "@nestjs/common";
import { filter, times, map } from "lodash";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = map(times(10), (_, index) => {
    return { id: index, name: "user" + index, age: index * 10 + "" };
  });
  getAllUsers() {
    return Promise.resolve(this.users);
  }
  getUser(id: number) {
    const users = filter(this.users, (u) => {
      return u.id === id;
    });
    if (!users || users.length <= 0) {
      throw new HttpException("user not found", 404);
    }

    return Promise.resolve(users[0]);
  }
  addUser(user: CreateUserDto) {
    this.users.push(user);
  }
}
