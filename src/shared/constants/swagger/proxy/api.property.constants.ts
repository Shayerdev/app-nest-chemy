import {ApiPropertyOptions} from "@nestjs/swagger";
import {ProxyStatus, ProxyType} from "@prisma/client";


export const apiPropertyIdField: ApiPropertyOptions = {
    description: 'Proxy ID',
}

export const apiPropertyTypeField: ApiPropertyOptions = {
    description: 'Proxy Type',
    enum: ProxyType
}

export const apiPropertyHostField: ApiPropertyOptions = {
    description: 'Proxy host',
    required: true,
    enum: ProxyType
}

export const apiPropertyPortField: ApiPropertyOptions = {
    description: 'Proxy port',
    required: true,
}

export const apiPropertyUsernameField: ApiPropertyOptions = {
    description: 'Proxy username',
    required: true,
}

export const apiPropertyPasswordField: ApiPropertyOptions = {
    description: 'Proxy password',
    required: true,
}

export const apiPropertyActiveField: ApiPropertyOptions = {
    description: 'Proxy active state',
}

export const apiPropertyStatusField: ApiPropertyOptions = {
    description: 'Proxy status',
    required: true,
    enum: ProxyStatus
}

export const apiPropertyUpdateAtField: ApiPropertyOptions = {
    description: 'Proxy date Update',
}
