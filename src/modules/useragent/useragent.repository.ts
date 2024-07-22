import {Prisma, Proxy, Useragent} from "@prisma/client";
import {Inject, Injectable} from "@nestjs/common";
import {ConnectionInterface} from "@common/services/database/connection.interface";
import {IRandomRowRepository} from "@app/shared/interfaces/random-row.repository";

@Injectable()
export default class UseragentRepository
{
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
    public async getAll(query: Prisma.UseragentWhereInput): Promise<Useragent[]> {
        return await this.connection.findMany<Useragent>(this.modelName, query);
    }

    /**
     * Get Item
     *
     * @param query
     */
    public async getOne(query: Prisma.UseragentWhereInput): Promise<Useragent> {
        return await this.connection.findUniqueOrThrow<Useragent>(this.modelName, query)
    }

    /**
     * Create Item
     *
     * @param data
     */
    public async create(data: Prisma.UseragentCreateInput): Promise<Useragent> {
        return await this.connection.create<Useragent>(this.modelName, data);
    }

    /**
     * Delete Item
     *
     * @param query
     */
    public async delete(query: Prisma.UseragentWhereInput): Promise<Useragent> {
        return await this.connection.delete<Useragent>(this.modelName, query);
    }

    /**
     * Delete Item
     *
     * @param searchParam
     * @param data
     */
    public async update(
        searchParam: Prisma.UseragentWhereInput,
        data: Prisma.UseragentCreateInput
    ): Promise<Useragent> {
        return await this.connection.update<Useragent>(this.modelName, searchParam, data);
    }

    /**
     * Get Random Row
     */
    public async getRandomRow<T>(): Promise<T> {
        console.log('Is Useragent')
        return await this.connection.getRandomRow<T>(this.modelName);
    }
}
