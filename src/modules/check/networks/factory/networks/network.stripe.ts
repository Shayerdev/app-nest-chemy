import {Page} from 'puppeteer';
import {Inject} from "@nestjs/common";
import {INetworkFactory} from "@modules/check/networks/factory/network.factory.interface";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {EmulatorInterface} from "@common/services/emulators/emulator.interface";
import {EmulateInterface} from "@modules/check/networks/factory/networks/emulate/emulate.interface";
import {ENetworkCollectionName} from "@app/shared/enums/ECollectionNetworksName";
import InvisibleFactoryService from "@common/services/invisible/invisible.factory.service";
import {ECollectionInvisibleService} from "@app/shared/enums/ECollectionInvisibleService";

export class NetworkStripe implements INetworkFactory {
    /**
     *
     * @param emulator
     * @param emulateStripe
     * @param invisibleFactoryService
     */
    constructor(
        @Inject('EMULATOR') private readonly emulator: EmulatorInterface,
        @Inject('EMULATE_STRIPE') private readonly emulateStripe: EmulateInterface,
        private readonly invisibleFactoryService: InvisibleFactoryService
    ) {
    }

    /**
     *
     * @private
     */
    private checkPage: string = 'https://dashboard.stripe.com/register';

    getName(name: ENetworkCollectionName): boolean {
        return name === ENetworkCollectionName.stripe;
    }

    async getResult(dto: CheckNetworkRequestDto): Promise<INetwork> {
        const useragent = await this.invisibleFactoryService.getResult(ECollectionInvisibleService.useragent);
        const proxy = await this.invisibleFactoryService.getResult(ECollectionInvisibleService.proxy);

        const emulatorInit = await this.emulator.setUp<Page>({
            goTo: this.checkPage,
            useragent: dto.useragent && useragent,
            proxy: dto.proxy && proxy,
        });

        try {
            return await this.emulateStripe.execute(emulatorInit, dto);
        } catch (e: unknown) {
            throw new Error(e as string);
        } finally {
            await this.emulator.shutDown();
        }
    }
}
