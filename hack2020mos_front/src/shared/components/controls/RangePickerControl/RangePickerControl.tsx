import './RangePickerControl.scss'

import React from 'react'
import classNames from 'classnames'
import { DATE_FORMAT_LIST } from 'shared/consts'
import { DatePicker } from 'antd'

import { RangePickerControlProps } from './RangePickerControlProps.model'

const { RangePicker } = DatePicker

/**
 * Декоратор для `RangePicker` от `antd`, принимает все теже `props`
 */
export const RangePickerControl: React.FC<RangePickerControlProps> = React.memo(
    (props) => {
        return (
            <div className={classNames('form-control', 'range-picker-control')}>
                <RangePicker
                    format={DATE_FORMAT_LIST}
                    placeholder={['с', 'по']}
                    {...props}
                />
            </div>
        )
    }
)
