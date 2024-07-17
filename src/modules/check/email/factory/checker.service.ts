import {Inject, Injectable} from "@nestjs/common";
import {ICheckerFactory} from "./checker.factory.interface";
import {EmailCheckRequestDto} from "../dto/email-check-request.dto";
import {IChecker} from "./checker.interface";

@Injectable()
export class CheckerService {
    constructor(
        @Inject('CHECKER_FACTORIES')
        private readonly checkerFactories: ICheckerFactory[],
    ) {}

    async check(dto: EmailCheckRequestDto): Promise<IChecker> {
        const checker = this.checkerFactories.find(factory => factory.getName(dto.checker));

        if (!checker)
            throw new Error(`Checker ${dto.checker} not found`);

        return await checker.getResult(dto.email);
    }
}
