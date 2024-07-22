import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post, Req, Res,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {TokenCheckerRequestDto} from "@modules/tokens/checker/email/dto/token-checker.request.dto";
import TokenCheckerService from "@modules/tokens/checker/email/token-checker.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Response, Request} from "express";
import {
    apiOperationCreateToken,
    apiOperationGetAll,
    apiOperationGetBySlug
} from "@constants/swagger/tokens/api.operation.constants";
import {apiTagsControllerName} from "@constants/swagger/tokens/api.tags.constants";

@ApiTags(apiTagsControllerName)
@Controller('v1/tokens/checker/email')
export class TokenCheckerController {
    /**
     * Constructor.
     * @param tokenService
     */
    constructor(
        private readonly tokenService: TokenCheckerService
    ) {
    }

    /**
     * Get list tokens
     *
     * @param request
     * @param response
     */
    @ApiOperation(apiOperationGetAll)
    @Get()
    async getAll(
        @Req() request: Request,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.tokenService.getAll();
            return response.status(200).json({
                status: 'ok',
                message: 'Get all tokens',
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
     * Get token by slug
     *
     * @param token
     * @param response
     */
    @ApiOperation(apiOperationGetBySlug)
    @Get(':token')
    async getOne(
        @Param('token') token: string,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.tokenService.getOneBy({
                token: token
            });
            return response.status(200).json({
                status: 'ok',
                message: 'Get token by slug',
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
     * Create new token
     *
     * @param dto
     * @param response
     */
    @ApiOperation(apiOperationCreateToken)
    @Post()
    @UsePipes(new ValidationPipe())
    async add(
        @Body() dto: TokenCheckerRequestDto,
        @Res() response: Response
    ): Promise<any> {
        try {
            const result = await this.tokenService.insert(dto);
            return response.status(201).json({
                status: 'ok',
                message: 'Token success created',
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
