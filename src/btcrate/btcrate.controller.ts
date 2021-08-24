import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
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
