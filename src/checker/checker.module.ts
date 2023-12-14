import { Module } from '@nestjs/common';
import { CheckerController } from './checker.controller';
import {AmazonService} from "./services/amazon.service";


@Module({
  controllers: [CheckerController],
  providers: [AmazonService],
  //imports: [AmazonService]
})
export class CheckerModule {}
