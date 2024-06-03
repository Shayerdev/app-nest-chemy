import { Controller, Post, Inject, Body, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { IEmailCheckerInterface } from './interfaces/email.interface';
import { EmailCheckRequestDto } from './dto/email-check-request.dto';
import { EmailCheckResponseDto } from './dto/email-check-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Checker email by Email Verifier')
@Controller('check/email/emailverifier')
export class EmailverifierController {
    constructor(
        @Inject('EmailVerifier')
        private readonly emailCheckerWhoisxmlAdapter: IEmailCheckerInterface,
    ) {}

    @ApiOperation({
        summary: 'Check exist email',
        description: 'some description for method',
    })
    @Post()
    @UsePipes(new ValidationPipe())
    async check(
        @Body()
        dto: EmailCheckRequestDto,
    ): Promise<EmailCheckResponseDto> {
        try {
            // Get data from service
            const resultCheck = await this.emailCheckerWhoisxmlAdapter.check(dto);
            // Response data
            return { success: true, data: resultCheck };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Api error',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }
}
