import {ProxyType} from "@prisma/client";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class BuilderProxy {
    private type?: ProxyType;
    private host?: string;
    private port?: string;
    private username?: string;
    private password?: string;

    constructor() {}

    public setType(type: ProxyType): BuilderProxy {
        this.type = type;
        return this;
    }

    public setHost(host: string): BuilderProxy {
        this.host = host;
        return this;
    }

    public setPort(port: string): BuilderProxy {
        this.port = port;
        return this;
    }

    public setUsername(username: string): BuilderProxy {
        this.username = username;
        return this;
    }

    public setPassword(password: string): BuilderProxy {
        this.password = password;
        return this;
    }

    public build(): string {
        if (!this.type || !this.host || !this.port) {
            throw new Error("Type, host, and port are required fields.");
        }

        let credentials = '';
        if (this.username && this.password) {
            credentials = `${this.username}:${this.password}@`;
        } else if (this.username) {
            credentials = `${this.username}@`;
        }

        return `${this.type}://${credentials}${this.host}:${this.port}`;
    }
}
