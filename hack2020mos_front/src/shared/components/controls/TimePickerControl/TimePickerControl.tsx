import './TimePickerControl.scss'

import classNames from 'classnames'
import moment from 'moment'
import React, { useCallback } from 'react'
import {
    TIME_FORMAT_HH_MM,
    TIME_PICKER_PLACEHOLDER_DEFAULT,
} from 'shared/consts'
import { TimePicker } from 'antd'

import { TimePickerControlProps } from './TimePickerControl.model'

/**
 * Декоратор для `TimePicker` от `antd`, принимает все теже `props`
 */
export const TimePickerControl: React.FC<TimePickerControlProps> = React.memo(
    ({ placeholder, value, onChange }) => {
        /**
         * Обновление значения во внешней форме
         * @param time - время
         */
        const triggerChange = useCallback(
            (_, timeString) => {
                if (onChange) onChange(timeString)
            },
            [onChange]
        )

        return (
            <div className={classNames('form-control', 'time-picker-control')}>
                <TimePicker
                    format={TIME_FORMAT_HH_MM}
                    onChange={triggerChange}
                    placeholder={placeholder || TIME_PICKER_PLACEHOLDER_DEFAULT}
                    value={value ? moment(value, TIME_FORMAT_HH_MM) : null}
                />
            </div>
        )
    }
)
