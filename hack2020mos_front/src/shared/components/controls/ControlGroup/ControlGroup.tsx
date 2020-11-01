import './ControlGroup.scss'

import React from 'react'
import classNames from 'classnames'

import { ControlGroupProps } from './ControlGroup.model'

/**
 * Группировка для контролов
 */
export const ControlGroup: React.FC<ControlGroupProps> = React.memo(
    ({ children, type, className, title, noPadding }) => {
        const classes = classNames(
            'control-group',
            className,
            type ? 'control-group_' + type : undefined,
            { 'control-group_no-padding': noPadding }
        )

        return (
            <div className={classes}>
                {title && <h4>{title}</h4>}
                {children}
            </div>
        )
    }
)
