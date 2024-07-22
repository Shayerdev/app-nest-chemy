import {Module} from "@nestjs/common";
import ProxyController from "@modules/proxy/proxy.controller";
import {ModelNameProvider} from "@modules/proxy/model-name.provider";
import ProxyRepository from "@modules/proxy/proxy.repository";
import ProxyService from "@modules/proxy/proxy.service";

@Module({
    controllers: [ProxyController],
    providers: [
        ProxyService,
        ProxyRepository,
        ModelNameProvider
    ],
    exports: [ProxyRepository, ModelNameProvider]
})
export default class ProxyModule {}
