import {Module} from "@nestjs/common";
import {ModelNameProvider} from "@modules/useragent/model-name.provider";
import UseragentRepository from "@modules/useragent/useragent.repository";
import UseragentService from "@modules/useragent/useragent.service";
import UseragentController from "@modules/useragent/useragent.controller";

@Module({
    controllers: [UseragentController],
    providers: [
        ModelNameProvider,
        UseragentService,
        UseragentRepository
    ],
    exports: [UseragentRepository, ModelNameProvider]
})
export default class UseragentModule {}
