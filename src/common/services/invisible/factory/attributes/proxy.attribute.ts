import {IAttributeInvisible} from "@common/services/invisible/factory/attributes/attributes.interface";
import {Inject} from "@nestjs/common";
import {IRandomRowRepository} from "@app/shared/interfaces/random-row.repository";
import BuilderProxy from "@utils/builder.proxy";
import {Proxy} from "@prisma/client";
import {ECollectionInvisibleService} from "@app/shared/enums/ECollectionInvisibleService";

export default class ProxyAttribute implements IAttributeInvisible
{
    private attributeName = ECollectionInvisibleService.proxy;

    constructor(
        @Inject("REPOSITORY_PROXY")
        private readonly proxyRepository: IRandomRowRepository,
        @Inject("BUILDER_PROXY")
        private readonly builderProxy: BuilderProxy
    ) {
    }

    /**
     *
     * @param name
     */
    getName(name: ECollectionInvisibleService.proxy): boolean {
        return name === this.attributeName;
    }

    public async execute(): Promise<string|null> {
        const result =  await this.proxyRepository.getRandomRow<Proxy>();
        return this.builderProxy
            .setType(result.type)
            .setHost(result.host)
            .setPort(result.port)
            .setUsername(result.username)
            .setPassword(result.password)
            .build();
    }
}
