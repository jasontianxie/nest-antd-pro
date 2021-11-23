import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Articles } from '../../entities/Articles';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleUpdateDto } from './dto/articleUpdate.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Articles) // nest中注入typeorm的repository，https://docs.nestjs.cn/8/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93
        private readonly articlesRepository: Repository<Articles>,
    ) {}

    async update(dto: ArticleUpdateDto) {  // ArticleUpdateDto里面属性的名称要和entity里面的属性名称一致
        if (dto.id) {
            this.articlesRepository.update({ id: dto.id }, dto)
            .then(() => {
                return 'update success';
            })
            .catch((e) => {
                throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
            });

        } else {
            const article = this.articlesRepository.create(dto); // typeorm中repository的操作，create用于创建一条数据库条目，如果有参数则会把这些参数放到条目中，如果没有参数，则是一条空的条目。但是注意，此时并没有真正的插入数据库，需要调用save方法才能真正插入，https://typeorm.biunav.com/zh/repository-api.html#repositoryapi
            return this.articlesRepository
                .save(article)
                .then((res) => {
                    return { id: res.id };
                })
                .catch((e) => {
                    throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
                });
        }
      }
    async getArticles() {
        return this.articlesRepository.find()
        .then( res => res)
        .catch((e) => {
            throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async getArticle(id: number) {
        return this.articlesRepository
        .findOne(id)
        .then( res => res)
        .catch((e) => {
            throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async delete(id: number) {
        return this.articlesRepository
        .delete(id)
        .then(() => 'delete success')
        .catch((e) => {
            throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
