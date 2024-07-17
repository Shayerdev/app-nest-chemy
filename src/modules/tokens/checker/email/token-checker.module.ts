import {Module} from "@nestjs/common";
import {TokenCheckerController} from "@modules/tokens/checker/email/token-checker.controller";
import TokenCheckerService from "@modules/tokens/checker/email/token-checker.service";
import TokenCheckerRepository from "@modules/tokens/checker/email/token-checker.repository";
import {DatabaseModule} from "@common/services/database/connection.module";
import {PrismaService} from "@common/services/database/prisma/prisma.service";
import {ModelNameProvider} from "@modules/tokens/checker/email/model-name.provider";

@Module({
    controllers: [TokenCheckerController],
    imports: [
        DatabaseModule.forRoot({
            provide: 'DATABASE',
            useClass: PrismaService,
        }),
    ],
    providers: [
        TokenCheckerService,
        TokenCheckerRepository,
        ModelNameProvider
    ],
    exports: [TokenCheckerService]
})
export class TokenCheckerModule {}
