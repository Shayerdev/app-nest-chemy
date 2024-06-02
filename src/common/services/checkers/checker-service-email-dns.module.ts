import {Module} from "@nestjs/common";
import {CheckServiceEmailDns} from "./check-service-email-dns";

@Module({
    providers: [
        {
            provide: 'CheckServiceEmailDns',
            useClass: CheckServiceEmailDns
        }
    ],
    exports: ['CheckServiceEmailDns']
})
export class CheckerServiceEmailDnsModule {}
