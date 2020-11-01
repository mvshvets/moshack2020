import './CheckboxControl.scss'

import React from 'react'
import classNames from 'classnames'
import { Checkbox } from 'antd'

import { CheckboxGroupControlProps } from './CheckboxControlProps.model'

/**
 * Декоратор для `Checkbox.Group` от `antd`
 */
export const CheckboxGroupControl: React.FC<CheckboxGroupControlProps> = React.memo(
    ({ labelList, ...restProps }) => {
        return (
            <div
                className={classNames('checkbox-group-control', {
                    'checkbox-group-control_label-list': labelList,
                })}
            >
                <Checkbox.Group options={labelList} {...restProps} />
            </div>
        )
    }
)
