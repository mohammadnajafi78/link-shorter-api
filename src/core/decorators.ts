import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/models/user.model';

export const UserData = createParamDecorator(
  (data, request: Request): User => (request as any).user as User,
);
