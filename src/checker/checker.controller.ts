import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException, HttpStatus
} from '@nestjs/common';
import {PlatformCheckerDto} from "./dto/platform-checker.dto";
import {AmazonService} from "./services/amazon.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Checker platform')
@Controller('checker')
export class CheckerController {
  constructor(
      private readonly amazonService: AmazonService
  ) {}

  @ApiOperation({
    summary: 'Check exist email from amazon',
    description: 'This endpoint create for check user email from amazon service '
  })
  @Post('/amazon')
  @UsePipes(new ValidationPipe())
  checkAmazon(
      @Body() dto: PlatformCheckerDto
  ) {
    try {
      return this.amazonService.check(dto);
    }
    catch (e: unknown){
      if(e instanceof Error)
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
