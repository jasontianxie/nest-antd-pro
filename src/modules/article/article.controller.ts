import { Controller, Post, UseGuards, Body, Get, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../libs/decorators/role.decorator';
import { UserRole } from '../../libs/enums/role-enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { ArticleUpdateDto } from './dto/articleUpdate.dto';
import { ValidationPipe } from '../../libs/pipes/params-validation.pipe';
import { ArticleService } from './article.service';

@Controller('/api/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('update')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Body(new ValidationPipe())data : ArticleUpdateDto){
        return this.articleService.update(data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Param('id') id: number){
        return this.articleService.delete(id);
    }

    @Get('all')
    async getArticles(){
        return this.articleService.getArticles();
    }

    @Get(':id')
    async getArticle(@Param('id') id: number){
        return this.articleService.getArticle(id);
    }
}
