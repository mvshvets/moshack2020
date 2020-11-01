export interface ObjectDataModels {
    name: string
    category: string
    commonRating: number
    carriageway: {
        rating: number
    },
    sidewalk: {
        rating: number
    },
    roadside: {
        rating: number
    }
}