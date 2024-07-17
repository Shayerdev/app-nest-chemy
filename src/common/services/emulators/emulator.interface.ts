import {EmulatorSetupDataInterface} from "@common/services/emulators/emulator.setup.data.interface";

export interface EmulatorInterface
{
    setUp<T>(args: EmulatorSetupDataInterface): Promise<T>;
    shutDown(): Promise<any>;
}
