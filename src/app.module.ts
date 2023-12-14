import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CheckerModule} from './checker/checker.module';
import {ConfigModule} from '@nestjs/config';


@Module({
    imports: [
        CheckerModule,
        ConfigModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
