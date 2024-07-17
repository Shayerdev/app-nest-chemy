import {Module} from "@nestjs/common";
import {INetworkFactory} from "@modules/check/networks/factory/network.factory.interface";
import {NetworkFacebook} from "@modules/check/networks/factory/networks/network.facebook";
import {NetworkService} from "@modules/check/networks/factory/network.service";
import {PuppeteerService} from "@common/services/emulators/puppeteer/puppeteer.service";
import EmulateFacebook from "@modules/check/networks/factory/networks/emulate/emulate.facebook";
import {NetworkAmazon} from "@modules/check/networks/factory/networks/network.amazon";
import EmulateAmazon from "@modules/check/networks/factory/networks/emulate/emulate.amazon";
import EmulatePaypal from "@modules/check/networks/factory/networks/emulate/emulate.paypal";
import {NetworkPaypal} from "@modules/check/networks/factory/networks/network.paypal";
import EmulateStripe from "@modules/check/networks/factory/networks/emulate/emulate.stripe";
import {NetworkStripe} from "@modules/check/networks/factory/networks/network.stripe";

@Module({
    providers: [
        NetworkService,
        NetworkFacebook,
        NetworkAmazon,
        NetworkPaypal,
        NetworkStripe,
        {
            provide: 'NETWORKS_FACTORIES',
            useFactory: (...checkers: INetworkFactory[]) => {
                return checkers;
            },
            inject: [
                NetworkFacebook,
                NetworkAmazon,
                NetworkPaypal,
                NetworkStripe
            ],
        },
        {
            provide: 'EMULATOR',
            useClass: PuppeteerService
        },
        {
            provide: 'EMULATE_FACEBOOK',
            useClass: EmulateFacebook
        },
        {
            provide: 'EMULATE_AMAZON',
            useClass: EmulateAmazon
        },
        {
            provide: 'EMULATE_PAYPAL',
            useClass: EmulatePaypal
        },
        {
            provide: 'EMULATE_STRIPE',
            useClass: EmulateStripe
        }
    ],
    exports: [NetworkService],
})

export class CheckerFactoryModule {
}
