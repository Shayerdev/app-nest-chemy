import {Module} from "@nestjs/common";
import {CheckerNetworkController} from "@modules/check/networks/checker-network.controller";
import {ModelNameProvider} from "@modules/check/networks/model-name.provider";
import {CheckerNetworkService} from "@modules/check/networks/checker-network.service";
import {CheckerNetworkRepository} from "@modules/check/networks/checker-network.repository";
import {DatabaseModule} from "@common/services/database/connection.module";
import {PrismaService} from "@common/services/database/prisma/prisma.service";
import {CheckerFactoryModule} from "@modules/check/networks/factory/network.factory.module";

@Module({
    controllers: [CheckerNetworkController],
    imports: [
        CheckerFactoryModule,
        DatabaseModule.forRoot({
            provide: 'DATABASE',
            useClass: PrismaService,
        }),
    ],
    providers: [
        CheckerNetworkService,
        CheckerNetworkRepository,
        ModelNameProvider
    ]
})
export class CheckerNetworkModule {}
