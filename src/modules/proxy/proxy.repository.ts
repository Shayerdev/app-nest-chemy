import {Prisma, Proxy} from "@prisma/client";
import {Inject, Injectable} from "@nestjs/common";
import {ConnectionInterface} from "@common/services/database/connection.interface";

@Injectable()
export default class ProxyRepository {
    /**
     * Construct.
     *
     * @param connection
     * @param modelName
     */
    constructor(
        @Inject("DATABASE") private readonly connection: ConnectionInterface,
        @Inject('MODEL_NAME') private readonly modelName: string
    ) {
    }

    public async getAll(query: Prisma.ProxyWhereInput): Promise<Proxy[]> {
        return await this.connection.findMany(this.modelName, query);
    }

    public async getOne(query: Prisma.ProxyWhereInput): Promise<Proxy> {
        return await this.connection.findUniqueOrThrow(this.modelName, query);
    }

    public async create(data: Prisma.ProxyCreateInput): Promise<Proxy> {
        return await this.connection.create(this.modelName, data);
    }

    public async delete(query: Prisma.ProxyWhereInput): Promise<any> {
        return await this.connection.delete(this.modelName, query);
    }
}
