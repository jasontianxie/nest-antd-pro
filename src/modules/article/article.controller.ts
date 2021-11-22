import { Controller, Post, UseGuards, Body } from '@nestjs/common';
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
}
