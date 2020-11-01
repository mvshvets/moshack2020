import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'shared/consts'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { TablePaginationConfig } from 'antd/lib/table'

export interface QueryParamsProps<T = any> {
    per_page?: number
    page?: number
    body?: T
}

interface UsePaginationProps<T> extends TablePaginationConfig {
    queryOptions?: QueryParamsProps<Partial<T>>
}

/**
 * Хук для пагинации, принимает все те же параметры, что и `Pagination` от `antd`,
 * а также функцию `setQueryParams` для изменения состояния запроса
 */
export const usePagination = <T>({
    queryOptions = {
        per_page: DEFAULT_PAGE_SIZE,
        page: DEFAULT_PAGE_NUMBER,
        body: {},
    },
    ...restOptions
}: UsePaginationProps<T>): [
    TablePaginationConfig,
    Dispatch<SetStateAction<TablePaginationConfig>>,
    QueryParamsProps<Partial<T>>,
    Dispatch<SetStateAction<QueryParamsProps<Partial<T>>>>
] => {
    /**
     * Стейт пагинации
     */
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        defaultCurrent: queryOptions.page,
        defaultPageSize: queryOptions.per_page  ,
        showSizeChanger: true,
        ...restOptions,
    })

    /**
     * Стейт с параметрами запроса
     */
    const [queryParams, setQueryParams] = useState(queryOptions)

    /**
     * Обработчик перехода по страницам
     */
    const handleCurrentPageChange = useCallback((page: number) => {
        setQueryParams((prevQueryParams) => ({
            ...prevQueryParams,
            page,
        }))
        setPagination((prevOptions) => ({
            ...prevOptions,
            current: page,
        }))
    }, [])

    /**
     * Обработчик смена количества записей для отображения
     */
    const handlePageSizeChange = useCallback(
        (current: number, per_page: number) => {
            setQueryParams((prevQueryParams) => ({
                ...prevQueryParams,
                page: DEFAULT_PAGE_NUMBER,
                per_page,
            }))
            setPagination((prevOptions) => ({
                ...prevOptions,
                current: DEFAULT_PAGE_NUMBER,
            }))
        },
        []
    )

    const paginationOptions = {
        ...pagination,
        onChange: handleCurrentPageChange,
        onShowSizeChange: handlePageSizeChange,
    }

    return [paginationOptions, setPagination, queryParams, setQueryParams]
}
