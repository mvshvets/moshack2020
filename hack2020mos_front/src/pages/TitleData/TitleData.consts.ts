import { ColumnsType } from 'antd/lib/table'
import { renderTitleDataActions } from './TitleData.utils'
import { TitleDataModel } from 'api'
import { dateFormatting } from 'shared/utils'

export const TITLE_DATA_TABLE_COLUMNS: ColumnsType<TitleDataModel> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Дата загрузки',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: dateFormatting
    },
    {
        title: 'Объектов',
        dataIndex: 'objects_count',
        key: 'objectCount',
    },
    {
        title: '',
        width: 100,
        render: renderTitleDataActions,
        align: 'right',
    }
]