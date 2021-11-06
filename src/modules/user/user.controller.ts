import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '../../libs/pipes/params-validation.pipe';
import { Roles } from '../../libs/decorators/role.decorator';
import { UserRole } from '../../libs/enums/role-enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('sayhi')
  async sayhi(): Promise<string> {
    return '你好，世界';
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) // 只有管理员才能创建新用户
  @Post('create')
  async create(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.create(user);
  }
}
