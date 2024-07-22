import {Module} from "@nestjs/common";
import InvisibleFactoryService from "@common/services/invisible/invisible.factory.service";
import UseragentAttribute from "@common/services/invisible/factory/attributes/useragent.attribute";
import ProxyAttribute from "@common/services/invisible/factory/attributes/proxy.attribute";
import {IAttributeInvisible} from "@common/services/invisible/factory/attributes/attributes.interface";
import UseragentModule from "@modules/useragent/useragent.module";
import UseragentRepository from "@modules/useragent/useragent.repository";
import ProxyRepository from "@modules/proxy/proxy.repository";
import BuilderProxy from "@utils/builder.proxy";
import ProxyModule from "@modules/proxy/proxy.module";

@Module({
    imports: [UseragentModule, ProxyModule],
    providers: [
        InvisibleFactoryService,
        UseragentAttribute,
        ProxyAttribute,
        {
            provide: 'INVISIBLE_FACTORIES',
            useFactory: (...attributes: IAttributeInvisible[]) => {
                return attributes;
            },
            inject: [UseragentAttribute, ProxyAttribute]
        },
        {
            provide: "REPOSITORY_USERAGENT",
            useClass: UseragentRepository
        },
        {
            provide: "REPOSITORY_PROXY",
            useClass: ProxyRepository
        },
        {
            provide: 'BUILDER_PROXY',
            useClass: BuilderProxy
        }
    ],
    exports: [InvisibleFactoryService]
})
export default class InvisibleModule {
}
