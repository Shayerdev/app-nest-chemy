import {Injectable} from "@nestjs/common";
import {TokenCheckerRequestDto} from "@modules/tokens/checker/email/dto/token-checker.request.dto";
import TokenCheckerRepository from "@modules/tokens/checker/email/token-checker.repository";
import {TokensCheckerEmail, Prisma} from "@prisma/client";

@Injectable()
export default class TokenCheckerService {
    constructor(
        private readonly tokenRepository: TokenCheckerRepository
    ) {
    }

    public async insert(dto: TokenCheckerRequestDto): Promise<any> {
        return await this.tokenRepository.insert(dto);
    }

    public async getOneBy(
        searchCriteria: Prisma.TokensCheckerEmailWhereInput
    ): Promise<TokensCheckerEmail> {
        return await this.tokenRepository.getOneBy(searchCriteria);
    }

    public async getAll(): Promise<any> {
        return await this.tokenRepository.getAll({
            take: 100,
        });
    }
}
