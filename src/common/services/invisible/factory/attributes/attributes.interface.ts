import {ECollectionInvisibleService} from "@app/shared/enums/ECollectionInvisibleService";

export interface IAttributeInvisible {
    getName(name: ECollectionInvisibleService): boolean;
    execute(): Promise<string|null>;
}
