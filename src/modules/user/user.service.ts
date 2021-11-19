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
    const user = this.stUserRepository.create(dto); // typeorm中repository的操作，create用于创建一条数据库条目，如果有参数则会把这些参数放到条目中，如果没有参数，则是一条空的条目。但是注意，此时并没有真正的插入数据库，需要调用save方法才能真正插入，https://typeorm.biunav.com/zh/repository-api.html#repositoryapi
    const salt = bcrypt.genSaltSync(10);
    user.salt = salt;
    user.password = bcrypt.hashSync(user.password, salt);
    return this.stUserRepository
      .save(user) // 保存上面this.stUserRepository.create生成的条目
      .then((res) => {
        return { id: res.id };
      })
      .catch((err) => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }

  async findByMobile(mobile: string): Promise<StUser> { // 在数据库中根据用户手机号查找信息
    const result = await this.stUserRepository.findOne({ mobile });
    return result;
  }
}
