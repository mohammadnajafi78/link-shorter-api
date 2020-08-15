import { User } from 'src/models/user.model';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';


export class SignInBody {
  @ApiProperty()
  phone: string;
}

export class SignInResponse {
  @ApiResponseProperty()
  status: boolean;
}

export class VerifyBody {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  key: string;
}

export class VerifyResponse {
  @ApiResponseProperty()
  message: string;

  @ApiResponseProperty()
  token: string;

  @ApiResponseProperty()
  id: string;
}

export class UserResponseDto {
  @ApiProperty()
  user: User;
}
