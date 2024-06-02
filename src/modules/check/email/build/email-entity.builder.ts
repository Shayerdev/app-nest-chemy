import {Inject} from "@nestjs/common";
import {CheckServiceDnsInterface} from "../../../../common/services/checkers/check-service-dns.interface";
import {EmailCheckerEntityBuildInterface} from "../interfaces/email-checker-entity-build.interface";
import {IEmailCheckerResultInterface} from "../interfaces/email.interface";

export class EmailEntityBuilder implements EmailCheckerEntityBuildInterface
{
    constructor(
        @Inject('CheckServiceEmailDns')
        private readonly checkServiceEmailDns: CheckServiceDnsInterface
    ) {
    }

    /**
     * Get MX Records
     * @param email
     * @private
     */
    #getMxRecords(email: string): Promise<string[]>
    {
        return this.checkServiceEmailDns.checkMX<string[]>(email);
    }

    #getDnsStatus(email: string): Promise<boolean>
    {
        return this.checkServiceEmailDns.check<boolean>(email)
    }

    /**
     * Return data
     *
     * @param email
     * @param data
     */
    async getData(
        email: string,
        data:IEmailCheckerResultInterface
    ): Promise<IEmailCheckerResultInterface> {
        // Get Email domain
        const getEmailDomain = email.split('@')[1]
        // Check and get DNS status
        const dnsCheck = data?.dnsCheck || await this.#getDnsStatus(getEmailDomain)
        // Check and get MX Records
        const mxRecords = data?.mxRecords || await this.#getMxRecords(getEmailDomain);

        // Return Build data
        return {
            active: data.active,
            dnsCheck: dnsCheck,
            mxRecords: mxRecords
        }
    }
}
