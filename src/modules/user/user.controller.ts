import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('sayhi')
  async sayhi(): Promise<string> {
    return '你好，世界';
  }
}
