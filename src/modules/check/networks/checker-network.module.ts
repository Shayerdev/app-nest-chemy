import {Module} from "@nestjs/common";
import {CheckerNetworkController} from "@modules/check/networks/checker-network.controller";
import {ModelNameProvider} from "@modules/check/networks/model-name.provider";
import {CheckerNetworkService} from "@modules/check/networks/checker-network.service";
import {CheckerNetworkRepository} from "@modules/check/networks/checker-network.repository";
import {CheckerFactoryModule} from "@modules/check/networks/factory/network.factory.module";

@Module({
    controllers: [CheckerNetworkController],
    imports: [CheckerFactoryModule],
    providers: [
        CheckerNetworkService,
        CheckerNetworkRepository,
        ModelNameProvider
    ]
})
export class CheckerNetworkModule {}
