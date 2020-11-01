import { ButtonsToolbar } from 'shared/components'
import React from 'react'
import { Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { TitleDataModel } from 'api/api.models'

/**
 * Рендер кнопок управления для записи таблицы титульных листов
 * @param tableRow одна запись таблицы
 * TODO: сделать печать, надо сохранять файлы на бэке
 */
export const renderTitleDataActions = (tableRow: TitleDataModel) => {
    return (
        <ButtonsToolbar noMargin>
            <Button
                type="link"
                icon={<PrinterOutlined/>}
            />
        </ButtonsToolbar>
    )
}