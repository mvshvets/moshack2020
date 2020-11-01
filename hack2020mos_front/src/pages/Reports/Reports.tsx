import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ContentTitle, PageContent } from 'core/components'
import { LoaderContext } from 'core/context'
import { useFilter, usePagination } from 'shared/hooks'
import { API, ReportsModel, ReportsSearchModel } from 'api'
import { Button } from 'antd'
import { ButtonsToolbar, TableAdapter } from 'shared/components'
import { ReportsFilters } from './components'
import { handleSetFilters } from 'shared/utils'
import { REPORTS_TABLE_COLUMNS } from './Reports.const'
import { FilterOutlined } from '@ant-design/icons'

/** Страница отчетов */
export const Reports: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [reportsData, setReports] = useState<ReportsModel[]>()

    /**
     * Хук для фильтров
     */
    const [visibleFilter, triggerFilterVisibility] = useFilter()

    /**
     * Хук для пагинации
     */
    const [
        paginationOptions,
        setPagination,
        queryParams,
        setQueryParams
    ] = usePagination<ReportsSearchModel>({})

    /**
     * Запрос справочника сотрудников
     */
    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            const { data } = await API.getReportsList(queryParams)

            setPagination((prevPaginationProps) => ({
                ...prevPaginationProps,
                total: data.total
            }))

            setReports(data.page_items)
        } catch (err) {
            console.error(err)
        } finally {
            setLoaderState(false)
        }
    }, [setLoaderState, setPagination, queryParams])

    /**
     * Кнопки управления таблицей
     */
    const actionsToolbar = useMemo(() => (
        <ButtonsToolbar>
            <Button
                onClick={triggerFilterVisibility}
                icon={<FilterOutlined/>}
            >
                Фильтры
            </Button>
        </ButtonsToolbar>
    ), [triggerFilterVisibility])

    useEffect(() => {
        dictionaryFetch()
    }, [dictionaryFetch])

    return (
        <PageContent>
            <ContentTitle title="Отчеты" actionsToolbar={actionsToolbar}/>

            {visibleFilter && (
                <ReportsFilters
                    onSetFilters={handleSetFilters<ReportsSearchModel>({
                        setQueryParams,
                        setPagination
                    })}
                />
            )}

            <TableAdapter
                columns={REPORTS_TABLE_COLUMNS}
                dataSource={reportsData}
                pagination={paginationOptions}
            />
        </PageContent>
    )
})