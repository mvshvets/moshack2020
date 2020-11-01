import './SwitchControl.scss'

import React from 'react'
import { Switch } from 'antd'

import { SwitchControlProps } from './SwitchControl.model'

/**
 * Декоратор для `Switch` от `antd`, принимает все теже `props`
 */
export const SwitchControl: React.FC<SwitchControlProps> = React.memo(
    ({ addonAfter, addonBefore, ...restProps }) => {
        return (
            <div className="form-control switch-control">
                {addonBefore && <span>{addonBefore}</span>}
                <Switch {...restProps} />
                {addonAfter && <span>{addonAfter}</span>}
            </div>
        )
    }
)
