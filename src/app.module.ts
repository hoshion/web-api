import { Module } from '@nestjs/common';
import { BTCRateModule } from './btcrate/btcrate.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, BTCRateModule],
})
export class AppModule {}
