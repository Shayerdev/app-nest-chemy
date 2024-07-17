export interface ConnectionInterface
{
    findMany<T>(model: string, where?: any): Promise<T[]>;
    findOne<T>(model: string, where?: any): Promise<T | null>;
    findUnique<T>(model: string, where?: any): Promise<T | null>;
    findUniqueOrThrow<T>(model: string, where?: any): Promise<T | null>;
    create<T>(model: string, data: any): Promise<T>;
    update<T>(model: string, where: any, data: any): Promise<T>;
    delete<T>(model: string, where: any): Promise<T>;
}
