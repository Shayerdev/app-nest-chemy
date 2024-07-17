import {ApiPropertyOptions} from "@nestjs/swagger";
import {ECollectionCheckerService} from "@prisma/client";

export const apiPropertyTokenField: ApiPropertyOptions = {
    description: 'Set token for checker',
    required: true,
}

export const apiPropertyCheckerField: ApiPropertyOptions = {
    description: 'Set checker name',
    required: true,
    enum: ECollectionCheckerService
}
