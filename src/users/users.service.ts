import { HttpException, Injectable } from '@nestjs/common';
import {filter} from 'lodash';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  private users:CreateUserDto[]=[
    {id:0,name:'zx',age:'20'},
    {id:1,name:'xiao',age:'1'}
  ];
  getAllUsers(){
    return Promise.resolve(this.users);
  }
  getUser(id:number){
    const users = filter(this.users,(u)=>{
      return u.id == id;
    });
    if(!users || users.length<=0){
      throw new HttpException('user not found',404);
    }

    return Promise.resolve(users[0]);
  }
  addUser(user:CreateUserDto){
    this.users.push(user);
  }
}
