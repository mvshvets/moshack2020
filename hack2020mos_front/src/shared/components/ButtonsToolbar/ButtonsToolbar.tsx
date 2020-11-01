import './ButtonsToolbar.scss'

import React from 'react'
import classNames from 'classnames'

import { ButtonsToolbarProps } from './ButtonsToolbar.model'

/**
 * Панель инструментов, группировка для кнопок
 */
export const ButtonsToolbar: React.FC<ButtonsToolbarProps> = React.memo(
    ({ children, align = 'flex-end', className, noMargin }) => {
        const classes = classNames('buttons-toolbar', className, {
            'buttons-toolbar_no-margin': noMargin,
        })

        return (
            <div className={classes} style={{ justifyContent: align }}>
                {children}
            </div>
        )
    }
)
