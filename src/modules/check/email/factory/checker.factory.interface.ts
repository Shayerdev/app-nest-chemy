import {IChecker} from "./checker.interface";

export interface ICheckerFactory {
    getName(name: string): boolean;
    getResult(email: string): Promise<IChecker>;
}
