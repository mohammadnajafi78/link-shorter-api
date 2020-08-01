import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { Auth } from 'src/guards/auth.guard';
import { UserData } from 'src/core/decorators';
import { request } from 'express';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  async signin(@Body('phone') phone: string) {
    return await this.userService.signin(phone);
  }
  @Post('verify')
  async verify(@Body('phone') phone: string, @Body('key') key: string) {
    return await this.userService.verify(phone, key);
  }

  @Auth('admin')
  @Get()
  async getUserList(
    @Query('search') search: string,
    @Query('skip') skip: number = 1,
    @Query('limit') limit: number = 1,
  ): Promise<{ users: User[]; count: number }> {
    return await this.userService.getUserList(search, skip, limit);
  }

  @Auth()
  @Get('profile')
  async profile(@Req() request: any): Promise<{ user:User }> {
    return {user:request.user};
  }

  @Auth()
  @Put('profile')
  async updateProfile(@Req() request: any, @Body() data: User): Promise<{ status:boolean }> {
    return await this.userService.updateProfile(request.user._id, data);
  }

  @Auth('admin')
  @Put('block/:id')
  async blockUser(@Param('id') id: string): Promise<{ status: boolean }> {
    return await this.userService.blockUser(id);
  }
}
