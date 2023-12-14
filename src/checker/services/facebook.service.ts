import {Injectable} from "@nestjs/common";
import {PlatformCheckerDto} from "../dto/platform-checker.dto";
import puppeteer, {Page} from 'puppeteer';

@Injectable()
export class FacebookService {
    private checkPage: string = "https://www.facebook.com/login/identify/";
    private waitTime:number = 3000;

    private async launch(proxy: string){
        return await puppeteer.launch({
            headless: false,
            channel: "chrome",
            args: [
                `--proxy-server:${proxy}`
            ]
        })
    }

    async check (
        dto: PlatformCheckerDto
    ) {

    }
}