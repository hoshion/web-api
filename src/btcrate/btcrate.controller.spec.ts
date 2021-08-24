import { BTCRateController } from "./btcrate.controller";
import { BTCRateService } from "./btcrate.service";

describe("BTCRateController", () => {
    let btcRateController: BTCRateController;
    
    beforeEach(() => {
        btcRateController = new BTCRateController(new BTCRateService());
    })

    describe("getRate", () => {
        it("should return BTCRate", async () => {
            expect(await btcRateController.getRate()).toHaveProperty("bpi");
        })
    })
})