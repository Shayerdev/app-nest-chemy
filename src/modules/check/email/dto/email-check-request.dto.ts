import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailCheckRequestDto {
    @ApiProperty({
        description: 'Set email for check active status',
        required: true,
    })
    @IsEmail()
    readonly email: string;
}
