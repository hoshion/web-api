import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TokenRepository } from "../token/token.repository";
import { TokenService } from "../token/token.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { BTCRateController } from "./btcrate.controller";
import { BTCRateService } from "./btcrate.service";

@Module({
    controllers: [BTCRateController],
    providers: [BTCRateService, TokenService, TokenRepository]
})
export class BTCRateModule{
    configure(consumer: MiddlewareConsumer){
        consumer
            .apply(AuthMiddleware)
            .forRoutes("/btcRate")
    }
}