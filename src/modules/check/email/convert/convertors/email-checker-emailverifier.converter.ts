import {EmailCheckerConverterInterface} from "../../interfaces/email-checker-converter.interface";
import {IEmailCheckerResultInterface} from "../../interfaces/email.interface";
import {Injectable} from "@nestjs/common";
import {
    EmailCheckerEmailverifierResponseInterface
} from "../../interfaces/email-checker-emailverifier-response.interface";

@Injectable()
export class EmailCheckerEmailverifierConverter implements EmailCheckerConverterInterface
{
    convert(
        data: EmailCheckerEmailverifierResponseInterface
    ): IEmailCheckerResultInterface {
        return  {
            active: (data == 'ok')
        };
    }
}
