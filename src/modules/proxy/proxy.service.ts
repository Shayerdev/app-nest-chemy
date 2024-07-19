import {Injectable} from "@nestjs/common";
import {Prisma, Proxy} from "@prisma/client";
import ProxyRepository from "@modules/proxy/proxy.repository";
import ProxyCreateDto from "@modules/proxy/dto/proxy.create.dto";

@Injectable()
export default class ProxyService {
    constructor(
        private readonly proxyRepository: ProxyRepository
    ) {
    }

    public async getAll(): Promise<Proxy[]> {
        return await this.proxyRepository.getAll({});
    }

    public async insert(dto: ProxyCreateDto): Promise<Proxy> {
        return await this.proxyRepository.create(dto);
    }
}
