import {Injectable} from "@nestjs/common";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {EmulateInterface} from "@modules/check/networks/factory/networks/emulate/emulate.interface";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {Page} from "puppeteer";

@Injectable()
export default class EmulateStripe implements EmulateInterface {
    async execute(
        page: Page,
        dto: CheckNetworkRequestDto
    ): Promise<INetwork> {
        try {
            await page.type('#register-email-input', dto.email);
            await page.type('#register-name-input', 'Ivan Ivanov');
            await page.type(
                '#register-password-input-with-description',
                '*jOJou88jnKBBUibjbbjk_biBiuBYyiyhjBHBIUk',
            );
            await page.waitForSelector('.db-RegisterPasswordInputStrengthDescription-enter-done');
            await new Promise((res) => setTimeout(() => res(true), 1500));
            await page.click('button.Button-element', {
                delay: 1500,
            });

            const captchaFrame = await page.waitForSelector("iframe[src*='captcha']");
            if (captchaFrame) {
                return {
                    email: dto.email,
                    name: dto.network,
                    captcha: true,
                    active: false
                }
            }

            try {
                await page.waitForSelector('.db-RegisterFormField-formError', {timeout: 3000});
                return {
                    email: dto.email,
                    name: dto.network,
                    active: true
                }
            } catch (e: unknown) {
                return {
                    email: dto.email,
                    name: dto.network,
                    active: false
                }
            }
        } catch (e: unknown) {
            return Promise.reject(`${dto.network} return invalid response by email ${dto.email}`);
        }
    }
}
