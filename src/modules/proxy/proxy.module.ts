import {Module} from "@nestjs/common";
import ProxyController from "@modules/proxy/proxy.controller";
import {ModelNameProvider} from "@modules/proxy/model-name.provider";
import {DatabaseModule} from "@common/services/database/connection.module";
import {PrismaService} from "@common/services/database/prisma/prisma.service";
import ProxyRepository from "@modules/proxy/proxy.repository";
import ProxyService from "@modules/proxy/proxy.service";

@Module({
    controllers: [ProxyController],
    imports: [
        DatabaseModule.forRoot({
            provide: 'DATABASE',
            useClass: PrismaService,
        }),
    ],
    providers: [
        ProxyService,
        ProxyRepository,
        ModelNameProvider
    ],
    exports: [ProxyRepository]
})
export default class ProxyModule {}
