import React, { FC, useState } from 'react'

import { DrawersContext } from './DrawersContext'
import { SingleDrawerProps } from '.'

export const DrawersContextProvider: FC = React.memo(({ children }) => {
    const [drawerAdapterOptions, setDrawerAdapterOptions] = useState<SingleDrawerProps>({})

    return (
        <DrawersContext.Provider
            value={{ drawerAdapterOptions, setDrawerAdapterOptions }}
        >
            {children}
        </DrawersContext.Provider>
    )
})
