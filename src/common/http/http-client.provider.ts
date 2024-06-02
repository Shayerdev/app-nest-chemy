import { Provider } from '@nestjs/common';
import {AxiosHttpClient} from "./client/axios-http-client";

export const HttpClientProvider: Provider = {
    provide: 'HttpClient',
    useClass: AxiosHttpClient,
};
