import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HelloModule } from "./hello/hello.module";
import { ConfigModule } from "@nestjs/config";
import { FasterpayModule } from "./fasterpay/fasterpay.module";

@Module({
    imports: [
        HelloModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: false,
        }),
        FasterpayModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
