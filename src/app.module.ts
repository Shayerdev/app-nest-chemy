import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CheckerEmailModule} from '@modules/check/email/checker-email.module';
import {CheckerNetworkModule} from "@modules/check/networks/checker-network.module";
import {TokenCheckerModule} from "@modules/tokens/checker/email/token-checker.module";
import ProxyModule from "@modules/proxy/proxy.module";

@Module({
    imports: [
        CheckerEmailModule,
        CheckerNetworkModule,
        TokenCheckerModule,
        ProxyModule,
        ConfigModule.forRoot()
    ],
})
export class AppModule {
}
