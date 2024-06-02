import {EmailCheckDtoInterface} from "./email-check-dto.interface";

export interface IEmailCheckerResultInterface
{
    active: boolean
    mxRecords?: string[]
    dnsCheck?: boolean
    msgCheck?: string
}
export interface IEmailCheckerInterface
{
    check(dto: EmailCheckDtoInterface): Promise<IEmailCheckerResultInterface>;
}
