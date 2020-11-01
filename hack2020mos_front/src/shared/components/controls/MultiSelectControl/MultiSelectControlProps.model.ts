import { FormInstance } from 'antd/lib/form'
import { ReactNode } from 'react'
import { TreeSelectProps } from 'antd/lib/tree-select'

export enum TagsType {
    'Cloud' = 'Cloud',
    'List' = 'List',
    'ListView' = 'ListView',
}

/**
 * Интерфейс для MultiSelectControl
 */
export interface MultiSelectControlProps<T>
    extends Omit<TreeSelectProps<T>, 'value'> {
    /** значение контрола */
    value?: T | null

    /** callback при изменении контрола */
    onChange?: (value?: T) => void

    /** тип вывода выбранных пунктов меню */
    tagsType?: TagsType

    /** отображение пункта "Выбрать все" */
    selectAll?: boolean

    /** контент после контрола */
    addonAfter?: ReactNode

    /** массив зависимостей */
    dependencies?: string[]

    /** instance формы antd */
    form?: FormInstance
}
