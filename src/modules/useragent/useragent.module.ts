import {Module} from "@nestjs/common";
import {DatabaseModule} from "@common/services/database/connection.module";
import {PrismaService} from "@common/services/database/prisma/prisma.service";
import {ModelNameProvider} from "@modules/useragent/model-name.provider";
import UseragentRepository from "@modules/useragent/useragent.repository";
import UseragentService from "@modules/useragent/useragent.service";
import UseragentController from "@modules/useragent/useragent.controller";

@Module({
    controllers: [UseragentController],
    imports: [
        DatabaseModule.forRoot({
            provide: 'DATABASE',
            useClass: PrismaService,
        }),
    ],
    providers: [
        ModelNameProvider,
        UseragentService,
        UseragentRepository
    ],
    exports: [UseragentRepository]
})
export default class UseragentModule {}
