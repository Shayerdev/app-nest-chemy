import {Inject, Injectable} from "@nestjs/common";
import {INetworkFactory} from "@modules/check/networks/factory/network.factory.interface";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";

@Injectable()
export class NetworkService {
    constructor(
        @Inject('NETWORKS_FACTORIES')
        private readonly checkerFactories: INetworkFactory[],
    ) {
    }

    async check(dto: CheckNetworkRequestDto): Promise<INetwork> {
        const network = this.checkerFactories.find(factory => factory.getName(dto.network));

        if (!network)
            throw new Error(`network ${dto.network} not found`);

        return await network.getResult(dto);
    }
}
