import {ApiOperationOptions} from "@nestjs/swagger";

export const apiOperationGetAll: ApiOperationOptions = {
    summary: 'Get list of Proxy',
    description: 'some description for method',
}

export const apiOperationAdd: ApiOperationOptions = {
    summary: 'Create Proxy Item',
    description: 'some description for method',
}

export const apiOperationUpdate: ApiOperationOptions = {
    summary: 'Update Proxy Item',
    description: 'some description for method',
}

export const apiOperationDelete: ApiOperationOptions = {
    summary: 'Delete Proxy Item',
    description: 'some description for method',
}
