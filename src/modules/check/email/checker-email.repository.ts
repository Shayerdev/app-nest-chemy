import {Inject, Injectable} from "@nestjs/common";
import {ConnectionInterface} from "@common/services/database/connection.interface";
import {Emails, Prisma} from "@prisma/client";

@Injectable()
export class CheckerEmailRepository {
    constructor(
        @Inject("DATABASE") private readonly connection: ConnectionInterface,
        @Inject('MODEL_NAME') private readonly modelName: string
    ) {
    }

    /**
     *
     * @param query
     */
    public async insert(query: Prisma.EmailsCreateInput): Promise<Emails>
    {
        return await this.connection.create(this.modelName, query);
    }

    /**
     *
     * @param query
     */
    public async getUnique(query: Prisma.EmailsWhereUniqueInput): Promise<Emails|null>
    {
        return await this.connection.findUniqueOrThrow<Emails>(this.modelName, query);
    }
}
