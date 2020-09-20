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
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindByPhoneResponse,
  SignUpBody,
  LoginBody,
  SignInResponse,
  ForgetPasswordBody,
  ForgetPasswordRes,
  ResetPassword,
  ResetRes,
} from './users.dto';
import { ApiGetQuery } from '../../core/decorators';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'ثبت نام' })
  @ApiBody({ type: SignUpBody })
  @ApiOkResponse({ type: SignInResponse })
  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('identifier') identifier?: string,
  ) {
    return await this.userService.signUp(username, email, password, identifier);
  }

  @ApiOperation({ summary: 'ورود' })
  @ApiBody({ type: LoginBody })
  @ApiOkResponse({ type: SignInResponse })
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.userService.login(username, password);
  }
  @ApiOperation({ summary: 'لیست کاربران' })
  @ApiGetQuery()
  @ApiOkResponse({ type: [User] })
  @Auth('admin')
  @Get()
  async getUserList(
    @Query('search') search: string,
    @Query('skip') skip = 1,
    @Query('limit') limit = 10,
  ): Promise<{ users: User[]; count: number }> {
    return await this.userService.getUserList(search, skip, limit);
  }

  @ApiOperation({ summary: 'ارسال ایمیل فراموشی رمز عبور' })
  @ApiBody({ type: ForgetPasswordBody })
  @ApiOkResponse({ type: ForgetPasswordRes })
  @Post('forget-password')
  async forgetPassword(@Body('email') email: string) {
    return await this.userService.resetPassword(email);
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

  @ApiOperation({ summary: 'بررسی وجود یا عدم وجود نام کاربری' })
  @ApiOkResponse({ type: Boolean })
  @Post('username')
  async usernameExist(@Body('username') username: string): Promise<boolean> {
    return await this.userService.usernameExist(username);
  }

  @ApiOperation({ summary: 'گرفتن لیست زیر مجموعه ها' })
  @ApiOkResponse({ type: User })
  @Auth()
  @Get('subset')
  async findSubset(@Req() req: any): Promise<{ users: User[] }> {
    return this.userService.findSubset(req.user._id);
  }

  @ApiOperation({ summary: 'اعتبار سنجی کد فراموشی رمز' })
  @ApiParam({ name: 'code', description: 'کد فراموشی رمز عبور' })
  @ApiOkResponse({ type: ResetRes })
  @Post('verify/:code')
  async verifyResetPassword(@Param('code') code: string) {
    return await this.userService.verifyRessetPassword(code);
  }

  @ApiOperation({ summary: 'تغییر رمز عبور' })
  @ApiBody({ type: ResetPassword })
  @ApiOkResponse({ type: ResetRes })
  @Post('change-password')
  async changePassword(
    @Body('code') code: string,
    @Body('password') password: string,
  ) {
    return await this.userService.changePassword(password, code);
  }

  @ApiOperation({ summary: 'ویرایش حساب کاربری' })
  @ApiBody({ type: User })
  @Auth()
  @Put('profile')
  async updateProfile(
    @Req() request: any,
    @Body() data: User,
  ): Promise<{ status: boolean }> {
    return await this.userService.updateProfile(request.user._id, data);
  }

  @ApiOperation({ summary: 'ویرایش کاربر توسط ادمین' })
  @ApiBody({ type: User })
  @ApiOkResponse({ type: User })
  @ApiParam({ name: 'id', description: 'شناسه کاربر' })
  @Auth('admin')
  @Put(':id')
  async adminUpdate(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<{ user: User }> {
    return await this.userService.adminUpdate(id, user);
  }

  @ApiOperation({ summary: 'گرفتن کاربر با شماره تلفن' })
  @ApiParam({ name: 'phone', description: 'شماره تلقن کاربر' })
  @ApiResponse({ type: FindByPhoneResponse })
  @Get(':phone')
  async getUserByPhone(@Param('phone') phone: string): Promise<{ user: User }> {
    return await this.userService.getUserByPhone(phone);
  }
}
