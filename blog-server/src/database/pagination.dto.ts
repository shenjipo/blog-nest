export type PaginationDto<T = any> = T & {
    current: number
    size: number
}

export interface PageList<T = any> {
    current: number
    size: number
    total: number
    data: Array<T>
}