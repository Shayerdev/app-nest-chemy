export interface IRandomRowRepository {
    getRandomRow<T>(): Promise<T>
}
