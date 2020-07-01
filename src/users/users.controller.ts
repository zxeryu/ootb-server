import { Controller, Get, HttpStatus, Post, Response,Param,Body } from '@nestjs/common';
import {CreateUserDto} from './dto/CreateUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService:UsersService) {
  }


  @Get()
  async getAllUsers(@Response() res){
    console.log('get users')
    try {
      const users = await this.usersService.getAllUsers();
       res.status(HttpStatus.OK).json(users);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({});;
    }
  }

  @Get('/:id')
  async getUser(@Param('id') id,@Response() res){
    console.log('get user',id);
    try {
      const user = await this.usersService.getUser(id);
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({});
    }
  }

  @Post()
  addUser(@Response() res,@Body() createUserDto:CreateUserDto){
    console.log('add users',createUserDto)
    this.usersService.addUser(createUserDto);
    res.status(HttpStatus.OK).json({});
  }

}
