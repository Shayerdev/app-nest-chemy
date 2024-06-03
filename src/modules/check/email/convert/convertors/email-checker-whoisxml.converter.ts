import { EmailCheckerConverterInterface } from '../../interfaces/email-checker-converter.interface';
import { IEmailCheckerResultInterface } from '../../interfaces/email.interface';
import { EmailCheckerWhoisxmlResponseInterface } from '../../interfaces/email-checker-whoisxml-response.interface';

export class EmailCheckerWhoisxmlConverter implements EmailCheckerConverterInterface {
    convert(data: EmailCheckerWhoisxmlResponseInterface): IEmailCheckerResultInterface {
        return {
            active: data.smtpCheck == 'true',
            dnsCheck: data.smtpCheck && data.dnsCheck == 'true',
            mxRecords: data.mxRecords,
        };
    }
}
