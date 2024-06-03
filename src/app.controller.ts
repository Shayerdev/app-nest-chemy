import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({
        summary: 'Root API',
        description: 'Hello world',
    })
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
