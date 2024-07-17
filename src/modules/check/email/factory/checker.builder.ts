import {Inject} from "@nestjs/common";
import {CheckServiceDnsInterface} from "@commonServiceCheckers/check-service-dns.interface";
import {ICheckerConverted} from "./converters/converted.interface";
import {IChecker} from "./checker.interface";

class CheckerBuilder {
    constructor(
        @Inject('CheckServiceEmailDns')
        private readonly checkServiceEmailDns: CheckServiceDnsInterface,
    ) {}

    /**
     * Get MX Records
     * @param email
     * @private
     */
    #getMxRecords(email: string): Promise<string[]> {
        return this.checkServiceEmailDns.checkMX<string[]>(email);
    }

    /**
     * Get DNS Status
     * @param email
     * @private
     */
    #getDnsStatus(email: string): Promise<boolean> {
        return this.checkServiceEmailDns.check<boolean>(email);
    }

    /**
     * Return data
     *
     * @param email
     * @param data
     */
    async getData(email: string, data: ICheckerConverted): Promise<IChecker> {
        // Get Email domain
        const getEmailDomain = email.split('@')[1];
        // Check and get DNS status
        const dnsCheck = data?.dnsCheck || (await this.#getDnsStatus(getEmailDomain));
        // Check and get MX Records
        const mxRecords = data?.mxRecords || (await this.#getMxRecords(getEmailDomain));
        // Check SMTP
        const smtpCheck = data?.smtpCheck || false;

        // Return Build data
        return {
            email: email,
            active: data.active,
            mxRecords: JSON.stringify(mxRecords),
            smtpCheck: smtpCheck,
            dnsCheck: dnsCheck
        };
    }
}

export default CheckerBuilder;
