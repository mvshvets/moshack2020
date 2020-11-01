import React from 'react'
import { NotImplementedError } from 'core/errors'
import { MapContextProps } from './MapContextProps'

export const MapContext = React.createContext<MapContextProps>({
    mapState: undefined,
    setMapState: (state) => {
        throw new NotImplementedError()
    }})
