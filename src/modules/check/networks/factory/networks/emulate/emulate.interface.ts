import {Page} from "puppeteer";
import {INetwork} from "@modules/check/networks/factory/network.interface";
import {CheckNetworkRequestDto} from "@modules/check/networks/dto/check-network-request.dto";

export interface EmulateInterface
{
    /**
     *
     * @param page
     * @param dto
     */
    execute(
        page: Page,
        dto: CheckNetworkRequestDto
    ): Promise<INetwork>
}
