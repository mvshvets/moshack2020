import './SelectControl.scss'

import classNames from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { LabeledValue } from 'antd/lib/select'
import { SELECT_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { Select } from 'antd'

import { SelectControlProps } from './SelectControlProps.model'

/**
 * Декоратор для `Select` от `antd`
 */
export const SelectControl: React.FC<SelectControlProps<number | LabeledValue>> = React.memo((props) => {
    const {
        values = [],
        dropdownClassName,
        dependencies,
        value,
        onChange,
        form,
        addonAfter,
        addonAfterColumn,
        ...restProps
    } = props

    const selectClasses = useMemo(
        () =>
            classNames([{
                    'select-control_addon-after': Boolean(addonAfter),
                    'select-control_addon-after_column': Boolean(addonAfterColumn)
                }]),
        [addonAfter, addonAfterColumn]
    )

    const [valueState, setValueState] = useState<number>()

    /**
     * Обновить значение в стейте и внешней форме
     */
    const triggerChanges = useCallback(
        (value: number) => {
            setValueState(value)
            if (onChange) onChange(value)
        },
        [onChange]
    )

    /**
     * Обработчик изменения значения Select
     */
    const handleSelectChange = useCallback(
        (number) => {
            triggerChanges(number)
        },
        [triggerChanges]
    )

    /**
     * Вычисленное значение для `Select`
     */
    const calculatedValue = useMemo(() => {
        if (value === null) return undefined

        return value || valueState
    }, [valueState, value])

    return (
        <div className={selectClasses}>
            <Select
                value={calculatedValue}
                onChange={handleSelectChange}
                placeholder={SELECT_PLACEHOLDER_DEFAULT}
                {...restProps}
                showArrow={true}
                options={values}
            />
            {addonAfter && (
                <div className="addon-after-content">{addonAfter}</div>
            )}
            {addonAfterColumn && (
                <div className="addon-after-content">{addonAfterColumn}</div>
            )}
        </div>
    )
})
