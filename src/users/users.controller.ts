import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Response,
  Param,
  Body,
  HttpException,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UserValidationPipe } from "./pipe/user-validate.pipe";
import { CustomParseIntPipe } from "./pipe/custom-parse-int.pipe";
import { RolesGuard } from "../guards/roles.guard.";
import { Roles } from "../decorator/roles.decorator";
import { LoggingInterceptor } from "../interceptor/logging.interceptor";
import { TransformInterceptor } from "../interceptor/transform.interceptor";

@Controller("users")
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @Roles("admin")
  async getAllUsers(@Response() res) {
    try {
      const users = await this.usersService.getAllUsers();
      res.status(HttpStatus.OK).json(users);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({});
    }
  }

  @Get("testTransformInterceptor")
  @UseInterceptors(TransformInterceptor)
  async testTransformInterceptor() {
    return "test response";
  }

  @Get("/:id")
  async getUser(@Param("id", new CustomParseIntPipe()) id, @Response() res) {
    try {
      const user = await this.usersService.getUser(id);
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      throw new HttpException("user not found", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UsePipes(UserValidationPipe)
  addUser(@Response() res, @Body() createUserDto: CreateUserDto) {
    this.usersService.addUser(createUserDto);
    res.status(HttpStatus.OK).json({});
  }
}
