import {IEmailCheckerInterface, IEmailCheckerResultInterface} from "../interfaces/email.interface";
import {EmailCheckDtoInterface} from "../interfaces/email-check-dto.interface";
import {Inject} from "@nestjs/common";
import {HttpClient} from "../../../../common/http/http-client.interface";
import {EmailCheckerWhoisxmlResponseInterface} from "../interfaces/email-checker-whoisxml-response.interface";
import {EmailCheckerConverterFactory} from "../convert/email-checker-converter.factory";

export class EmailCheckerWhoisxmlAdapter implements IEmailCheckerInterface
{
    /**
     * Api url
     *
     * @private
     */
    #apiUrl = "https://emailverification.whoisxmlapi.com/api/v3";

    /**
     * Api key
     *
     * @private
     */
    #apiKey = "at_4lURK4O47PVKjWydEi8xh14e4zVSC";

    /**
     * Product id for Api
     *
     * @private
     */
    #productId = 7;

    constructor(
        @Inject('HttpClient')
        private readonly httpClient: HttpClient,
        private readonly emailCheckerConverterFactory: EmailCheckerConverterFactory
    ) {
    }

    async check(dto: EmailCheckDtoInterface): Promise<IEmailCheckerResultInterface> {
        try {
            // Build query url api
            const buildApiQueryUrl = this.#buildApiQueryUrl(
                this.#apiUrl, {
                    productId: this.#productId,
                    apiKey: this.#apiKey,
                    emailAddress: dto.email
                }
            )

            // Query to service
            const resultQuery = await this.httpClient.get<EmailCheckerWhoisxmlResponseInterface>(buildApiQueryUrl);

            // Return convert result
            return this.emailCheckerConverterFactory
                .getConverter('whoisxml')
                .convert(resultQuery);
        } catch (e) {
            console.log(e);
        }
    }

    #buildApiQueryUrl(
        url: string,
        objectParam: Record<string, any>
    ): string {
        // Create instance url
        const urlQuery = new URL(url);
        const urlParams = new URLSearchParams(objectParam);

        // Add params
        urlQuery.search = urlParams.toString();
        return urlQuery.toString();
    }
}
