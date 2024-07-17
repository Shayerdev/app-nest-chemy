import {Inject, Injectable} from "@nestjs/common";
import {EmulatorInterface} from "@common/services/emulators/emulator.interface";
import puppeteer, {Browser, Page} from "puppeteer";
import {EmulatorSetupDataInterface} from "@common/services/emulators/emulator.setup.data.interface";

@Injectable()
export class PuppeteerService implements EmulatorInterface
{
    /**
     *
     * @private
     */
    private page: Page;

    /**
     *
     * @private
     */
    private browser: Browser;

    /**
     *
     * @param args
     */
    async setUp<T>(
        args: EmulatorSetupDataInterface
    ): Promise<T> {
        const browser =  await puppeteer.launch({
            headless: true,
            ignoreHTTPSErrors: true,
            channel: 'chrome',
            args: ['--no-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto(args.goTo);

        // if (dto.useragent) await page.setUserAgent(dto.useragent && "useragent");

        this.browser = browser;
        this.page = page;

        return page as T;
    }

    async shutDown(): Promise<any> {
        await this.page.close();
        await this.browser.close();
    }
}
