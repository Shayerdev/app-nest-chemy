export interface HttpClientInterface {
    get<T>(url: string, options?: any): Promise<T>;
    post<T>(url: string, data: any, options?: any): Promise<T>;
}
