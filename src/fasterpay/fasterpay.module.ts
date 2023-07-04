import { Global, Module } from "@nestjs/common";
import { FasterpayService } from "./fasterpay.service";
import { FasterpayController } from "./fasterpay.controller";
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [FasterpayService],
    controllers: [FasterpayController],
    exports: [FasterpayService],
})
export class FasterpayModule {}
