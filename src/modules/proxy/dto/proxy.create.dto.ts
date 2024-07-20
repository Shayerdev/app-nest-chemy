import {IsBoolean, IsDate, IsEnum, IsOptional, IsString} from 'class-validator';
import {ProxyType, ProxyStatus} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {
    apiPropertyActiveField,
    apiPropertyHostField, apiPropertyIdField, apiPropertyPasswordField, apiPropertyPortField, apiPropertyStatusField,
    apiPropertyTypeField, apiPropertyUpdateAtField, apiPropertyUsernameField
} from "@constants/swagger/proxy/api.property.constants";

export default class ProxyCreateDto
{
    @ApiProperty(apiPropertyIdField)
    @IsOptional()
    id?: string

    @ApiProperty(apiPropertyTypeField)
    @IsEnum(ProxyType)
    @IsOptional()
    type?: ProxyType

    @ApiProperty(apiPropertyHostField)
    @IsString()
    host: string

    @ApiProperty(apiPropertyPortField)
    @IsString()
    port: string

    @ApiProperty(apiPropertyUsernameField)
    @IsString()
    username: string

    @ApiProperty(apiPropertyPasswordField)
    @IsString()
    password: string

    @ApiProperty(apiPropertyActiveField)
    @IsBoolean()
    @IsOptional()
    active?: boolean

    @ApiProperty(apiPropertyStatusField)
    @IsEnum(ProxyStatus)
    @IsOptional()
    status: ProxyStatus

    @ApiProperty(apiPropertyUpdateAtField)
    @IsDate()
    @IsOptional()
    updatedAt: string
}
