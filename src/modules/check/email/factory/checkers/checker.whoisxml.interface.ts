export interface ICheckerWhoisxml {
    username: string;
    domain: string;
    emailAddress: string;
    formatCheck: string;
    smtpCheck: string;
    dnsCheck: string;
    freeCheck: string;
    disposableCheck: string;
    catchAllCheck: string;
    mxRecords: string[];
    audit: Record<string, string>;
}
