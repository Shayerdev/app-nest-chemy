import { DynamicModule, Module, Provider } from "@nestjs/common";
import {ConnectionInterface} from "./connection.interface";

@Module({})
export class DatabaseModule {
    static forRoot(databaseProvider: Provider<ConnectionInterface>): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [databaseProvider],
            exports: [databaseProvider],
        };
    }
}
