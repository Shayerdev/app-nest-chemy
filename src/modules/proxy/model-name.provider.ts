import {Provider} from "@nestjs/common";

export const ModelNameProvider: Provider = {
    provide: 'MODEL_NAME',
    useValue: 'Proxy',
};
