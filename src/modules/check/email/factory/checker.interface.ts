export interface IChecker {
    email: string;
    active: boolean;
    smtpCheck: boolean;
    mxRecords?: string;
    dnsCheck: boolean;
    msgCheck?: string;
}
