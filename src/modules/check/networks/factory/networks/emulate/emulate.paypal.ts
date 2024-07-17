import {Injectable} from "@nestjs/common";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {EmulateInterface} from "@modules/check/networks/factory/networks/emulate/emulate.interface";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {Page} from "puppeteer";

@Injectable()
export default class EmulatePaypal implements EmulateInterface
{
    async execute(
        page: Page,
        dto: CheckNetworkRequestDto
    ): Promise<INetwork> {
        try {
            await page.type('#pwrStartPageEmail', dto.email, {delay: 80});
            await page.click('#pwrStartPageSubmit', {delay: 1000});

            try {
                await page.waitForSelector('#message_pwrStartPageEmail', {timeout: 3000});
                return {
                    email: dto.email,
                    name: dto.network,
                    active: false
                }
            } catch (e:unknown) {
                return {
                    email: dto.email,
                    name: dto.network,
                    active: true
                }
            }
        } catch (e: unknown) {
            return Promise.reject(`${dto.network} return invalid response by email ${dto.email}`);
        }
    }
}
