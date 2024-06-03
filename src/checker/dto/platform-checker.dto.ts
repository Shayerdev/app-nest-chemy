import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlatformCheckerDto {
    @ApiProperty({
        description: 'Set SOCKS or HTTP proxy',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly proxy?: string;

    @ApiProperty({
        description: 'Set only desktop useragent',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly useragent?: string;

    @ApiProperty({
        description: 'Email for check platform',
        required: true,
        default: 'fuckyou@gmail.com',
    })
    @IsEmail()
    readonly email: string;
}
