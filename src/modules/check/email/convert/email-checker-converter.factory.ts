import {Injectable} from "@nestjs/common";
import {EmailCheckerWhoisxmlConverter} from "./convertors/email-checker-whoisxml.converter"
import {EmailCheckerConverterInterface} from "../interfaces/email-checker-converter.interface";
import {EmailCheckerEmailverifierConverter} from "./convertors/email-checker-emailverifier.converter";

@Injectable()
export class EmailCheckerConverterFactory {
    getConverter(apiName: string): EmailCheckerConverterInterface {
        switch (apiName) {
            case 'whoisxml':
                return new EmailCheckerWhoisxmlConverter();
            case 'emailverifier':
                return new EmailCheckerEmailverifierConverter();
            default:
                throw new Error(`Unknown API: ${apiName}`);
        }
    }
}
