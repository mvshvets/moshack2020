import { ButtonsToolbar } from 'shared/components'
import React from 'react'
import { Button } from 'antd'
import { ReportsModel } from 'api'
import { EyeOutlined } from '@ant-design/icons/lib'

/**
 * Рендер кнопок управления для записи таблицы отчетов
 * @param tableRow одна запись таблицы
 * TODO: сделать печать, надо сохранять файлы на бэке
 */
export const renderReportsActions = (tableRow: ReportsModel) => {
    return (
        <ButtonsToolbar noMargin>
            <Button
                type="link"
                icon={<EyeOutlined/>}
            />
        </ButtonsToolbar>
    )
}