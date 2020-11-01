import Map from 'ol/Map'

export interface MapContextProps {
    mapState?: Map
    setMapState: (state: Map) => void
}