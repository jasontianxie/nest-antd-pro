/**
 * 创建用户
 */
 import { IsString, IsNotEmpty, IsMobilePhone } from 'class-validator'; 
export class CreateUserDto {
    @IsNotEmpty({
      message: 'name can not be empty'
    })
    @IsString({
      message: 'name must be string'
    })
    readonly name: string;

    @IsNotEmpty({
      message: 'mobile can not be empty'
    })
    @IsMobilePhone('zh-CN')
    readonly mobile: string;

    @IsNotEmpty({
      message: 'password can not be empty'
    })
    readonly password: string;
  }