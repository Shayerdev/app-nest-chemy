import { Module } from '@nestjs/common';
import {CheckerEmailRepository} from "./checker-email.repository";
import {CheckerEmailService} from "./checker-email.service";
import {ModelNameProvider} from "./model-name.provider";
import CheckerEmailController from "./checker-email.controller";
import {CheckerFactoryModule} from "./factory/checker.factory.module";

@Module({
    controllers: [CheckerEmailController],
    imports: [CheckerFactoryModule],
    providers: [
        CheckerEmailService,
        CheckerEmailRepository,
        ModelNameProvider
    ],
})
export class CheckerEmailModule {}
