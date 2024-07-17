import {Inject} from "@nestjs/common";
import {HttpClientInterface} from "@commonHttp/http-client.interface";
import BuilderUrl from "@app/utils/builder.url";
import {ICheckerFactory} from "../checker.factory.interface";
import {ICheckerConverter} from "../converters/converter.interface";
import CheckerBuilder from "../checker.builder";
import {IChecker} from "../checker.interface";
import {ICheckerEmailverifier} from "./checker.emailverifier.interface";
import {ECollectionCheckerService} from "@prisma/client";
import TokenCheckerService from "@modules/tokens/checker/email/token-checker.service";

export class CheckerEmailverifier implements ICheckerFactory {
    /**
     * Checker service name
     *
     * @private
     */
    private serviceName: ECollectionCheckerService = 'emailverifier';

    /**
     * Api url
     *
     * @private
     */
    private apiUrl = 'https://apps.emaillistverify.com/api/verifyEmail';

    constructor(
        @Inject('HttpClient') private readonly httpClient: HttpClientInterface,
        @Inject('ConverterEmailverifier') private readonly convert: ICheckerConverter,
        private readonly tokenCheckerService: TokenCheckerService,
        private readonly checkerBuilder: CheckerBuilder
    ) {}

    /**
     * Method for get checker name
     *
     * @param name
     */
    getName(name: string): boolean {
        return name === this.serviceName;
    }

    /**
     *
     * @param email
     */
    async getResult(email: string): Promise<IChecker> {
        const tokenData = await this.tokenCheckerService.getOneBy({
            checker: this.serviceName,
            active: true
        });

        // Build Api url query
        const buildQueryUrl = BuilderUrl.buildUrlWithParam(this.apiUrl, {
            secret: tokenData.token,
            email: email,
        });

        // Api Query
        const resultApiQuery = await this.httpClient.get<ICheckerEmailverifier>(buildQueryUrl);
        // Convert api query
        const resultConverted = this.convert.convert(resultApiQuery);
        // Build Data
        return this.checkerBuilder.getData(email, resultConverted);
    }
}
