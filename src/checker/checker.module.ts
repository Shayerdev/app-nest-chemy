import { Module } from '@nestjs/common';
import { CheckerController } from './checker.controller';
import {AmazonService} from "./services/amazon.service";
import {FacebookService} from "./services/facebook.service";
import {PaypalService} from "./services/paypal.service";
import {StripeService} from "./services/stripe.service";


@Module({
  controllers: [CheckerController],
  providers: [
      AmazonService,
    FacebookService,
    PaypalService,
    StripeService
  ],
  //imports: [AmazonService]
})
export class CheckerModule {}
