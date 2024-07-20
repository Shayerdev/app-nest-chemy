import {ApiOperationOptions} from "@nestjs/swagger";

export const apiOperationGetAll: ApiOperationOptions = {
    summary: 'Get list of Useragent',
    description: 'some description for method',
}

export const apiOperationAdd: ApiOperationOptions = {
    summary: 'Create Useragent Item',
    description: 'some description for method',
}

export const apiOperationUpdate: ApiOperationOptions = {
    summary: 'Update Useragent Item',
    description: 'some description for method',
}

export const apiOperationDelete: ApiOperationOptions = {
    summary: 'Delete Useragent Item',
    description: 'some description for method',
}
