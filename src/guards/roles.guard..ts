import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { includes, get } from "lodash";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    //headers 中需包含role属性，且role包含于roles
    const request = context.switchToHttp().getRequest();
    const role = get(request.headers, ["role"], null);
    if (!role) {
      return false;
    }
    return includes(roles, role);
  }
}
