import {Injectable} from "@nestjs/common";
import {Prisma, Useragent} from "@prisma/client";
import UseragentRepository from "@modules/useragent/useragent.repository";
import UseragentCreateDto from "@modules/useragent/dto/useragent.create.dto";

@Injectable()
export default class UseragentService {
    /**
     * Construct
     *
     * @param useragentRepository
     */
    constructor(
        private readonly useragentRepository: UseragentRepository
    ) {
    }

    public async getAll(): Promise<Useragent[]> {
        return await this.useragentRepository.getAll({});
    }

    /**
     * @param dto
     */
    public async append(dto: UseragentCreateDto): Promise<Useragent> {
        return await this.useragentRepository.create(dto);
    }

    /**
     * @param searchBy
     * @param dto
     */
    public async update(
        searchBy: Prisma.UseragentWhereInput,
        dto: UseragentCreateDto
    ): Promise<Useragent> {
        const {id} = await this.useragentRepository.getOne(searchBy);
        return await this.useragentRepository.update({id}, dto);
    }

    /**
     * @param searchBy
     */
    public async delete(searchBy: Prisma.UseragentWhereInput): Promise<Useragent> {
        return await this.useragentRepository.delete(searchBy);
    }
}
