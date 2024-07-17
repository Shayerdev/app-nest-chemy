import {Module} from "@nestjs/common";
import {HttpModule} from "@commonHttp/http.module";
import {CheckerServiceEmailDnsModule} from "@commonServiceCheckers//checker-service-email-dns.module";
import {CheckerWhoisxml} from "./checkers/checker.whoisxml";
import {ICheckerFactory} from "./checker.factory.interface";
import {CheckerService} from "./checker.service";
import {ConverterWhoisxml} from "./converters/converter.whoisxml";
import CheckerBuilder from "./checker.builder";
import {ConverterEmailverifier} from "./converters/converter.emailverifier";
import {CheckerEmailverifier} from "./checkers/checker.emailverifier";
import {TokenCheckerModule} from "@modules/tokens/checker/email/token-checker.module";

@Module({
    imports: [
        HttpModule,
        TokenCheckerModule,
        CheckerServiceEmailDnsModule
    ],
    providers: [
        CheckerService,
        CheckerBuilder,
        CheckerWhoisxml,
        CheckerEmailverifier,
        {
            provide: 'CHECKER_FACTORIES',
            useFactory: (...checkers: ICheckerFactory[]) => {
                return checkers;
            },
            inject: [CheckerWhoisxml, CheckerEmailverifier],
        },
        {
            provide: 'ConverterWhoisxml',
            useClass: ConverterWhoisxml
        },
        {
            provide: 'ConverterEmailverifier',
            useClass: ConverterEmailverifier
        }
    ],
    exports: [CheckerService],
})

export class CheckerFactoryModule {}
