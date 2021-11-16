import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) { // 这里的req.user就是src\modules\auth\strategies\local.strategy.ts中的validate返回的数据
    return this.authService.login(req.user); // 向客户端返回登录成功后的jwt
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/profile')
  getProfile(@Request() req) { // 这里的req.user就是src\modules\auth\strategies\jwt.strategy.ts中的validate返回的数据
    return req.user;
  }
}
