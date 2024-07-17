import {Injectable} from '@nestjs/common';
import {CheckerEmailRepository} from "./checker-email.repository";
import {CheckerService} from "./factory/checker.service";
import {EmailCheckRequestDto} from "./dto/email-check-request.dto";

@Injectable()
export class CheckerEmailService {
    /**
     * 
     * @param checkerService
     * @param emailRepository
     */
    constructor(
        private readonly checkerService: CheckerService,
        private readonly emailRepository: CheckerEmailRepository
    ) {
    }

    /**
     *
     * @param dto
     */
    async getDataByEmail(dto: EmailCheckRequestDto): Promise<any> {
        try {
            const email = dto.email;
            return await this.emailRepository.getUnique({
                email: email,
                expired: {
                    gt: Math.floor(Date.now() / 1000),
                },
            });
        } catch (e: unknown) {
            const currentUnixTime = Math.floor(Date.now() / 1000);
            const expiredDays = 10 * 24 * 60 * 60 * 1000;
            const expired = currentUnixTime + expiredDays;

            const result = await this.checkerService.check(dto);
            return await this.emailRepository.insert({
                ...result,
                expired
            });
        }
    }
}
