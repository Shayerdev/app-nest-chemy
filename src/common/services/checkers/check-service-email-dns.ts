import * as dns from 'dns';
import {CheckServiceDnsInterface} from "./check-service-dns.interface";
import {Injectable} from "@nestjs/common";

@Injectable()
export class CheckServiceEmailDns implements CheckServiceDnsInterface {
    async check<R>(email: string): Promise<R> {
        const domain = email;
        return new Promise((resolve, reject) => {
            dns.resolveMx(domain, (err, addresses) => {
                if (err) {
                    return reject(err);
                }
                const formatAddresses = addresses.map(address => address.exchange);
                resolve(formatAddresses as R);
            });
        });
    }
}
