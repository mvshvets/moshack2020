import { Feature, Map } from 'ol'

export interface VectorModel {
    map: Map
    features?: Feature[]
}