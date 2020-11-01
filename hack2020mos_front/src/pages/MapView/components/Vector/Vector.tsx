import React, { useCallback, useContext, useEffect } from 'react'
import { Circle, Fill, Stroke, Style } from 'ol/style'
import { Point } from 'ol/geom'
import { Feature, MapBrowserEvent } from 'ol'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { MapContext } from 'core/context'

export const Vector: React.FC = React.memo(() => {
    const { mapState } = useContext(MapContext)

    const onMapClick = useCallback((source: VectorSource) => (event: MapBrowserEvent) => {

        const featureToAdd = new Feature({
            geometry: new Point(event.coordinate),
        })

        const style = new Style({
            image: new Circle({
                radius: 6,
                fill: new Fill({color: 'red'}),
                stroke: new Stroke({
                    color: [0, 0, 0], width: 2
                })
            })
        })
        featureToAdd.setStyle(style)
        source.clear()
        source.addFeatures([featureToAdd])
    }, [])


    useEffect(() => {
        if (!mapState) return

        const source = new VectorSource({
            features: undefined,
        })

        const layer = new VectorLayer({
            source,
        })

        mapState.addLayer(layer)
        mapState.on("singleclick", onMapClick(source))
    }, [mapState, onMapClick])



    return null
})


    /*
    componentWillUnmount() {
      this.props.map.removeLayer(this.layer);
    }
    componentDidUpdate(prevProps: TVectorLayerComponentProps) {
      if (prevProps.features != this.props.features) {
        this.source.clear();
        if (this.props.features) {
          this.source.addFeatures(this.props.features);
        }
      }
    }
    */