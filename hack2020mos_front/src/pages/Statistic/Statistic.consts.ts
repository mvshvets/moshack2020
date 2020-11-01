import { ColumnsType } from 'antd/lib/table'
import { renderServicesActions } from './Statistic.utils'

export const SERVICES_TABLE_COLUMNS: ColumnsType<any> = [
    {
        title: 'Название',
        dataIndex: 'full_name',
        key: 'full_name',
    },
    {
        title: '',
        width: 100,
        render: renderServicesActions,
        align: 'right',
    }
]