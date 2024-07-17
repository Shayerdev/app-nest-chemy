import {IsBoolean, IsEmail, IsEnum, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {ENetworkCollectionName} from "@app/shared/enums/ECollectionNetworksName";

export class CheckNetworkRequestDto {
    @ApiProperty({
        description: 'Set network for check',
        required: true,
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: 'Set network name',
        required: true,
        enum: ENetworkCollectionName
    })
    @IsEnum(ENetworkCollectionName)
    readonly network: ENetworkCollectionName

    @ApiProperty({
        description: 'Check useragent'
    })
    @IsOptional()
    @IsBoolean()
    readonly useragent: boolean

    @ApiProperty({
        description: 'Check proxy'
    })
    @IsOptional()
    @IsBoolean()
    readonly proxy: boolean
}
