import {Injectable} from "@nestjs/common";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {EmulateInterface} from "@modules/check/networks/factory/networks/emulate/emulate.interface";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {Page} from "puppeteer";

@Injectable()
export default class EmulateAmazon implements EmulateInterface {
    async execute(
        page: Page,
        dto: CheckNetworkRequestDto
    ): Promise<INetwork> {
        try {
            const detectCaptcha = await page.$('form[action="/errors/validateCaptcha"]');

            if (detectCaptcha) {
                return {
                    email: dto.email,
                    active: false,
                    name: dto.network,
                    captcha: true
                }
            }

            await page.type('#ap_email', dto.email, {delay: 80});
            await page.click('#continue', {delay: 1000,});
            await page.waitForNavigation();

            try {
                await page.waitForSelector('#auth-error-message-box', {timeout: 3000});
                return {
                    email: dto.email,
                    name: dto.network,
                    active: false
                }
            } catch (e: unknown) {
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
