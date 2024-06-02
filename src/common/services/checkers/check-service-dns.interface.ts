export interface CheckServiceDnsInterface
{
    checkMX<R>(data: string): Promise<R>;
    check<R>(data: string): Promise<R>;
}
