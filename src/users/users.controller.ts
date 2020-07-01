import { Controller, Get, HttpStatus, Post, Response, Param, Body, HttpException } from '@nestjs/common';
import {CreateUserDto} from './dto/CreateUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService:UsersService) {
  }


  @Get()
  async getAllUsers(@Response() res){
    try {
      const users = await this.usersService.getAllUsers();
       res.status(HttpStatus.OK).json(users);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({});
    }
  }

  @Get('/:id')
  async getUser(@Param('id') id,@Response() res){
    try {
      const user = await this.usersService.getUser(id);
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      throw new HttpException('user not found',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  addUser(@Response() res,@Body() createUserDto:CreateUserDto){
    this.usersService.addUser(createUserDto);
    res.status(HttpStatus.OK).json({});
  }

}
