import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'shared/consts'
import { QueryParamsProps } from 'shared/hooks'
import { TablePaginationConfig } from 'antd/lib/table/interface'

/**
 * Общий интерфейс для всех фильтров
 */
export interface FiltersProps<T> {
    onSetFilters: (values: Partial<T>) => void
}

interface HandleSetFiltersProps<T> {
    setQueryParams: React.Dispatch<
        React.SetStateAction<QueryParamsProps<Partial<T>>>
    >
    setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>
}

/**
 * Обработчик установки фильтра
 * @param values выбранные параметры для фильтрации
 */
export function handleSetFilters<T>({
    setQueryParams,
    setPagination,
}: HandleSetFiltersProps<T>) {
    return function (values: Partial<T>) {
        setQueryParams({
            per_page: DEFAULT_PAGE_SIZE,
            page: DEFAULT_PAGE_NUMBER,
            body: values,
        })
        setPagination((prevOptions) => ({
            ...prevOptions,
            current: DEFAULT_PAGE_NUMBER,
        }))
    }
}
