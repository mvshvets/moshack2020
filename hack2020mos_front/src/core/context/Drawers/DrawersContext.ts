import React from 'react'
import { DrawersContextProps } from './DrawersContextProps'
import { NotImplementedError } from 'core/errors'

export const DrawersContext = React.createContext<DrawersContextProps>({
    drawerAdapterOptions: {},
    setDrawerAdapterOptions: (state) => {
        throw new NotImplementedError()
    }})

