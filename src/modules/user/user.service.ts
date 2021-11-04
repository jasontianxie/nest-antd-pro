import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { StUser } from '../../entities/StUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(StUser) // nest中注入typeorm的repository，https://docs.nestjs.cn/8/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93
    private readonly stUserRepository: Repository<StUser>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.stUserRepository.create(dto); // typeorm中repository的操作，create用于创建一个实体，https://typeorm.biunav.com/zh/repository-api.html#repositoryapi
    const salt = bcrypt.genSaltSync(10);
    user.salt = salt;
    user.password = bcrypt.hashSync(user.password, salt);
    return this.stUserRepository
      .save(user)
      .then((res) => {
        return { id: res.id };
      })
      .catch((err) => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }
}
