import { Controller, Get } from '@nestjs/common';
import { BTCRateService } from './btcrate.service';

@Controller('btcrate')
export class BTCRateController {
  constructor(readonly btcRateService: BTCRateService) {}

  @Get()
  getRate() {
    const userData = this.btcRateService.getBTCRate();
    return userData;
  }
}
