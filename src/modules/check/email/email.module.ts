import {Module} from '@nestjs/common';
import {HttpModule} from "../../../common/http/http.module";
import {WhoisxmlController} from "./whoisxml.controller";
import {EmailCheckerWhoisxmlAdapter} from "./adapters/email-checker-whoisxml.adapter";
import {EmailCheckerEmailverifierAdapter} from "./adapters/email-checker-emailverifier.adapter";
import {EmailverifierController} from "./emailverifier.controller";
import {EmailCheckerConverterModule} from "./convert/email-checker-converter.module";
import {CheckerServiceEmailDnsModule} from "../../../common/services/checkers/checker-service-email-dns.module";
import {EmailEntityBuilder} from "./build/email-entity.builder";

@Module({
    controllers: [
        WhoisxmlController,
        EmailverifierController
    ],
    imports: [
        HttpModule,
        EmailCheckerConverterModule,
        CheckerServiceEmailDnsModule
    ],
    providers: [
        EmailEntityBuilder,
        {
            provide: 'WhoisxmlChecker',
            useClass: EmailCheckerWhoisxmlAdapter,
        },
        {
            provide: 'EmailVerifier',
            useClass: EmailCheckerEmailverifierAdapter
        }
    ],
})
export class EmailModule {
}
