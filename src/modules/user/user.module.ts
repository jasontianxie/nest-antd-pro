import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StUser } from '../../entities/StUser';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StUser]), HttpModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
