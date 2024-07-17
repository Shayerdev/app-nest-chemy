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
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CheckerNetworkService} from "@modules/check/networks/checker-network.service";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";
import {ResponseInclude} from "@decorators/response/response-include.decorator";
import {ResponseIncludeInterceptor} from "@common/interceptors/response/response.interceprot";

@ApiTags('Network Checker')
@Controller('check/network')
export class CheckerNetworkController {
    constructor(
        private readonly checkerNetworkService: CheckerNetworkService
    ) {
    }

    @ApiOperation({
        summary: 'Check exist email inNetwork',
        description: 'some description for method',
    })
    @Post()
    @UsePipes(new ValidationPipe())
    @ResponseInclude('email', 'active', 'captcha')
    @UseInterceptors(ResponseIncludeInterceptor)
    async check(
        @Body() dto: CheckNetworkRequestDto
    ): Promise<any> {
        try {
            return await this.checkerNetworkService.getEmailStatusByNetworkName(dto);
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
