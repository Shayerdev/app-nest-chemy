export interface ICheckerConverted {
    email: string;
    active: boolean;
    smtpCheck: boolean;
    mxRecords?: string[]; // optional
    dnsCheck?: boolean; // optional
    msgCheck?: string; // optional
}
