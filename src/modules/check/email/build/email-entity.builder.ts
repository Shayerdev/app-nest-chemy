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
    #getMxRecords(email: string): Promise<string[]> {
        return this.checkServiceEmailDns.check<string[]>(email);
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
        // Check and get MX Records
        const mxRecords = data?.mxRecords || await this.#getMxRecords(email.split('@')[1]);
        return {
            active: data.active,
            mxRecords: mxRecords
        }
    }
}
