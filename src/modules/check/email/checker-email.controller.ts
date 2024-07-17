import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {ResponseInclude} from "@decorators/response/response-include.decorator";
import {ResponseIncludeInterceptor} from "@common/interceptors/response/response.interceprot";
import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {EmailCheckRequestDto} from "./dto/email-check-request.dto";
import {CheckerEmailService} from "./checker-email.service";

@ApiTags('Email Checker')
@Controller('check/email')
export default class CheckerEmailController {
    /**
     *
     * @param checkerEmailService
     */
    constructor(
        private readonly checkerEmailService: CheckerEmailService
    ) {}

    @ApiOperation({
        summary: 'Check exist email',
        description: 'some description for method',
    })
    @Post()
    @UsePipes(new ValidationPipe())
    @ResponseInclude('email', 'active', 'mxRecords', 'smtpCheck', 'dnsCheck', 'msgCheck')
    @UseInterceptors(ResponseIncludeInterceptor)
    async check(
        @Body() dto: EmailCheckRequestDto,
    ): Promise<any> {
        try {
            return await this.checkerEmailService.getDataByEmail(dto);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
}
