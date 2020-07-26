import { HttpException, Injectable } from "@nestjs/common";
import { filter, times, map, slice, size } from "lodash";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = map(times(100), (_, index) => {
    return { id: index, name: "user" + index, age: index * 10 + "" };
  });
  getAllUsers(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    return Promise.resolve({
      data: slice(this.users, start, start + pageSize),
      total: size(this.users),
    });
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
