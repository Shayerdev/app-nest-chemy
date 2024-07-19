import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Req,
    Res,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {apiTagsConstants} from "@constants/swagger/proxy/api.tags.constants";
import ProxyService from "@modules/proxy/proxy.service";
import {apiOperationGetAll} from "@constants/swagger/proxy/api.operation.constants";
import {Request, response, Response} from "express";
import ProxyCreateDto from "@modules/proxy/dto/proxy.create.dto";

@ApiTags(apiTagsConstants)
@Controller('v1/proxy')
export default class ProxyController {

    constructor(
        private readonly proxyService: ProxyService
    ) {
    }

    @ApiOperation(apiOperationGetAll)
    @Get()
    public async getAll(
        @Req() request: Request,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.proxyService.getAll();
            return response.status(200).json({
                status: 'ok',
                message: 'Get Proxy list',
                data: result
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async add(
        @Body() dto: ProxyCreateDto,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.proxyService.insert(dto);
            return response.status(201).json({
                status: 'ok',
                message: 'New proxy has been added',
                data: result
            })
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
