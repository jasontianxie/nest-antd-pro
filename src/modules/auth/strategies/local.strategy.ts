import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> { // 登录的时候使用手机号码作为username
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('登录失败', HttpStatus.OK);
    }
    return user;
  }
}