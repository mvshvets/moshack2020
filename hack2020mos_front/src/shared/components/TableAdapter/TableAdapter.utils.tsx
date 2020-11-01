export type RecordProps = {
    active?: boolean
}

/**
 * Вычислить класс для конкрентного `row` таблицы
 * @param record - запись таблицы
 */
export const getRowClassName = <T extends RecordProps>(record: T): string => {
    if (!record.active) return 'table-adapter__row_archive'

    return ''
}
