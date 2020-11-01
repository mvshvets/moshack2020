import './PageContent.scss'
import React from 'react'
import { PageContentProps } from './PageContent.model'
import classNames from 'classnames'

export const PageContent: React.FC<PageContentProps> = React.memo(
    ({ children, className }) => (
        <section className={classNames(['page-content', className])}>
            {children}
        </section>
    )
)
