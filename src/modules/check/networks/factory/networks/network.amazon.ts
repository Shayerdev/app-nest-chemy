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

export class NetworkAmazon implements INetworkFactory {
    /**
     *
     * @param emulator
     * @param emulateAmazon
     * @param invisibleFactoryService
     */
    constructor(
        @Inject('EMULATOR') private readonly emulator: EmulatorInterface,
        @Inject('EMULATE_AMAZON') private readonly emulateAmazon: EmulateInterface,
        private readonly invisibleFactoryService: InvisibleFactoryService
    ) {
    }

    /**
     *
     * @private
     */
    private checkPage: string = 'https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0';

    getName(name: ENetworkCollectionName): boolean {
        return name === ENetworkCollectionName.amazon;
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
            return await this.emulateAmazon.execute(emulatorInit, dto);
        } catch (e: unknown) {
            throw new Error(e as string);
        } finally {
            await this.emulator.shutDown();
        }
    }
}
