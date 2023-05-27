export interface IWrapper<T> {
    totalPages: number;
    totalItems: number;
    current: number;
    limit: number;
    items: T[];
}