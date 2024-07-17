import {Inject, Injectable} from "@nestjs/common";
import {ConnectionInterface} from "@common/services/database/connection.interface";
import {TokensCheckerEmail, Prisma} from "@prisma/client";

@Injectable()
export default class TokenCheckerRepository {
    /**
     * Constructor.
     *
     * @param connection
     * @param modelName
     */
    constructor(
        @Inject("DATABASE") private readonly connection: ConnectionInterface,
        @Inject('MODEL_NAME') private readonly modelName: string
    ) {
    }

    public async insert(
        query: Prisma.TokensCheckerEmailCreateInput
    ): Promise<TokensCheckerEmail> {
        return await this.connection.create(this.modelName, query);
    }

    public async getAll(
        query: Prisma.TokensCheckerEmailFindManyArgs
    ): Promise<TokensCheckerEmail[] | null> {
        return await this.connection.findMany<TokensCheckerEmail>(this.modelName, query);
    }

    public async getOneBy(
        query: Prisma.TokensCheckerEmailWhereInput
    ): Promise<TokensCheckerEmail|null> {
        return await this.connection.findUniqueOrThrow<TokensCheckerEmail>(this.modelName, query)
    }

    public async getOneByToken(
        query: Prisma.TokensCheckerEmailWhereUniqueInput
    ): Promise<TokensCheckerEmail> {
        return await this.connection.findUniqueOrThrow<TokensCheckerEmail>(
            this.modelName,
            query
        )
    }

}
