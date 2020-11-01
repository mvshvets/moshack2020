import './ContentTitle.scss'
import React from 'react'
import { ContentTitleProps } from './ContentTitle.model'
import classNames from 'classnames'

export const ContentTitle: React.FC<ContentTitleProps> = React.memo(
    ({ children, className, title, actionsToolbar }) => (
        <div className={classNames(['content-title', className])}>
            <div className="content-title__header">
                <h1>{title}</h1>

                {actionsToolbar}
            </div>

            {children}
        </div>
    )
)
