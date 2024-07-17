import {Inject} from "@nestjs/common";
import {HttpClientInterface} from "@commonHttp/http-client.interface";
import BuilderUrl from "@utils/builder.url";
import {ICheckerFactory} from "../checker.factory.interface";
import {ICheckerWhoisxml} from "./checker.whoisxml.interface";
import {ICheckerConverter} from "../converters/converter.interface";
import CheckerBuilder from "../checker.builder";
import {IChecker} from "../checker.interface";
import TokenCheckerService from "@modules/tokens/checker/email/token-checker.service";
import {ECollectionCheckerService} from "@prisma/client";

export class CheckerWhoisxml implements ICheckerFactory {
    /**
     * Checker service name
     *
     * @private
     */
    private serviceName: ECollectionCheckerService = 'whoisxml';

    /**
     * Api url
     *
     * @private
     */
    private apiUrl = 'https://emailverification.whoisxmlapi.com/api/v3';

    /**
     * Api key
     *
     * @private
     */
    private apiKey = 'at_4lURK4O47PVKjWydEi8xh14e4zVSC';

    /**
     * Product id for Api
     *
     * @private
     */
    private productId = 7;

    constructor(
        @Inject('HttpClient') private readonly httpClient: HttpClientInterface,
        @Inject('ConverterWhoisxml') private readonly convert: ICheckerConverter,
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
            productId: this.productId,
            apiKey: tokenData.token,
            emailAddress: email,
        });

        // Api Query
        const resultApiQuery = await this.httpClient.get<ICheckerWhoisxml>(buildQueryUrl);
        // Convert api query
        const resultConverted = this.convert.convert(resultApiQuery);
        // Build Data
        return this.checkerBuilder.getData(email, resultConverted);
    }
}
