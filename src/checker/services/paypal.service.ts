import {Injectable} from "@nestjs/common";
import puppeteer, {Page} from 'puppeteer';
import {PlatformCheckerDto} from "../dto/platform-checker.dto";

@Injectable()
export class PaypalService {
    private checkPage: string = "https://www.paypal.com/authflow/password-recovery/";
    private waitTime: number = 3000;

    private async launch(proxy?: string|undefined){
        const args = [];

        if(proxy)
            args.push(`--proxy-server:${proxy}`);

        return await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
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
            await page.close();
            await browser.close();
        }
    }

    async checkEmailExist (
        page: Page,
        email: string
    ) {
        return new Promise( async (
            resolve,
            reject
        ) => {
            try {
                // Append field User data to form Input
                await page.type("#pwrStartPageEmail", email, {
                    delay: 80
                });

                // Click validate Form
                await page.click("#pwrStartPageSubmit", {
                    delay: 1000,
                });

                try {
                    // Wait response error box
                    await page.waitForSelector("#message_pwrStartPageEmail", {
                        timeout: this.waitTime
                    });

                    resolve({
                        email, active: false
                    })

                } catch (e: unknown) {
                    resolve({
                        email, active: true
                    })
                }
            }
            catch (e: unknown) {
                reject('Some error with check email exist');
            }
        })
    }

}