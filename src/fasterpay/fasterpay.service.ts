import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const fasterpay = require("fasterpay-node");
@Injectable()
export class FasterpayService {
    gateway: any;
    baseurl: string;
    constructor(protected config: ConfigService) {
        this.gateway = new fasterpay.Gateway({
            publicKey: this.config.get("FASTERPAY_PUBLIC_KEY") || "",
            privateKey: this.config.get("FASTERPAY_PRIVATE_KEY") || "",
            isTest: 1, // Use 1 for Test Method
        });
        this.baseurl =
            this.config.get("BASE_URL") || "http://127.0.0.1:8080/fasterpay";
    }
    async getPaymentForm(body: any) {
        const paymentForm = this.gateway.PaymentForm().buildForm(
            {
                description: "Test order",
                amount: "10",
                currency: "USD",
                api_key: this.config.get("FASTERPAY_PUBLIC_KEY"),
                merchant_order_id: new Date().getTime().toString(),
                sign_version: "v2",
                success_url: this.baseurl + "/success",
                pingback_url: this.baseurl + "/pingback",
                email: "cjameshill@gmail.com",
                first_name: "C. James",
                last_name: "Hill",
                city: "Alicante",
                zip: "03004",
                order_details: {
                    items: [
                        {
                            name: "Golf Cart",
                            sku: "sku_123",
                            description: "Golf Cart",
                            quantity: 1,
                            price: 10,
                        },
                    ],
                },
            },
            {
                autoSubmit: false,
                hidePayButton: false,
            },
        );
        return paymentForm;
    }
}
