import {Prisma, Proxy} from "@prisma/client";
import {Inject, Injectable} from "@nestjs/common";
import {ConnectionInterface} from "@common/services/database/connection.interface";
import {IRandomRowRepository} from "@app/shared/interfaces/random-row.repository";

@Injectable()
export default class ProxyRepository implements IRandomRowRepository {
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

    /**
     * Get Items List
     *
     * @param query
     */
    public async getAll(query: Prisma.ProxyWhereInput): Promise<Proxy[]> {
        return await this.connection.findMany<Proxy>(this.modelName, query);
    }

    /**
     * Get Item
     *
     * @param query
     */
    public async getOne(query: Prisma.ProxyWhereInput): Promise<Proxy> {
        return await this.connection.findUniqueOrThrow<Proxy>(this.modelName, query);
    }

    /**
     * Create Item
     *
     * @param data
     */
    public async create(data: Prisma.ProxyCreateInput): Promise<Proxy> {
        return await this.connection.create<Proxy>(this.modelName, data);
    }

    /**
     * Delete Item
     *
     * @param query
     */
    public async delete(query: Prisma.ProxyWhereInput): Promise<Proxy> {
        return await this.connection.delete<Proxy>(this.modelName, query);
    }

    /**
     * Delete Item
     *
     * @param searchParam
     * @param data
     */
    public async update(
        searchParam: Prisma.ProxyWhereInput,
        data: Prisma.ProxyCreateInput
    ): Promise<Proxy> {
        return await this.connection.update<Proxy>(this.modelName, searchParam, data);
    }

    /**
     * Get Random Row
     */
    public async getRandomRow<T>(): Promise<T> {
        return await this.connection.getRandomRow<T>(this.modelName);
    }
}
