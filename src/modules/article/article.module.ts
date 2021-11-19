import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Articles } from '../../entities/Articles';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
