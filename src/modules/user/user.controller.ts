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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation, ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  SignInBody,
  SignInResponse,
  UserResponseDto,
  VerifyBody,
  VerifyResponse,
} from './users.dto';
import { ApiGetQuery } from '../../core/decorators';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @ApiOperation({ summary: 'ورود کاربر' })
  @ApiBody({ type: SignInBody })
  @ApiOkResponse({ type: SignInBody })
  @Post('signin')
  async signin(
    @Body('phone') phone: string,
    @Body('identifier') identifier?: string,
  ) {
    return await this.userService.signin(phone, identifier);
  }

  @ApiOperation({ summary: 'اعتبار سنجی کاربر' })
  @ApiBody({ type: VerifyBody })
  @ApiResponse({ type: VerifyResponse })
  @Post('verify')
  async verify(@Body('phone') phone: string, @Body('key') key: string) {
    return await this.userService.verify(phone, key);
  }

  @ApiOperation({ summary: 'لیست کاربران' })
  @ApiGetQuery()
  @ApiOkResponse({ type: [User] })
  @Auth('admin')
  @Get()
  async getUserList(
    @Query('search') search: string,
    @Query('skip') skip: number = 1,
    @Query('limit') limit: number = 1,
  ): Promise<{ users: User[]; count: number }> {
    return await this.userService.getUserList(search, skip, limit);
  }

  @ApiOperation({ summary: 'پروفایل کاربر' })
  @ApiOkResponse({ type: User })
  @Auth()
  @Get('profile')
  async profile(@Req() request: any): Promise<{ user: User }> {
    if (Date.now() - request.user.updatedAt > 120000) {
      return this.userService.updateUserSalary(request.user);
    } else {
      return { user: request.user };
    }
  }

  @ApiOperation({ summary: 'گرفتن لیست زیر مجموعه ها' })
  @ApiOkResponse({ type: User })
  @Auth()
  @Get('subset')
  async findSubset(@Req() req: any): Promise<{ users: User[] }> {
    return this.userService.findSubset(req.user._id);
  }

  @ApiOperation({ summary: 'ویرایش حساب کاربری' })
  @ApiBody({ type: User })
  @Auth()
  @Put('profile')
  async updateProfile(@Req() request: any, @Body() data: User): Promise<{ status: boolean }> {
    return await this.userService.updateProfile(request.user._id, data);
  }

  @ApiOperation({summary:'بلاک کردن کاربر'})
  @ApiParam({name:'id',description:'شناسه کاربر'})
  @Auth('admin')
  @Put('block/:id')
  async blockUser(@Param('id') id: string): Promise<{ status: boolean }> {
    return await this.userService.blockUser(id);
  }
}
