import {IsEnum, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {ECollectionCheckerService} from "@prisma/client";
import {apiPropertyCheckerField, apiPropertyTokenField} from "@constants/swagger/tokens/api.property.constants";

export class TokenCheckerRequestDto {
    @ApiProperty(apiPropertyTokenField)
    @IsString()
    token: string;

    @ApiProperty(apiPropertyCheckerField)
    @IsEnum(ECollectionCheckerService)
    checker: ECollectionCheckerService;
}
