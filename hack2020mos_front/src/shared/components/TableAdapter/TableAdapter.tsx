import './TableAdapter.scss'

import React, {
    RefObject,
    useCallback,
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import { TABLE_EMPTY_MESSAGE } from 'shared/consts'
import { Table } from 'antd'

import { TableAdapterProps } from './TableAdapter.model'

/**
 * Адаптер для `Table` от `antd`, принимает все теже `props`
 */
function TableAdapter<T extends object = any>(props: TableAdapterProps<T>) {
    const tableRef = useRef<HTMLDivElement>()

    /**
     * Получить значение отступов для дом элемента таблицы
     * @param elem - дом элемент таблицы
     */
    const getCoords = useCallback((elem: Element | null) => {
        if (!elem) return

        let box = elem.getBoundingClientRect()

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        }
    }, [])

    /**
     * Вычислить значение для скролла внутри таблицы
     */
    const getScrollSize = useCallback(() => {
        const PAGINATION_HEIGHT = 100
        const TABLE_TH_HEIGHT = 55

        if (tableRef.current) {

            return (
                document.body.clientHeight -
                (Number(getCoords(tableRef.current)?.top) || 0) -
                PAGINATION_HEIGHT -
                TABLE_TH_HEIGHT
            )
        }
    }, [getCoords])

    const [tableHeight, setTableHeight] = useState<number>()

    useLayoutEffect(() => {
        const handleWindowResize = () => setTableHeight(getScrollSize())

        setTableHeight(getScrollSize())
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [getScrollSize])

    return (
        <div
            ref={tableRef as RefObject<HTMLDivElement>}
            className="table-adapter"
        >
            <Table
                rowKey="id"
                locale={{ emptyText: TABLE_EMPTY_MESSAGE }}
                {...props}
                scroll={props.enableScroll ? { y: tableHeight } : undefined}
            />
        </div>
    )
}

export default React.memo(TableAdapter) as typeof TableAdapter
