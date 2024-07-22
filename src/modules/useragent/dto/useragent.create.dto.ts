import {IsBoolean, IsOptional, IsString} from 'class-validator';

import {ApiProperty} from "@nestjs/swagger";
import {
    apiPropertyUseragentField,
    apiPropertyActiveField
} from "@constants/swagger/useragent/api.property.constants";

export default class UseragentCreateDto {
    @ApiProperty(apiPropertyUseragentField)
    @IsString()
    useragent: string

    @ApiProperty(apiPropertyActiveField)
    @IsBoolean()
    @IsOptional()
    active?: boolean
}
