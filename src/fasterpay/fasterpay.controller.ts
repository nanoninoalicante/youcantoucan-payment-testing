import { All, Body, Controller, Query, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { FasterpayService } from "./fasterpay.service";

@UseInterceptors(new LoggingInterceptor())
// @UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("fasterpay")
export class FasterpayController {
    constructor(protected service: FasterpayService) {}
    @All()
    async getPaymentForm(@Body() body: any) {
        return await this.service.getPaymentForm(body);
    }
    @All("*")
    async pingback(@Body() body: any, @Query() query: any) {
        console.log("body", JSON.stringify(body));
        console.log("query", JSON.stringify(query));
        return { body, query };
    }
}
