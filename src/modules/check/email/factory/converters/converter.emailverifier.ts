import {ICheckerConverter} from "./converter.interface";
import {ICheckerConverted} from "./converted.interface";

export class ConverterEmailverifier implements ICheckerConverter {
    convert<ICheckerEmailverifier>(data): ICheckerConverted {
        return {
            email: "asd@gmail.com",
            active: data == 'ok',
            smtpCheck: data == 'ok',
        };
    }
}
