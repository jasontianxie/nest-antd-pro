/**
 * 更新文章
 */
 import { IsString, IsNotEmpty, IsNumber } from 'class-validator'; 
 export class ArticleUpdateDto {
     @IsNotEmpty({
       message: 'userId can not be empty'
     })
     @IsNumber()
     readonly userId: number;
 
     readonly id: number;
 
     @IsString({
       message: 'article should be string'
     })
     readonly article: string;
   }