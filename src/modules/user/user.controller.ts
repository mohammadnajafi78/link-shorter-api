import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signin(@Body('phone') phone: string) {
    return await this.userService.signin(phone);
  }
  @Post()
  async verify(@Body('phone') phone: string, @Body('key') key: string) {
    return await this.userService.verify(phone, key);
  }
}
