import {Injectable} from "@nestjs/common";
import puppeteer, {Page} from 'puppeteer';
import {PlatformCheckerDto} from "../dto/platform-checker.dto";

@Injectable()
export class StripeService {
    private checkPage: string = "https://dashboard.stripe.com/register";
    private waitTime: number = 3000;

    private async launch(proxy?: string|undefined){
        const args = [];

        if(proxy)
            args.push(`--proxy-server:${proxy}`);

        return await puppeteer.launch({
            headless: false,
            channel: "chrome",
            args: args
        })
    }

    async check (
        dto: PlatformCheckerDto
    ) {
        // Launch the PayPal browser
        const browser = await this.launch(dto.proxy);

        // Create Page
        const page = await browser.newPage();

        // Set UserAgent
        if(dto.useragent)
            await page.setUserAgent(dto.useragent);

        // Go to checker page
        await page.goto(this.checkPage);

        try {
            return await this.checkEmailExist(page, dto.email);
        }
        catch (e: unknown){
            throw new Error(e as string);
        }
        finally {
           // await page.close();
            //await browser.close();
        }

    }

    async checkImageCaptcha (
        page: Page
    ) {
        return new Promise( async (resolve) => {
            const captchaFrame = await page.waitForSelector("iframe[src*='captcha']");
            captchaFrame
                ? resolve(true)
                : resolve(false)
        });
    }

    async checkEmailExist(
        page: Page,
        email: string
    ) {
        return new Promise(async (
            resolve,
            reject
        ) => {
            try {
                // Append field User data to form Input
                await page.type("#register-email-input", email);
                await page.type("#register-name-input", "Ivan Ivanov");
                await page.type("#register-password-input-with-description", "*jOJou88jnKBBUibjbbjk_biBiuBYyiyhjBHBIUk");
                await page.waitForSelector(".db-RegisterPasswordInputStrengthDescription-enter-done");
                await new Promise(res => setTimeout(() => res(true), 1500))
                await page.click('button.Button-element', {
                    delay: 1500
                });

                const checkCaptcha = await this.checkImageCaptcha(page);
                if(checkCaptcha)
                    resolve({ email, captcha: true })

                try {
                    await page.waitForSelector(".db-RegisterFormField-formError", {
                        timeout: this.waitTime
                    });

                    resolve({
                        email, active: true
                    })
                }
                catch (e: unknown) {
                    resolve({
                        email, active: false
                    })
                }

            }
            catch (e: unknown){
                reject('Some error with check email exist');
            }
        })
    }
}