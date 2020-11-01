import moment, { Moment } from 'moment'
import { LabeledValue } from 'antd/lib/select'
import { DictionaryModel } from 'api'

/**
 * Форматирование даты для отправки на бэк
 * @param date дата в формате Moment
 */
export const formatDate = (date?: Moment | string | null) => {
    if (date) return moment(date).format('L')

    return undefined
}

/**
 * Нормализация данных, для вывода в MultiSelectControl\SelectControl
 * @param el - очередная запись итерации
 */
export const normalizeDataForSelect = (
    el: DictionaryModel
): LabeledValue => ({
    value: el.id,
    label: el.name,
    key: String(el.id),
})