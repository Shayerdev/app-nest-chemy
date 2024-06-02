import {IEmailCheckerResultInterface} from "../interfaces/email.interface";

export class EmailCheckResponseDto {
    success: boolean
    data: IEmailCheckerResultInterface
}
