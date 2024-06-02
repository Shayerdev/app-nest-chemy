export interface CheckServiceDnsInterface
{
    check<R>(data: string): Promise<R>;
}
