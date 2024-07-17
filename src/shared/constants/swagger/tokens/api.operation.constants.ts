import {ApiOperationOptions} from "@nestjs/swagger";

export const apiOperationGetAll: ApiOperationOptions = {
    summary: 'Get list of Token',
    description: 'some description for method',
}

export const apiOperationGetBySlug: ApiOperationOptions  = {
    summary: 'Get token by slug',
    description: 'some description for method',
}

export const apiOperationCreateToken: ApiOperationOptions = {
    summary: 'Create token',
    description: 'some description for method',
}
