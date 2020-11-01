import React, { useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { LoaderContext } from 'core/context'
import { useFilter, usePagination } from 'shared/hooks'
import { PageContent, ContentTitle } from 'core/components'
import { ButtonsToolbar } from 'shared/components'
import { Button, message, Upload } from 'antd'
import { FilterOutlined, DownloadOutlined } from '@ant-design/icons'
import { TitleDataFilters } from './components'
import { TITLE_DATA_TABLE_COLUMNS } from './TitleData.consts'
import { TableAdapter } from 'shared/components'
import { RcCustomRequestOptions } from 'antd/lib/upload/interface'
import { handleSetFilters } from 'shared/utils'
import { API } from 'api'
import { TitleDataModel, TitleDataSearchModel } from 'api/api.models'
import { MESSAGE_DURATION_DEFAULT } from 'shared/consts'

/** Страница титульных листов */
export const TitleData: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const [titleData, setTitleData] = useState<TitleDataModel[]>()

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
    ] = usePagination<TitleDataSearchModel>({})

    /**
     * Запрос справочника сотрудников
     */
    const dictionaryFetch = useCallback(async () => {
        try {
            setLoaderState(true)

            const { data } = await API.getTitlesDataList(queryParams)

            setPagination((prevPaginationProps) => ({
                ...prevPaginationProps,
                total: data.total
            }))

            setTitleData(data.page_items)
        } catch (err) {
            console.error(err)
        } finally {
            setLoaderState(false)
        }
    }, [setLoaderState, setPagination, queryParams])

    /**
     * Отправка файла на сервер
     * @param request - объект добавленного файла
     */
    const uploadFile = useCallback(async (request: RcCustomRequestOptions) => {
            try {
                setLoaderState(true)

                let formData = new FormData()
                formData.append('file', request.file)

                const { data } = await API.setTitleDataDoc(formData)

                message.info({
                    content: `Всего в титульном листе было ${data.address_count} адреса. Новых - ${data.address_count_unique}`

                }, MESSAGE_DURATION_DEFAULT)

                dictionaryFetch?.()
            } catch (err) {
                console.error(err)
            } finally {
                setLoaderState(false)
            }
        },
        [setLoaderState, dictionaryFetch]
    )

    /**
     * Кнопки управления таблицей
     */
    const actionsToolbar = useMemo(() => (
        <ButtonsToolbar>
            <Upload
                showUploadList={false}
                customRequest={uploadFile}
                className="like-button"
                accept=".xls, .xlsx"
            >
                <Button
                    icon={<DownloadOutlined/>}
                >
                    Загрузить
                </Button>
            </Upload>
            <Button
                onClick={triggerFilterVisibility}
                icon={<FilterOutlined/>}
            >
                Фильтры
            </Button>
        </ButtonsToolbar>
    ), [triggerFilterVisibility, uploadFile])

    useEffect(() => {
        dictionaryFetch()
    }, [dictionaryFetch])

    return (
        <PageContent>
            <ContentTitle title="Титульные листы" actionsToolbar={actionsToolbar}/>

            {visibleFilter && (
                <TitleDataFilters
                    onSetFilters={handleSetFilters<TitleDataSearchModel>({
                        setQueryParams,
                        setPagination
                    })}
                />
            )}

            <TableAdapter
                columns={TITLE_DATA_TABLE_COLUMNS}
                dataSource={titleData}
                pagination={paginationOptions}
            />
        </PageContent>
    )
})