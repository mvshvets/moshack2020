import { PopupAdapter } from 'shared/popups'
import { ButtonsToolbar } from 'shared/components'
import React from 'react'
import { ROUTE_NAMES } from 'routing'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

/**
 * Рендер кнопок управления для записи таблицы категорий
 * @param tableRow одна запись таблицы
 */
export const renderServicesActions = (tableRow: any) => {
    return (
        <ButtonsToolbar noMargin>
            <Link
                to={`${ROUTE_NAMES.SERVICES_EDIT}/${tableRow.id}`}
                className="like-button"
            >
                <Button
                    type="link"
                    icon={<EditOutlined/>}
                />
            </Link>
            <PopupAdapter
                formId="ConfirmDeleteForm"
                buttonText=""
                havePopup={false}
                buttonOption={{
                    type: 'link',
                    icon: <DeleteOutlined/>
                }}
                formOptions={{
                    initialValues: tableRow
                }}
                modalOptions={{
                    title: 'Подтвердите действие',
                    okText: 'Да'
                }}
            />
        </ButtonsToolbar>
    )
}