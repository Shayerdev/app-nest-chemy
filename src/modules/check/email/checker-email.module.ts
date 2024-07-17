import { Module } from '@nestjs/common';
import {CheckerEmailRepository} from "./checker-email.repository";
import {DatabaseModule} from "@common/services/database/connection.module";
import {PrismaService} from "@common/services/database/prisma/prisma.service";
import {CheckerEmailService} from "./checker-email.service";
import {ModelNameProvider} from "./model-name.provider";
import CheckerEmailController from "./checker-email.controller";
import {CheckerFactoryModule} from "./factory/checker.factory.module";

@Module({
    controllers: [CheckerEmailController],
    imports: [
        CheckerFactoryModule,
        DatabaseModule.forRoot({
            provide: 'DATABASE',
            useClass: PrismaService,
        }),
    ],
    providers: [
        CheckerEmailService,
        CheckerEmailRepository,
        ModelNameProvider
    ],
})
export class CheckerEmailModule {}
