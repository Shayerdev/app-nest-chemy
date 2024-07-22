import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CheckerEmailModule} from '@modules/check/email/checker-email.module';
import {CheckerNetworkModule} from "@modules/check/networks/checker-network.module";
import {TokenCheckerModule} from "@modules/tokens/checker/email/token-checker.module";
import ProxyModule from "@modules/proxy/proxy.module";
import UseragentModule from "@modules/useragent/useragent.module";
import {DatabaseModule} from "@common/services/database/connection.module";
import {PrismaService} from "@common/services/database/prisma/prisma.service";

@Module({
    imports: [
        CheckerEmailModule,
        CheckerNetworkModule,
        TokenCheckerModule,
        UseragentModule,
        ProxyModule,
        ConfigModule.forRoot(),
        DatabaseModule.forRoot({
            provide: 'DATABASE',
            useClass: PrismaService,
        }),
    ],
})
export class AppModule {}
