import React, { FC, useCallback } from 'react'

import { DocumentTitleContext } from './DocumentTitleContext'

export const DocumentTitleContextProvider: FC = React.memo(({ children }) => {
    document.title = 'СуперПрограмма'

    const updateTitle = useCallback(
        (newTitle: string) => (document.title = newTitle),
        []
    )

    return (
        <DocumentTitleContext.Provider value={{ updateTitle }}>
            {children}
        </DocumentTitleContext.Provider>
    )
})
