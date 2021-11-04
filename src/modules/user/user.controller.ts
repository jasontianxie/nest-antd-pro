import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '../../libs/pipes/params-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('sayhi')
  async sayhi(): Promise<string> {
    return '你好，世界';
  }

  @Post('create')
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.create(user);
  }
}
