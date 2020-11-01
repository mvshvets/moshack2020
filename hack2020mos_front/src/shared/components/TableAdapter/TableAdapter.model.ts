import { TableProps } from 'antd/lib/table'

export interface TableAdapterProps<T> extends TableProps<T> {
    enableScroll?: boolean
}
