import {Injectable, OnModuleInit} from '@nestjs/common';
import {ConnectionInterface} from "../connection.interface";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements ConnectionInterface, OnModuleInit {
    async onModuleInit() {
        this.$connect();
    }

    /**
     *
     * @param model
     * @param args
     */
    async findMany<T>(model: string, args?: any): Promise<T[]> {
        return this[model].findMany(args);
    }

    /**
     *
     * @param model
     * @param where
     */
    async findOne<T>(model: string, where?: any): Promise<T | null> {
        return this[model].findFirst({where});
    }

    /**
     *
     * @param model
     * @param where
     */
    async findUnique<T>(model: string, where?: any): Promise<T | null> {
        return this[model].findUnique({where});
    }

    /**
     *
     * @param model
     * @param where
     */
    async findUniqueOrThrow<T>(model: string, where?: any): Promise<T | null> {
        return this[model].findFirstOrThrow({where});
    }

    /**
     *
     * @param model
     * @param data
     */
    async create<T>(model: string, data: any): Promise<T> {
        return this[model].create({data});
    }

    /**
     *
     * @param model
     * @param where
     * @param data
     */
    async update<T>(model: string, where: any, data: any): Promise<T> {
        return this[model].update({where, data});
    }

    /**
     *
     * @param model
     * @param where
     */
    async delete<T>(model: string, where: any): Promise<T> {
        return this[model].delete({where});
    }
}

