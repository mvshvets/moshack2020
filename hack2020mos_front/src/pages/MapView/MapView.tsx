import React, {
    RefObject,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import 'ol/ol.css'
import './MapView.scss'
import { MapContext } from 'core/context'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import { View, Map } from 'ol'
import { Line, MapPopup } from './components'

/** Страница карты */
export const MapView: React.FC = React.memo(() => {
    const { setMapState } = useContext(MapContext)
    const mapRef = useRef<HTMLDivElement>()
    const [componentHeight, setComponentHeight] = useState(document.documentElement.clientHeight - 80)

    useEffect(() => {
        if (!mapRef.current) return

        const map: Map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'http://tile1.maps.2gis.com/tiles?layerType=nc&x={x}&y={y}&z={z}'
                    })
                })
            ],
            view: new View({
                zoom: 10,
                center: [4188426.7147939987, 7508764.236877314],
            })
        })

        setMapState(map)
    }, [setMapState])


    useLayoutEffect(() => {
        const handleWindowResize = () => setComponentHeight(document.documentElement.clientHeight - 80)

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    })

    return (
        <div
            className="map-view"
            ref={mapRef as RefObject<HTMLDivElement>}
            style={{ height: componentHeight }}
        >
            {/*<Vector/>*/}
            <MapPopup/>
            <Line/>
        </div>
    )
})
