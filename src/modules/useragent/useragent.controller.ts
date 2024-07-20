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
import {apiTagsConstants} from "@constants/swagger/useragent/api.tags.constants";
import {
    apiOperationAdd,
    apiOperationDelete,
    apiOperationGetAll,
    apiOperationUpdate
} from "@constants/swagger/useragent/api.operation.contants";
import {Request, Response} from "express";
import UseragentCreateDto from "@modules/useragent/dto/useragent.create.dto";
import UseragentService from "@modules/useragent/useragent.service";

@ApiTags(apiTagsConstants)
@Controller('v1/useragent')
export default class UseragentController {
    /**
     * Construct
     *
     * @param useragentService
     */
    constructor(
        private readonly useragentService: UseragentService
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
            const result = await this.useragentService.getAll();
            return response.status(200).json({
                status: 'ok',
                message: 'Get Useragent list',
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
        @Body() dto: UseragentCreateDto,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.useragentService.append(dto);
            return response.status(201).json({
                status: 'ok',
                message: 'New useragent has been added',
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
        @Body() dto: UseragentCreateDto,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.useragentService.update({id}, dto);
            return response.status(201).json({
                status: 'ok',
                message: 'Useragent has been updated',
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
            const result = await this.useragentService.delete({id});
            return response.status(201).json({
                status: 'ok',
                message: 'Useragent has been deleted',
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
