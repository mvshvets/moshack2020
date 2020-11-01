import React, { useCallback, useContext, useEffect } from 'react'
import { Stroke, Style } from 'ol/style'
import { LineString } from 'ol/geom'
import { Feature, MapBrowserEvent, Overlay } from 'ol'
import VectorSource from 'ol/source/Vector'
import { DrawersContext, MapContext } from 'core/context'
import VectorLayer from 'ol/layer/Vector'
import odh from 'MockData/odh.json'
import proj4 from 'proj4'
import { MSK77 } from './Line.consts'
import { getArrayDepth } from './Line.utils'

export const Line: React.FC = React.memo(() => {
    const { mapState } = useContext(MapContext)
    const { setDrawerAdapterOptions } = useContext(DrawersContext)

    const handleMapClick = useCallback((evt: MapBrowserEvent) => {
        if (!mapState) return

        const featureOnMap = mapState.getFeaturesAtPixel(evt.pixel)

        const featureId = featureOnMap ? featureOnMap[featureOnMap.length-1].getId() : null
        if (featureId) {
            setDrawerAdapterOptions({
                id: featureId,
                visible: true
            })
        }
    }, [mapState, setDrawerAdapterOptions])


    const getPolygon = useCallback((polygonCoord: any[], id: number) => {
        if (!mapState) return

        const source = new VectorSource({
            features: undefined
        })

        const layer = new VectorLayer({
            source
        })

        const featureToAdd = new Feature({
            geometry: new LineString(polygonCoord.map(el => proj4(MSK77, 'EPSG:3857', el)))
        })

        const style = new Style({
            stroke: new Stroke({
                color: 'red',
                width: 4
            })
        })

        mapState.addLayer(layer)
        featureToAdd.setStyle(style)
        featureToAdd.setId(id)
        source.addFeatures([featureToAdd])

        const overlay = new Overlay({
            element: document.getElementById('map-data-modal') || undefined
        })
        mapState.addOverlay(overlay)
        mapState.on('click', handleMapClick)
    }, [mapState, handleMapClick])

    useEffect(() => {
        odh.forEach(el => {
            el.geometry.coordinates.forEach((el1: any[]) => {
                if (getArrayDepth(el1) - 1 > 1) el1.forEach(getPolygon)
                else getPolygon(el1, el.root_id)
            })
        })
    }, [getPolygon])


    return null
})