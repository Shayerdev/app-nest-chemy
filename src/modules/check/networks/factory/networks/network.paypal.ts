import {Page} from 'puppeteer';
import {Inject} from "@nestjs/common";
import {INetworkFactory} from "@modules/check/networks/factory/network.factory.interface";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {EmulatorInterface} from "@common/services/emulators/emulator.interface";
import {EmulateInterface} from "@modules/check/networks/factory/networks/emulate/emulate.interface";
import {ENetworkCollectionName} from "@app/shared/enums/ECollectionNetworksName";

export class NetworkPaypal implements INetworkFactory {
    /**
     *
     * @param emulator
     * @param emulatePaypal
     */
    constructor(
        @Inject('EMULATOR')
        private readonly emulator: EmulatorInterface,
        @Inject('EMULATE_PAYPAL')
        private readonly emulatePaypal: EmulateInterface
    ) {
    }

    /**
     *
     * @private
     */
    private checkPage: string = 'https://www.paypal.com/authflow/password-recovery/';

    getName(name: ENetworkCollectionName): boolean {
        return name === ENetworkCollectionName.paypal;
    }

    async getResult(dto: CheckNetworkRequestDto): Promise<INetwork> {
        const emulatorInit = await this.emulator.setUp<Page>({
            goTo: this.checkPage,
            useragent: 'asd',
            proxy: 'ad',
        });

        try {
            return await this.emulatePaypal.execute(emulatorInit, dto);
        } catch (e: unknown) {
            throw new Error(e as string);
        } finally {
            await this.emulator.shutDown();
        }
    }
}
