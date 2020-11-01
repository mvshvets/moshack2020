import { ColumnsType } from 'antd/lib/table'
import { ReportsModel } from 'api'
import { dateFormatting } from 'shared/utils'
import { renderReportsActions } from './Reports.utils'

export const REPORTS_TABLE_COLUMNS: ColumnsType<ReportsModel> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Дата создания',
        dataIndex: 'create_date',
        key: 'create_date',
        render: dateFormatting
    },
    {
        title: 'Рейтинг',
        dataIndex: 'rating',
        key: 'rating',
    },
    {
        title: 'Объект отчета',
        dataIndex: 'road_name',
        key: 'road_name',
    },
    {
        title: '',
        width: 100,
        render: renderReportsActions,
        align: 'right',
    }
]