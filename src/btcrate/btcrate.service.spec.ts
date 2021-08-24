import { BTCRateService } from './btcrate.service';

describe('BTCRateService', () => {
  let btcRateService: BTCRateService;

  beforeEach(() => {
    btcRateService = new BTCRateService();
  });

  describe('getBTCRate', () => {
    it('should return BTCRate', async () => {
      expect(await btcRateService.getBTCRate()).toHaveProperty('bpi');
    });
  });
});
