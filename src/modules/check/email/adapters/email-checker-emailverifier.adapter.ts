import { IEmailCheckerInterface, IEmailCheckerResultInterface } from '../interfaces/email.interface';
import { EmailCheckDtoInterface } from '../interfaces/email-check-dto.interface';
import { Inject } from '@nestjs/common';
import { HttpClient } from '../../../../common/http/http-client.interface';
import { EmailCheckerConverterFactory } from '../convert/email-checker-converter.factory';
import { EmailCheckerEmailverifierResponseInterface } from '../interfaces/email-checker-emailverifier-response.interface';
import { EmailEntityBuilder } from '../build/email-entity.builder';

export class EmailCheckerEmailverifierAdapter implements IEmailCheckerInterface {
    /**
     * Api url
     *
     * @private
     */
    #apiUrl = 'https://apps.emaillistverify.com/api/verifyEmail';

    /**
     * Api key
     *
     * @private
     */
    #apiKey = 'jPlPjjQpyFWyDkB6Aj6Wx';

    constructor(
        @Inject('HttpClient')
        private readonly httpClient: HttpClient,
        private readonly emailCheckerConverterFactory: EmailCheckerConverterFactory,
        private readonly emailEntityBuilder: EmailEntityBuilder,
    ) {}

    async check(dto: EmailCheckDtoInterface): Promise<IEmailCheckerResultInterface> {
        try {
            // Build query url api
            const buildApiQueryUrl = this.#buildApiQueryUrl(this.#apiUrl, {
                secret: this.#apiKey,
                email: dto.email,
            });

            // Query to service
            const resultQuery = await this.httpClient.get<EmailCheckerEmailverifierResponseInterface>(buildApiQueryUrl);

            // Return convert result
            const resultConvert = this.emailCheckerConverterFactory.getConverter('emailverifier').convert(resultQuery);

            // Return check and build valid output response data
            return await this.emailEntityBuilder.getData(dto.email, resultConvert);
        } catch (e) {
            console.log(e);
        }
    }

    #buildApiQueryUrl(url: string, objectParam: Record<string, any>): string {
        // Create instance url
        const urlQuery = new URL(url);
        const urlParams = new URLSearchParams(objectParam);

        // Add params
        urlQuery.search = urlParams.toString();
        return urlQuery.toString();
    }
}
