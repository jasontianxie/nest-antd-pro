import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../libs/enums/role-enum';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}

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

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
  async login(user: any) {
    let roles = [];
    if (user.role === 100) {
      roles = [UserRole.ADMIN];
    } else {
      roles = [UserRole.USER];
    }
    const payload = {
      id: user.id,
      mobile: user.mobile,
      sub: user.id,
      roles,
      name: user.name,
      avatar: user.avatar,
    };
    return {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      roles,
      avatar: user.avatar,
      accessToken: this.jwtService.sign(payload),
    };
  }
}