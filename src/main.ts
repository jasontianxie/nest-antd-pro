import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './libs/interceptors/data.interceptor';
import { HttpExceptionFilter } from './libs/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 把所有的异常都转换成{code：code，data：null，message：message}
  app.useGlobalInterceptors(new TransformInterceptor()); // 把所有的数据格式都转换成{code：0，data：data，message：message}
  await app.listen(3000);
}
bootstrap();
