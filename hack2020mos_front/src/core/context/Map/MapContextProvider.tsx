import React, { FC, useState } from 'react'
import Map from 'ol/Map'
import { MapContext } from './MapContext'

export const MapContextProvider: FC = React.memo(({ children }) => {
    const [mapState, setMapState] = useState<Map>()

    return (
        <MapContext.Provider value={{ mapState, setMapState }}>
            {children}
        </MapContext.Provider>
    )
})
