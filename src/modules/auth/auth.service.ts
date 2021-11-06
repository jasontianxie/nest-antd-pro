import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByMobile(username);
    if (user) {
      const userpwd = bcrypt.hashSync(pass, user.salt); // 数据库中的密码是加密过的，所以这里需要解密
      if (user.password === userpwd) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}