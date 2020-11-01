import React, { useCallback, useState } from 'react'
import moment, { Moment } from 'moment'
import { DATE_FORMAT_LIST } from 'shared/consts'
import { DatePicker } from 'antd'

import { DatePickerControlProps } from './DatePickerControlProps.model'
import { formatDate } from 'shared/utils'

/**
 * Декоратор для `DatePicker` от `antd`
 */
export const DatePickerControl: React.FC<DatePickerControlProps> = React.memo(
    ({ value, format, showTime, onChange, disabled, widthFull = true }) => {
        const [date, setDate] = useState<Moment | null>()

        const triggerChange = useCallback(
            (value: Moment | null) => {
                if (onChange)
                    showTime
                        ? value && onChange(moment(value).format())
                        : onChange(formatDate(value))
            },
            [showTime, onChange]
        )

        const handleDateChange = useCallback(
            (value: Moment | null) => {
                setDate(value)
                triggerChange(value)
            },
            [triggerChange]
        )

        return (
            <DatePicker
                format={format || DATE_FORMAT_LIST}
                onChange={handleDateChange}
                value={(value && moment(value)) || date}
                showTime={showTime}
                disabled={disabled}
                style={widthFull ? { width: '100%'} : undefined}
            />
        )
    }
)
