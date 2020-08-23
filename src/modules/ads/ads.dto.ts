import { Ads } from '../../models/ads.model';
import { ApiProperty } from '@nestjs/swagger';

export class AdsResponse {
  @ApiProperty({ type: [Ads] })
  verticals: Ads[];

  @ApiProperty({ type: [Ads] })
  horizontals: Ads[];

  @ApiProperty({ type: [Ads] })
  popup: Ads[];
}
