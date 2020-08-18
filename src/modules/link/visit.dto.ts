import { ApiProperty } from '@nestjs/swagger';

export class VisitChartDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  count?: number;
}
