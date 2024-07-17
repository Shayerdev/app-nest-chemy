import {IsBoolean, IsEmail, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailCheckRequestDto {
    @ApiProperty({
        description: 'Set email for check',
        required: true,
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: 'Set checker name',
        required: true,
    })
    @IsString()
    readonly checker: string
}
