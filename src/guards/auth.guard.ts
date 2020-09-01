import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from 'src/config';
import { User } from 'src/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Auth = (...roles: string[]) =>
  applyDecorators(
    SetMetadata('auth', true),
    SetMetadata('roles', roles),
    ApiBearerAuth(),
  );

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly reflector: Reflector,
  ) {
  }

  getUser = (decoded: { _id: string }) =>
    this.userModel.findById(decoded._id).select('-keys');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const auth = this.reflector.get<boolean>('auth', context.getHandler());
      const roles = this.reflector.get<string>('roles', context.getHandler());

      if (!auth) {
        return true;
      }

      const { authorization } = request.headers;

      if (!!authorization && authorization.startsWith('Bearer')) {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, TOKEN_SECRET_KEY);

        if (!!decoded) {
          const user: User = await this.getUser(decoded);
          (request as any).user = user;
          if (!roles || roles.length === 0) {
            return true;
          } else {
            return roles.includes(user.role);
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
