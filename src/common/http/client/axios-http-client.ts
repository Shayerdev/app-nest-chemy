// src/common/http/axios-http-client.ts
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import {HttpClient} from "../http-client.interface";

@Injectable()
export class AxiosHttpClient implements HttpClient {
    constructor(private readonly httpService: HttpService) {}

    async get<T>(url: string, options?: any): Promise<T> {
        const response: AxiosResponse<T> = await lastValueFrom(
            this.httpService.get<T>(url, options)
        );
        return response.data;
    }

    async post<T>(url: string, data: any, options?: any): Promise<T> {
        const response: AxiosResponse<T> = await lastValueFrom(
            this.httpService.post<T>(url, data, options)
        );
        return response.data;
    }
}
