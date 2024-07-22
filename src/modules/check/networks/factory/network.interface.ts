import {ENetworkCollectionName} from "@app/shared/enums/ECollectionNetworksName";

export interface INetwork {
    email: string;
    name: ENetworkCollectionName,
    active: boolean;
    captcha?: boolean;
    checkpoint?: string;
}
