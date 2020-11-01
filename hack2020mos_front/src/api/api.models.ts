import { RcFile } from "antd/lib/upload"
import { ROADS } from './api.consts'

export interface DictionaryModel {
    id: number
    name: string
}

export interface SearchParamsModel<T> {
    per_page?: number
    page?: number
    body?: T
}

export interface TablePageResponseModel<T> {
    page_items: T[]
    total: number
}

export interface ReportsSearchModel {
    name?: string
    create_date?: string
    rating?: number
    road_name?: string
}

export interface ReportsModel {
    id: number
    name: string
    create_date: string
    rating: number
    road_name: string
}

export interface TitleDataSearchModel {
    name?: string
    upload_date?: string
}

export interface TitleDataModel {
    id: number
    name: string
    upload_date: string
    objects_count: number
}

export interface TitleDataDocUploadModel {
    file: RcFile
}

export interface TitleDataDocModel {
    address_count: number
    address_count_unique: number
}

export type DictionaryTypes = typeof ROADS