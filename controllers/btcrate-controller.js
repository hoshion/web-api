const btcRateService = require('../service/btcrate-service');

class BTCRateController {

    async btcRate(req, res, next){
        try {
            const userData = await btcRateService.btcRate();

            console.log(userData);

            res.send(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BTCRateController();