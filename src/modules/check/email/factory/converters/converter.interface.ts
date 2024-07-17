import {ICheckerConverted} from "./converted.interface";

export interface ICheckerConverter {
    convert<T>(data: T): ICheckerConverted;
}
