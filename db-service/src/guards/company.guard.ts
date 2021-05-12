import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CompanyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { companyId } = request.params;
    return user.companyId.toString() === companyId;
  }
}
