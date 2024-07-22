export interface IAttributeInvisible {
    getName(name: string): boolean;
    execute(): Promise<string|null>;
}
