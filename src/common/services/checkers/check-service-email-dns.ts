import * as dns from 'dns';
import { CheckServiceDnsInterface } from './check-service-dns.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckServiceEmailDns implements CheckServiceDnsInterface {
    async checkMX<R>(email: string): Promise<R> {
        return new Promise((resolve, reject) => {
            dns.resolveMx(email, (err, addresses) => {
                if (err) {
                    return reject(err);
                }
                const formatAddresses = addresses.map((address) => address.exchange);
                resolve(formatAddresses as R);
            });
        });
    }

    check<R>(email: string): Promise<R> {
        return new Promise((resolve, reject) => {
            dns.resolveMx(email, (err, addresses) => {
                if (err) {
                    resolve(false as R);
                }
                resolve(true as R);
            });
        });
    }
}
