import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseSchema {
  @ApiResponseProperty()
    // tslint:disable-next-line: variable-name
  _id?: string;

  @ApiResponseProperty()
  __v?: number;
}

export class BaseSchemaTimeStamp extends BaseSchema {

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
