import {ICheckerConverter} from "./converter.interface";
import {ICheckerConverted} from "./converted.interface";

export class ConverterWhoisxml implements ICheckerConverter {
    convert<ICheckerWhoisxml>(data): ICheckerConverted {
        return {
            email: data.emailAddress,
            active: data.smtpCheck === 'true',
            dnsCheck: data.smtpCheck && data.dnsCheck == 'true',
            smtpCheck: data.smtpCheck === 'true',
            mxRecords: data.mxRecords,
        };
    }
}
