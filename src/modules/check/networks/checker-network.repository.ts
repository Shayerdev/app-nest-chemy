import {Inject} from "@nestjs/common";
import {ConnectionInterface} from "@common/services/database/connection.interface";
import {Networks, Prisma} from "@prisma/client";

export class CheckerNetworkRepository {
    constructor(
        @Inject("DATABASE") private readonly connection: ConnectionInterface,
        @Inject('MODEL_NAME') private readonly modelName: string
    ) {
    }

    /**
     *
     * @param query
     */
    async insert(query: Prisma.NetworksCreateInput): Promise<Networks>
    {
        return await this.connection.create(this.modelName, query);
    }

    async getUnique(query: Prisma.NetworksWhereUniqueInput): Promise<Networks>
    {
        return await this.connection.findUniqueOrThrow(this.modelName, query)
    }

}
