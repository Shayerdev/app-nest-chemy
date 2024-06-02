import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CheckerModule} from './checker/checker.module';
import {ConfigModule} from '@nestjs/config';
import {EmailModule} from "./modules/check/email/email.module";

@Module({
    imports: [
        CheckerModule,
        EmailModule,
        ConfigModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
