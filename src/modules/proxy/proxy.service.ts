import {Injectable} from "@nestjs/common";
import {Prisma, Proxy} from "@prisma/client";
import ProxyRepository from "@modules/proxy/proxy.repository";
import ProxyCreateDto from "@modules/proxy/dto/proxy.create.dto";

@Injectable()
export default class ProxyService {
    /**
     * Construct
     *
     * @param proxyRepository
     */
    constructor(
        private readonly proxyRepository: ProxyRepository
    ) {
    }

    public async getAll(): Promise<Proxy[]> {
        return await this.proxyRepository.getAll({});
    }

    /**
     * @param dto
     */
    public async append(dto: ProxyCreateDto): Promise<Proxy> {
        return await this.proxyRepository.create(dto);
    }

    /**
     * @param searchBy
     * @param dto
     */
    public async update(searchBy: Prisma.ProxyWhereInput, dto: ProxyCreateDto): Promise<Proxy> {
        const {id} = await this.proxyRepository.getOne({id: searchBy.id});
        return await this.proxyRepository.update({id}, dto);
    }

    /**
     * @param searchBy
     */
    public async delete(searchBy: Prisma.ProxyWhereInput): Promise<Proxy> {
        return await this.proxyRepository.delete({id: searchBy.id});
    }
}
