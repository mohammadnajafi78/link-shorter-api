import { User } from 'src/models/user.model';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class SignUpBody {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class SignInResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  status: boolean;
}

export class LoginBody {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UserResponseDto {
  @ApiProperty()
  user: User;
}

export class FindByPhoneResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  phone: string;
}
export class ForgetPasswordBody {
  @ApiProperty()
  email: string;
}
export class ForgetPasswordRes {
  @ApiResponseProperty()
  status: boolean;
}

export class ResetPassword {
  @ApiProperty()
  code: string;

  @ApiProperty()
  password: string;
}

export class ResetRes {
  @ApiProperty()
  status: boolean;
}
