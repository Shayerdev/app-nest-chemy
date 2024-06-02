import {IEmailCheckerResultInterface} from "./email.interface";

export interface EmailCheckerEntityBuildInterface
{
    getData(
        email: string,
        data: IEmailCheckerResultInterface
    ): Promise<IEmailCheckerResultInterface>;
}
