import {Injectable} from "@nestjs/common";
import {PlatformCheckerDto} from "../dto/platform-checker.dto";
import AmazonCaptchaPlugin from "@mihnea.dev/puppeteer-extra-amazon-captcha";
import puppeteerExtra from 'puppeteer-extra';
import puppeteer, {Page} from 'puppeteer';
import {captchaImageWithTextByUrl} from "../../utils/captcha-image";

@Injectable()
export class AmazonService {
    private checkPage: string =  "https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2F%3Fref_%3Dnav_custrec_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0";
    private waitTime:number = 3000;

    private async launch(proxy?: string|undefined){
        const args = [];

        if(proxy)
            args.push(`--proxy-server:${proxy}`);

        //Not work. Fix this
        //await puppeteerExtra.use(AmazonCaptchaPlugin());

        return await puppeteerExtra.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            channel: "chrome",
            args: args
        })
    }

    async check(
        dto: PlatformCheckerDto
    ) {
        // Launch the browser
        const browser = await this.launch(dto.proxy);

        // Create Page
        const page = await browser.newPage();

        // Set UserAgent
        if(dto.useragent)
            await page.setUserAgent(dto.useragent);

        // Go to checker page
        await page.goto(this.checkPage);

        try {
            // Check exist captcha form
            // const skipCaptcha = await this.checkImageCaptcha(page);
            // if(!skipCaptcha)
            //     return { captcha: true, email: dto.email }
            // Check exist user
            return await this.checkEmailExist(page, dto.email);
        } catch (e: unknown) {
            throw new Error(e as string);
        } finally {
            await page.close();
            await browser.close();
        }
    }

    async checkImageCaptcha (
        page: Page
    ) {
        return new Promise( async  (resolve, reject) => {
            try {
                const captchaTest = await page.$('form[action="/errors/validateCaptcha"]');
                if(captchaTest) {

                    // Get attr src img captcha
                    const srcImgCaptcha = await page.evaluate(() => {
                        const tagImgCaptcha = document.querySelector('img[src*="captcha"]');
                        return tagImgCaptcha ? tagImgCaptcha.getAttribute('src') : null;
                    });

                    if(!srcImgCaptcha)
                        resolve(true);

                    const renderTextImgCaptcha = await captchaImageWithTextByUrl(srcImgCaptcha);

                    //console.log(renderTextImgCaptcha);
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
            catch (e:unknown) {
                reject('Some error with check image captcha');
            }
        })
    }

    async checkEmailExist(
        page: Page,
        email: string
    ) {
        return new Promise( async (
            resolve,
            reject
        ) => {
            try {
                // Append field User data to form Input
                await page.type("#ap_email", email, {
                    delay: 80
                });

                // Click validate Form
                await page.click("#continue", {
                    delay: 1000,
                });

                // Wait Redirect Validate Form
                await page.waitForNavigation();

                try {
                    // Wait response error box
                    await page.waitForSelector("#auth-error-message-box", {
                        timeout: this.waitTime
                    });
                    resolve({
                        email, active: false
                    })
                }
                catch (e: unknown) {
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