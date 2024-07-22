import {INetwork} from "@modules/check/networks/factory/network.interface";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {ENetworkCollectionName} from "@app/shared/enums/ECollectionNetworksName";

export interface INetworkFactory {
    getName(name: ENetworkCollectionName): boolean;
    getResult(dto: CheckNetworkRequestDto): Promise<INetwork>;
}
