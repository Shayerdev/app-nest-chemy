import {IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString} from 'class-validator';
import {ProxyType, ProxyStatus} from "@prisma/client";

export default class ProxyCreateDto
{
    @IsEnum(ProxyType)
    @IsOptional()
    type?: ProxyType

    @IsString()
    host: string

    @IsString()
    port: string

    @IsString()
    username: string

    @IsString()
    password: string

    @IsBoolean()
    @IsOptional()
    active?: boolean

    @IsEnum(ProxyStatus)
    @IsOptional()
    status: ProxyStatus

    @IsDate()
    @IsOptional()
    updatedAt: string
}
