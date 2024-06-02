import {IEmailCheckerResultInterface} from "./email.interface";

export interface EmailCheckerConverterInterface
{
    convert(data: any): IEmailCheckerResultInterface;
}
