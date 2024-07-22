import { Module } from '@nestjs/common';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { HttpClientProvider } from './http-client.provider';

@Module({
    imports: [AxiosHttpModule],
    providers: [HttpClientProvider],
    exports: [HttpClientProvider],
})
export class HttpModule {}
