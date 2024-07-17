import {Injectable} from "@nestjs/common";
import {NetworkService} from "@modules/check/networks/factory/network.service";
import {CheckerNetworkRepository} from "@modules/check/networks/checker-network.repository";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";

@Injectable()
export class CheckerNetworkService {
    constructor(
        private readonly networkService: NetworkService,
        private readonly checkerNetworkRepository: CheckerNetworkRepository
    ) {
    }

    async getEmailStatusByNetworkName(dto: CheckNetworkRequestDto): Promise<any>
    {
        try {
            const email = dto.email;
            return await this.checkerNetworkRepository.getUnique({
                email: email,
                name: dto.network,
                expired: {
                    gt: Math.floor(Date.now() / 1000),
                }
            })
        } catch (e: unknown) {
            const currentUnixTime = Math.floor(Date.now() / 1000);
            const expiredDays = 10 * 24 * 60 * 60 * 1000;
            const expired = currentUnixTime + expiredDays;

            const result = await this.networkService.check(dto);
            return await this.checkerNetworkRepository.insert({
                ...result,
                expired
            });
        }
    }
}
