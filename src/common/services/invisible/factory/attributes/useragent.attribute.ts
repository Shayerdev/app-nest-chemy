import {Useragent} from "@prisma/client";
import {IAttributeInvisible} from "@common/services/invisible/factory/attributes/attributes.interface";
import {Inject} from "@nestjs/common";
import {IRandomRowRepository} from "@app/shared/interfaces/random-row.repository";
import {ECollectionInvisibleService} from "@app/shared/enums/ECollectionInvisibleService";

export default class UseragentAttribute implements IAttributeInvisible
{
    private attributeName = ECollectionInvisibleService.useragent;

    constructor(
        @Inject('REPOSITORY_USERAGENT')
        private readonly useragentRepository: IRandomRowRepository
    ) {
    }

    getName(name: ECollectionInvisibleService.useragent): boolean {
        return name === this.attributeName;
    }

    public async execute(): Promise<string|null> {
        const result = await this.useragentRepository.getRandomRow<Useragent>();
        return result?.useragent || null;
    }
}
