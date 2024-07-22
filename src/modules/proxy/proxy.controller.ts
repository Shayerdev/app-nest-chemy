import {
    Body,
    Controller, Delete,
    Get,
    HttpException,
    HttpStatus, Param,
    Post, Put,
    Req,
    Res,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {apiTagsConstants} from "@constants/swagger/proxy/api.tags.constants";
import ProxyService from "@modules/proxy/proxy.service";
import {
    apiOperationAdd, apiOperationDelete,
    apiOperationGetAll,
    apiOperationUpdate
} from "@constants/swagger/proxy/api.operation.constants";
import {Request, response, Response} from "express";
import ProxyCreateDto from "@modules/proxy/dto/proxy.create.dto";

@ApiTags(apiTagsConstants)
@Controller('v1/proxy')
export default class ProxyController {
    /**
     * Construct
     *
     * @param proxyService
     */
    constructor(
        private readonly proxyService: ProxyService
    ) {
    }

    /**
     * Get All endpoint
     *
     * @param request
     * @param response
     */
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

    /**
     * Add endpoint
     *
     * @param dto
     * @param response
     */
    @ApiOperation(apiOperationAdd)
    @Post()
    @UsePipes(new ValidationPipe())
    public async add(
        @Body() dto: ProxyCreateDto,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.proxyService.append(dto);
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

    /**
     * Update item endpoint
     *
     * @param id
     * @param dto
     * @param response
     */
    @ApiOperation(apiOperationUpdate)
    @Put(':id')
    @UsePipes(new ValidationPipe())
    public async update(
        @Param('id') id: string,
        @Body() dto: ProxyCreateDto,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.proxyService.update({id}, dto);
            return response.status(201).json({
                status: 'ok',
                message: 'Proxy has been updated',
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

    /**
     *
     * @param id
     * @param response
     */
    @ApiOperation(apiOperationDelete)
    @Delete(':id')
    public async delete(
        @Param('id') id: string,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.proxyService.delete({id});
            return response.status(201).json({
                status: 'ok',
                message: 'Proxy has been deleted',
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
