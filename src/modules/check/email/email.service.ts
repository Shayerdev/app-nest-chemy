import { Injectable, Inject } from '@nestjs/common';
import { IEmailCheckerInterface, IEmailCheckerResultInterface } from './interfaces/email.interface';
import { EmailCheckerWhoisxmlAdapter } from './adapters/email-checker-whoisxml.adapter';
import { EmailCheckDtoInterface } from './interfaces/email-check-dto.interface';

@Injectable()
export class EmailService {
    constructor(
        @Inject('EmailCheckerWhoisxmlAdapter')
        private readonly emailCheckerWhoisxmlAdapter: IEmailCheckerInterface,
    ) {}

    check(dto: EmailCheckDtoInterface): Promise<IEmailCheckerResultInterface> {
        return Promise.resolve({
            active: true,
            smtp: [],
        });
    }
}
