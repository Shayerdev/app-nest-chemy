import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PlatformCheckerDto } from './dto/platform-checker.dto';
import { AmazonService } from './services/amazon.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacebookService } from './services/facebook.service';
import { PaypalService } from './services/paypal.service';
import { StripeService } from './services/stripe.service';

@ApiTags('Checker platform')
@Controller('checker')
export class CheckerController {
    constructor(
        private readonly amazonService: AmazonService,
        private readonly facebookService: FacebookService,
        private readonly paypalService: PaypalService,
        private readonly stripeService: StripeService,
    ) {}

    @ApiOperation({
        summary: 'Check exist email from amazon',
        description: 'This endpoint create for check user email from amazon service ',
    })
    @Post('/amazon')
    @UsePipes(new ValidationPipe())
    checkAmazon(@Body() dto: PlatformCheckerDto) {
        try {
            return this.amazonService.check(dto);
        } catch (e: unknown) {
            if (e instanceof Error) throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({
        summary: 'Check exist email from facebook',
        description: 'This endpoint create for check user email from facebook service',
    })
    @Post('/facebook')
    @UsePipes(new ValidationPipe())
    checkFacebook(@Body() dto: PlatformCheckerDto) {
        try {
            return this.facebookService.check(dto);
        } catch (e: unknown) {
            if (e instanceof Error) throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({
        summary: 'Check exist email from paypal',
        description: 'This endpoint create for check user email from paypal service',
    })
    @Post('/paypal')
    @UsePipes(new ValidationPipe())
    checkPayPal(@Body() dto: PlatformCheckerDto) {
        try {
            return this.paypalService.check(dto);
        } catch (e: unknown) {
            if (e instanceof Error) throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({
        summary: 'Check exist email from stripe',
        description: 'This endpoint create for check user email from stripe service',
    })
    @Post('/stripe')
    @UsePipes(new ValidationPipe())
    checkStripe(@Body() dto: PlatformCheckerDto) {
        try {
            return this.stripeService.check(dto);
        } catch (e: unknown) {
            if (e instanceof Error) throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}
