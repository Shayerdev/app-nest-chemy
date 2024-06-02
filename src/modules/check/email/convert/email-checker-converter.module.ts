import {Module} from "@nestjs/common";
import {EmailCheckerConverterFactory} from "./email-checker-converter.factory";

@Module({
    providers: [EmailCheckerConverterFactory],
    exports: [EmailCheckerConverterFactory]
})
export class EmailCheckerConverterModule {}
