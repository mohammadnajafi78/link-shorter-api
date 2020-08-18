import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty()
  mainLink?: string;

  @ApiProperty()
  showAds?: boolean;

  @ApiProperty()
  user?: string;
}

export class VisitResponseDto {
  @ApiProperty()
  status?: boolean;
}
