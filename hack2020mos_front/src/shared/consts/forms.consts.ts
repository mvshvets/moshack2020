import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel'

import { LABEL_COL_FULL } from '.'

export const SELECT_SEARCH_PLACEHOLDER_DEFAULT = 'Введите или выберите'
export const SELECT_PLACEHOLDER_DEFAULT = 'Выберите вариант'
export const INPUT_PLACEHOLDER_DEFAULT = 'Введите значение'
export const INPUT_NUMBER_PLACEHOLDER_DEFAULT = '0'
export const VALIDATE_MESSAGE_DEFAULT = 'Обязательное поле'
export const UPLOAD_IMAGE_PLACEHOLDER_DEFAULT = 'Добавить изображение'
export const TIME_PICKER_PLACEHOLDER_DEFAULT = 'Выберите время'

export const SELECT_SEARCH_OPTIONS_DEFAULT = {
    pageSize: 100,
    pageNumber: 1,
}

export const COMMON_ITEM_OPTIONS: FormItemLabelProps = {
    labelAlign: 'left',
    labelCol: LABEL_COL_FULL,
}
