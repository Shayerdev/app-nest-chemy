import {ApiPropertyOptions} from "@nestjs/swagger";

export const apiPropertyUseragentField: ApiPropertyOptions = {
    description: 'Useragent row',
    required: true,
}

export const apiPropertyActiveField: ApiPropertyOptions = {
    description: 'Useragent active state',
}
