import {Inject, Injectable} from "@nestjs/common";
import {IAttributeInvisible} from "@common/services/invisible/factory/attributes/attributes.interface";
import {ECollectionInvisibleService} from "@app/shared/enums/ECollectionInvisibleService";

@Injectable()
export default class InvisibleFactoryService {
    constructor(
        @Inject('INVISIBLE_FACTORIES')
        private readonly attributeFactory: IAttributeInvisible[]
    ) {
    }

    /**
     * @param name
     */
    public async getResult(name: ECollectionInvisibleService): Promise<string> {
        const attribute = this.attributeFactory.find(factory => factory.getName(name));

        if (!attribute)
            throw new Error(`Attribute ${name} not found`);


        return await attribute.execute();
    }
}
