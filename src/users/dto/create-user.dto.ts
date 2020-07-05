import { IsInt, IsString } from 'class-validator';

export class CreateUserDto{
  @IsInt()
  readonly id:number;
  @IsString()
  readonly name:string;
  @IsString()
  readonly age:string;
}
