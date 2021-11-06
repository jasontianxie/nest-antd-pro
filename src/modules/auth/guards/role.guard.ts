import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../libs/decorators/role.decorator';
import { UserRole } from '../../../libs/enums/role-enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [ // 获取能访问某个路由的角色，比如src\modules\user\user.controller.ts中的create，只能admin角色才可以访问
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) { // 如果没有设定角色，则所有角色都可以访问
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // 这里的user属性是在strategy（local.strategy.ts或者jwt.strategy.ts）中获得的。所以如果要获得此属性，需要在该守卫前加上相应的strategy守卫（我们是在user.controller.ts加上了@UseGuards(AuthGuard('jwt'))这个守卫）
    const hasRole = () => user.roles.some((role) => requiredRoles.includes(role));
    return user && user.roles && hasRole();
  }
}
